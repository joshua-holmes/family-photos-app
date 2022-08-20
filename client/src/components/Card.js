import { useState } from "react";


function Card({ url, numPerRow, isMobile }) {
    const [selected, setSelected] = useState(false);
    
    const toggleSelect = () => {
        if (!isMobile) {
            setSelected(!selected)
        }
    }
    return (
        <div className={`col-lg-${Math.floor(12 / numPerRow)}`}>
            <div className="card vm-sm">
                <img
                    src={url}
                    className={`card-img-top`}
                    onClick={toggleSelect}
                    alt=''
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
                                alt=''
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