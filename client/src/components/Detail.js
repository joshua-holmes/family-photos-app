import Card from './Card';
import Input from './Input';
import { useState, useEffect } from 'react';
import Alert from './Alert';

function Detail({ photos, dateAsString, numPerRow, admin }) {
    const [width, setWidth] = useState(window.innerWidth);
    const [submission, setSubmission] = useState();
    const [caption, setCaption] = useState();
    const [captionEdit, setCaptionEdit] = useState({
        'text': ''
    });
    const isMobile = width <= 991;
    const handleWindowSizeChange = () => {
        setWidth(window.innerWidth);
    }
    const handleChange = e => {
        if (submission) {
            setSubmission();
        }
        setCaptionEdit({[e.target.name]: e.target.value});
    }
    const handleSubmit = e => {
        e.preventDefault();
        const body = {text: captionEdit.text}
        let path = '/api/caption'
        if (!caption) {
            body.date = dateAsString;
        } else {
            path += `/${caption.id}`
        }
        const config = {
            credentials: 'include',
            method: caption ? 'PATCH' : 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(body)
        }
        fetch(path, config)
        .then(r => r.json())
        .then(body => {
            if (body.ok) {
                setCaption(body.ok ? body.data : null);
                setSubmission({
                    status: 'success',
                    message: body.message
                });
            } else {
                setSubmission({
                    status: 'danger',
                    message: body.error
                });
            }
        })
    }
    useEffect(() => {
        if (submission) {
            setSubmission();
        }
        if (dateAsString) {
            fetch(`/api/caption/${dateAsString}`, {credentials: 'include'})
            .then(r => r.json())
            .then(body => {
                setCaption(body.ok ? body.data : null);
                setCaptionEdit({text: body.ok ? body.data.text : ''});
            })
        }
        
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, [dateAsString, submission]);
    const cards = photos.map((photo, i) => (
        <Card
            index={i}
            url={photo.baseUrl}
            key={photo.id}
            numPerRow={numPerRow}
            isMobile={isMobile}
        />
    ));
    const rows = [];
    for (let i = 0; i < cards.length; i += numPerRow) {
        rows.push(
            <div key={i} className='row'>
                {cards.slice(i, i + numPerRow)}
            </div>
        )
    }
    return (
        <>
            {admin ? (
                <form onSubmit={handleSubmit}>
                    <Alert
                        active={!!submission}
                        status={submission?.status}
                        fixedIfMobile
                        onClick={() => setSubmission()}
                    >
                        {submission?.message}
                    </Alert>
                    <Input
                        field='textarea'
                        label='Caption'
                        formData={captionEdit}
                        handleChange={handleChange}
                        name='text'
                    />
                    <button
                        type="submit"
                        className="btn btn-primary mb-4"
                        disabled={caption?.text === captionEdit.text}
                    >
                        Save
                    </button>
                    
                </form>
            ) : (!caption?.text ? null :
                <h5 className='vm-md'>{caption.text}</h5>
            )}
            {rows}
        </>
    )
}

export default Detail;