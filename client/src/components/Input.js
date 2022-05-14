import InputContainer from "./InputContainer";

function Input({field, label, message, handleChange, formData, name=field, className="mb-3", isCheckbox=false}) {

    return (
        <InputContainer isCheckbox={isCheckbox} className={className}>
            {label ? <label htmlFor={field} className="form-label">{label}</label> : null}
            <input
                value={formData[name]}
                onChange={handleChange}
                type={field}
                name={name}
                className="form-control"
                id={name}
            />
            {message ? <div className="form-text">{message}</div> : null}
        </InputContainer>
    )
}

export default Input;