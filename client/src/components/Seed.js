import { useEffect, useState } from "react";
import Alert from "./Alert";
import Spinner from "./Spinner";

function Seed({ user }) {
    const [success, setSuccess] = useState();

    useEffect(() => {
        if (!success && !user) {
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                }
            }
            console.log('FETCHING')
            fetch('/seed', config)
            .then(r => r.json())
            .then(body => setSuccess({
                status: body.ok ? 'success' : 'danger',
                message: body.ok ? body.message : body.error,
            }))
        }
        
    }, [])

    return !success ? (
        <Spinner />
    ) : (
        <Alert status={success.status}>{success.message}</Alert>
    )
}

export default Seed;