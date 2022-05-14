import { NavLink, Link } from "react-router-dom";

function MyNavBar() {

    const handleClick = () => {
        console.log('CLICK')
    }

    return (
        <nav className="navbar bg-light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Renner Family Photos</Link>
                <button onClick={handleClick} className="btn btn-sm btn-outline-secondary" type="button">Logout</button>
            </div>
        </nav>
    )
}

export default MyNavBar;