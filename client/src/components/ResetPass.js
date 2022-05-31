import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Alert from './Alert';
import Input from './Input';
import Spinner from './Spinner';

function ResetPass() {
    const { hash } = useParams();
    const [hashCheck, setHashCheck] = useState();
    const [submission, setSubmission] = useState();
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const fetchHeaders = {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
    const handleSubmit = e => {
        e.preventDefault();
        const config = {
            method: 'PATCH',
            headers: fetchHeaders,
            body: JSON.stringify({
                reset_hash: hash,
                password: password
            })
        }
        setLoading(true);
        fetch('/reset_password', config)
        .then(r => r.json())
        .then(body => {
            setLoading(false);
            setSubmission({
                message: body.ok ? body.message : body.error,
                status: body.ok ? 'success' : 'danger'
            })
        })
    }
    const handleChange = e => {
        setPassword(e.target.value);
    }
    useEffect(() => {
        const config = {
            method: 'POST',
            headers: fetchHeaders,
            body: JSON.stringify({reset_hash: hash})
        }
        fetch('/check_reset_hash', config)
        .then(r => r.json())
        .then(body => {
            console.log(body)
            setHashCheck({
                message: body.ok ? body.message : body.error,
                isValid: body.ok
            })
        })
    }, [])
    
    if (!hashCheck) {
        return <Spinner />
    } else if (hashCheck.isValid) {
        return (
            <>
                <h2 className='vm-md'>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    {loading ? <Spinner /> : (!submission ? (
                        <>
                            <Input
                                field="password"
                                message="Enter a new password"
                                handleChange={handleChange}
                                formData={password}
                            />
                            <button type="submit" className="btn btn-primary">Submit</button>
                        </>
                    ) : (
                        <Alert status={submission?.status}>
                            {submission?.message}
                            <Link to='/login' className='alert-link'>Back to login</Link>
                        </Alert>
                    ))}
                </form>
            </>
        )
    } else {
        return (
            <Alert status='warning'>
                {hashCheck.message + ' '}
                <Link to='/login' className='alert-link'>Back to login</Link>
            </Alert>
        )
    }
}

export default ResetPass;