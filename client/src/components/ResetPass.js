import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from './Input';

function ResetPass() {
    const { hash } = useParams();
    const [hashCheck, setHashCheck] = useState({
        message: 'Reset link expired',
        isValid: true,
    });
    const [submission, setSubmission] = useState({
        message: '',
        status: '',
    });
    const [password, setPassword] = useState('');
    
    const handleSubmit = e => {
        e.preventDefault();
        console.log(password)
    }
    const handleChange = e => {
        setPassword(e.target.value)
    }

    if (hashCheck.isValid) {
        return (
            <>
                <h2 className='vm-md'>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <Input
                        field="password"
                        message="Enter a new password"
                        handleChange={handleChange}
                        formData={password}
                    />
                    <button type="submit" className="btn btn-primary">Submit</button>
                    <p className={`text-${submission.status}`}>{submission.message}</p>
                </form>
            </>
        )
    } else {
        return (
            <div className={`alert alert-${hashCheck.message ? 'warning' : 'light'} mt-5`} role="alert">
                {hashCheck.message || 'Checking link...'}
            </div>
        )
    }
}

export default ResetPass;