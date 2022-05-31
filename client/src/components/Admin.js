import { useEffect, useState } from "react";
import Input from "./Input";
import Spinner from './Spinner';
import { TrashFill } from 'react-bootstrap-icons'
import Alert from "./Alert";

function Admin({ curUser }) {
    const [users, setUsers] = useState([]);
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false)
    const [submission, setSubmission] = useState();
    const [order, setOrder] = useState([]);
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
    const filterSortUserData = users => {
        const filteredUsers = users.filter(user => (
            user.email !== curUser.email
        ));
        let sortedUsers = [];
        if (order.length) {
            for (let user of users) {
                if (order.includes(user.email)) {
                    sortedUsers[order.indexOf(user.email)] = user;
                } else {
                    sortedUsers.push(user);
                }
            }
            // For getting rid of 'empty' items in array
            sortedUsers = sortedUsers.filter(u => u)
        } else {
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
        }
        return sortedUsers;
    }
    const handleSubmit = e => {
        e.preventDefault();
        if (formData.map(rec => rec.email).includes(curUser.email)) {
            setSubmission({
                status: 'danger',
                message: 'You cannot modify your own user account'
            });
            return;
        }
        const config = {
            method: 'POST',
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
        fetch('/change_users', config)
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
        setOrder(newData.map(u => u.email))
        setFormData(newData)
    }
    const handleDelete = index => {
        if (submission?.message) {
            setSubmission();
        }
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
        .then(body => {
            const processedUsers = filterSortUserData(body.data.users);
            updateUsersData(processedUsers)
            setOrder([...processedUsers.map(u => u.email), ''])
        })
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