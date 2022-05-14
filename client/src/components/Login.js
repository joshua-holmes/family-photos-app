import { useEffect, useState } from 'react';
import Input from './Input';


function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [submission, setSubmission] = useState({
        message: '',
        status: '',
    })
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
            <h2 className='vm-md'>Login</h2>
            <form onSubmit={handleSubmit}>
                {formFields.map(props => <Input key={props.field} {...props} />)}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {submission.message ? (
                <div class={`alert alert-${submission.status} mt-5`} role="alert">
                    {submission.message}
                </div>
            ) : null}
        </>
    )
}

export default Login;