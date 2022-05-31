import { Calendar } from 'react-date-range';
import Spinner from './Spinner';

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
                    <Spinner />
                )
            }
            

        </>
    )
}

export default Filter;