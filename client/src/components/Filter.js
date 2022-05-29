import { Calendar } from 'react-date-range';


function Filter({ minDate, maxDate, disabledDays, date, onChange }) {
    return (
        <>
            {
                maxDate && date ? (
                    <Calendar
                        date={date}
                        minDate={minDate}
                        maxDate={maxDate}
                        disabledDates={disabledDays}
                        onChange={onChange}
                    />
                ) : (
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                )
            }
            

        </>
    )
}

export default Filter;