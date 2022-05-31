import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Alert from './Alert';
import Input from './Input';
import Spinner from './Spinner';


function Login({ setUser }) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [submission, setSubmission] = useState();
    const [forgot, setForgot] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = e => {
        e.preventDefault();
        const field = e.target.name;
        setFormData({
            ...formData,
            [field]: e.target.value
        });   
    }
    const handleSubmit = e => {
        e.preventDefault();
        const config = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        }
        const path = forgot ? '/create_reset_hash' : '/login'
        setLoading(true);
        setSubmission();
        fetch(path, config)
        .then(r => r.json())
        .then(body => {
            setLoading(false);
            if (body.ok) {
                if (forgot) {
                    setSubmission({
                        message: body.message,
                        status: 'success'
                    })
                } else {
                    setUser(body.data.user);
                }
                
            } else {
                setSubmission({
                    message: body.error,
                    status: 'danger'
                });
            }
        })
    }

    const formFields = [
        {field: 'email', label: 'Email address'},
        {field: 'password', label: 'Password', message: 'To sign up, please contact the site administrator.'}
    ]
    formFields.forEach(input => {
        input.handleChange = handleChange
        input.formData = formData
    })

    

    return (
        <>
            <h2 className='vm-md'>{forgot ? 'Reset Password' : 'Login'}</h2>
            { loading ? <Spinner /> : (submission?.status === 'success' ? null : 
                <form onSubmit={handleSubmit}>
                    {forgot ? (
                        <Input {...formFields[0]}
                            message='Please enter email address and reset link will be sent to you'
                        />
                    ) : (
                        formFields.map(props => <Input key={props.field} {...props} />)
                    )}
                    <button type="submit" className="btn btn-primary">Submit</button>
                    {forgot ? null : (
                        <Link to='/login' onClick={() => setForgot(true)} className="hm-sm">
                            Reset password
                        </Link>
                    )}
                </form>
            )}
            <Alert
                active={submission}
                status={submission?.status}
                fixedIfMobile
                onClick={() => setSubmission()}
            >
                {submission?.message}
            </Alert>
        </>
    )
}

export default Login;