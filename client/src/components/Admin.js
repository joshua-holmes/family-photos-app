import { useState } from "react";
import Input from "./Input";
import { TrashFill } from 'react-bootstrap-icons'

function Admin() {
    const users = [
        {email: 'bob@hotmail.com', admin: true},
        {email: 'joe@gmail.com', admin: false},
        {email: 'alex@me.com', admin: false},
        {email: 'jill@gmail.com', admin: true},
        {email: 'sue@outlook.com', admin: false},
    ];
    const [formData, setFormData] = useState([...users, {email: '', admin: false}]);
    const [submission, setSubmission] = useState({
        loading: false,
        status: '',
        message: '',
    });

    const dataEmails = formData.filter(rec => rec.email !== '').map(rec => rec.email);
    const userEmails = users.map(rec => rec.email);
    const newEmails = dataEmails.filter(email => !userEmails.includes(email));
    const deletedEmails = userEmails.filter(email => !dataEmails.includes(email));
    const change = newEmails.length !== 0 || deletedEmails.length !== 0;

    const handleSubmit = e => {
        e.preventDefault();
        
    }
    const handleChange = e => {
        const index = parseInt(e.target.name);
        const value = e.target.value
        const newData = formData.map((rec, i) => i === index ? value : rec.email)
        if (newData.slice(-1)[0]) {
            newData.push('')
        }
        if (!newData.slice(-2)[0]) {
            newData.splice(-2, 1)
        }
        setFormData(newData)
    }
    const handleDelete = index => {
        const newData = formData.filter((_, i) => i !== parseInt(index) )
        setFormData(newData)
    }
    const fields = formData.map((_, i) => (
        {
            field: 'email',
            handleChange: handleChange,
            formData: [...dataEmails, ''],
            name: i,
            className: 'mb-2 mt-2',
            isCheckbox: true,
        }
    ))

    return (
        <>
            <h2 className='vm-md'>Admin Panel</h2>
            <form onSubmit={handleSubmit}>
                {fields.map((props, i) => (
                    <div key={props.name} className="row align-items-center">
                        <div className="col-10">
                            <Input {...props} />
                        </div>
                        <div className="col-2">
                            <button
                                type="button"
                                className="btn btn-outline-danger"
                                onClick={() => handleDelete(i)}
                                disabled={i === fields.length - 1}
                            >
                                <TrashFill />
                            </button>
                        </div>
                    </div>
                ))}
                {!submission.loading ? (
                    <button
                        disabled={!change}
                        type="submit"
                        className="btn btn-primary mt-4"
                    >
                        Save
                    </button>
                ) : (
                    <div className="spinner-grow text-primary mt-4" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )}
            </form>
        </>
    )
}

export default Admin;