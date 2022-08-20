import { Link, useNavigate } from "react-router-dom";

function MyNavBar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        fetch('http://localhost:5000/logout', {method: 'DELETE', credentials: 'include'})
        .then(r => r.json())
        .then(body => {
            if (body.ok) {
                setUser()
            }
        })
    }
    const handleAdmin = () => {
        navigate('/admin')
    }

    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Renner Family Photos</Link>
                <div>
                    {!user?.admin ? null : (
                        <button
                            onClick={handleAdmin}
                            className="btn btn-sm btn-secondary hm-sm"
                            type="button"
                        >
                            Admin
                        </button>
                    )}
                    {!user ? null : (
                        <button
                            onClick={handleLogout}
                            className="btn btn-sm btn-outline-secondary"
                            type="button"
                        >
                            Logout
                        </button>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default MyNavBar;