import { useEffect, useState, useCallback } from "react";
import Input from "./Input";
import Spinner from './Spinner';
import { TrashFill } from 'react-bootstrap-icons'
import Alert from "./Alert";

function Admin({ curUser }) {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [submission, setSubmission] = useState();
    const data = formData.filter(rec => rec.email !== '');
    const changedUsers = data.filter(rec => {
        const userData = users.find(r => r.email === rec.email);
        return userData && userData.admin !== rec.admin
    });
    const newUsers = data.filter(rec => !users.find(r => r.email === rec.email));
    const deletedUsers = users.filter(rec => !data.find(r => r.email === rec.email));
    const change = deletedUsers.length !== 0 || newUsers.length !== 0 || changedUsers.length !== 0;

    const updateUsersData = (users) => {
        setUsers(users)
        setFormData([...users, {email: '', admin: false}])
    }
    const filterSortUserData = useCallback(users => {
        const filteredUsers = users.filter(user => (
            user.email !== curUser.email
        ));
        let sortedUsers = [];
        sortedUsers = filteredUsers
        sortedUsers.sort((a, b) => {
            if (a.email < b.email) {
                return -1;
            } else if (a.email > b.email) {
                return 1;
            } else {
                return 0;
            }
        });
        return sortedUsers;
    }, [curUser])

    const handleChange = e => {
        const index = parseInt(e.target.id);
        const name = e.target.name;
        const value = name === 'email' ? e.target.value : e.target.checked;
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
        if (submission?.message) {
            setSubmission();
        }
        // setOrder(newData.map(u => u.email))
        setFormData(newData)
    }
    const handleDelete = index => {
        if (submission?.message) {
            setSubmission();
        }
        const newData = formData.filter((_, i) => i !== parseInt(index) )
        setFormData(newData)
    }
    let allValid = true;
    const fields = formData.map((rec, i) => {
        const emailValid = rec.email.search(/\S+@\S+\.\S+/) >= 0 || rec.email === '';
        allValid = allValid && emailValid;
        return {
            field: 'email',
            handleChange: handleChange,
            formData: formData,
            name: 'email',
            className: 'mb-2 mt-2',
            checkBoxName: 'admin',
            isCheckbox: true,
            index: i,
            error: !emailValid && 'You must enter a valid email address.'
        }
    })
    const handleSubmit = e => {
        e.preventDefault();
        if (allValid) {
            if (formData.map(rec => rec.email).includes(curUser.email)) {
                setSubmission({
                    status: 'danger',
                    message: 'You cannot modify your own user account'
                });
                return;
            }
            const config = {
                credentials: 'include',
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    changedUsers: changedUsers,
                    newUsers: newUsers,
                    deletedUsers: deletedUsers
                })
            }
            setLoading(true);
            fetch('/api/users', config)
            .then(r => r.json())
            .then(body => {
                const processedUsers = filterSortUserData(body.data.users);
                updateUsersData(processedUsers);
                setLoading(false);
                setSubmission({
                    status: body.ok ? 'success' : 'danger',
                    message: body.ok ? body.message : body.error
                });
            })
        }
    }

    useEffect(() => {
        fetch('/api/users', {credentials: 'include'})
        .then(r => r.json())
        .then(body => {
            const processedUsers = filterSortUserData(body.data.users);
            updateUsersData(processedUsers)
            // setOrder([...processedUsers.map(u => u.email), ''])
        })
    }, [filterSortUserData])
    
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
                {!loading && formData.length !== 0 ? (
                    <button
                        disabled={!change}
                        type="submit"
                        className="btn btn-primary mt-4"
                    >
                        Save
                    </button>
                ) : (
                    <Spinner />
                )}
            </form>
            <Alert
                active={!!submission}
                status={submission?.status}
                fixedIfMobile
                onClick={() => setSubmission()}
            >
                {submission?.message}
            </Alert>
        </>
    )
}

export default Admin;