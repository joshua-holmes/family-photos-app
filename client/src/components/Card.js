import { useState } from "react";


function Card({ url, numPerRow }) {
    const [selected, setSelected] = useState(false);
    
    const toggleSelect = () => {
        setSelected(!selected)
    }
    console.log(selected)
    return (
        <div className={`col-lg-${Math.floor(12 / numPerRow)}`}>
            <div className="card vm-sm">
                <img
                    src={url}
                    className={`card-img-top`}
                    onClick={toggleSelect}
                />
                {
                    !selected ? null : (
                        <>
                            <img
                                src={url}
                                className='full-screen'
                                data-mdb-toggle="animation"
                                data-mdb-animation="slide-in-right"
                                data-mdb-animation-start="onLoad"
                                data-mdb-animation-duration='3s'
                                onClick={toggleSelect}
                            />
                            <div
                                className='overlay'
                                onClick={toggleSelect}
                            />
                        </>
                    )
                }
            </div>
        </div>
    )
}

export default Card;