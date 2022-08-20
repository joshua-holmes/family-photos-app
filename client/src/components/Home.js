import Detail from "./Detail";
import Filter from "./Filter";
import { useEffect, useState } from "react";



function Home({ admin }) {
    const [selectedData, setSelectedData] = useState({})
    const [data, setData] = useState({})
    const stringifyDate = date => {
        if (typeof date !== 'object') return null
        const y = String(date.getFullYear())
        const m = String(date.getMonth() + 1)
        const d = String(date.getDate())
        return `${y}-${m.length < 2 ? '0' + m : m}-${d.length < 2 ? '0' + d : d}`
    }

    useEffect(() => {
        const getData = () => {
            fetch('http://localhost:5000/photos', {credentials: 'include'})
            .then(r => r.json())
            .then(body => {
                const photos = body.data.photos;
                const msPerDay = 1000 * 60 * 60 * 24;
                const datesAsString = photos.map(photo => photo.creationTime.slice(0, 10))
                const dates = photos.map(photo => new Date(photo.creationTime))
                const maxDate = new Date(Math.max(...dates))
                const minDate = new Date(Math.min(...dates))
                const rangeOfDays = Math.ceil((maxDate - minDate) / msPerDay)
                const disabledDays = []
                for (let i = 0; i < rangeOfDays; i++) {
                    const curDate = new Date(minDate)
                    curDate.setDate(curDate.getDate() + i)
                    const curDateStr = stringifyDate(curDate)
                    if (!datesAsString.includes(curDateStr)) {
                        disabledDays.push(curDate)
                    }
                }
                setData({
                    photos: photos,
                    minDate: minDate,
                    maxDate: maxDate,
                    disabledDays: disabledDays
                })
            })
        }
        getData()
        const id = setInterval(getData, 3600000);
        return function cleanup() {
            clearInterval(id);
        }
    }, [])

    const handleChange = (date, photos=data.photos) => {
        const dateString = stringifyDate(date)
        setSelectedData({
            date: date,
            filteredPhotos: photos.filter(p => p.creationTime.slice(0, 10) === dateString)
        })
    }
    if (Object.keys(selectedData).length === 0 && Object.keys(data).length > 0) {
        handleChange(data.maxDate, data.photos)
    }
    return (
        <>
            <h2 className='vm-md'>Photo Viewer</h2>
            <Filter
                minDate={data.minDate}
                maxDate={data.maxDate}
                disabledDays={data.disabledDays}
                date={selectedData.date}
                onChange={handleChange}
            />
            <hr className='styled vm-lg'/>
            <Detail
                photos={selectedData.filteredPhotos || []}
                numPerRow={3}
                dateAsString={stringifyDate(selectedData.date)}
                admin={admin}
            />

            
        </>
    )
}

export default Home;