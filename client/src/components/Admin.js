import { useEffect, useState } from "react";
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
    const data = formData.filter(rec => rec.email !== '');
    const changedUsers = data.filter(rec => {
        const userData = users.find(r => r.email === rec.email);
        return userData && userData.admin !== rec.admin
    });
    const newUsers = data.filter(rec => !users.find(r => r.email === rec.email));
    const deletedUsers = users.filter(rec => !data.find(r => r.email === rec.email));
    const change = deletedUsers.length !== 0 || newUsers.length !== 0 || changedUsers.length !== 0;

    const handleSubmit = e => {
        e.preventDefault();
        
    }
    const handleChange = e => {
        const index = parseInt(e.target.id);
        const name = e.target.name
        const value = name === 'email' ? e.target.value : e.target.checked
        console.log(name)
        const newData = formData.map((rec, i) => i !== index ? rec : {
            ...formData[i],
            [name]: value,
        })
        if (newData.slice(-1)[0].email) {
            newData.push({email: '', admin: false})
        }
        if (!newData.slice(-2)[0].email) {
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
            formData: formData,
            name: 'email',
            className: 'mb-2 mt-2',
            checkBoxName: 'admin',
            isCheckbox: true,
            index: i,
        }
    ))

    useEffect(() => {
        fetch('/users')
        .then(r => r.json())
        .then(console.log)
    }, [])

    return (
        <>
            <h2 className='vm-md'>Admin Panel</h2>
            <form onSubmit={handleSubmit}>
                {fields.map((props, i) => (
                    <div key={props.index} className="row align-items-center">
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