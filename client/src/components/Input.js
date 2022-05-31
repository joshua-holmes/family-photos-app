import InputContainer from "./InputContainer";

function Input({field, label, error, suppressErrorMessage, message, handleChange, formData, name=field, className="mb-3", checkBoxName=null, isCheckbox=false, index, validateEmail}) {

    const data = Array.isArray(formData) ? formData[index] : formData
    if (validateEmail) {
        const emailValid = data[name].search(/\S+@\S+\.\S+/) >= 0 || data[name] === '';
        error = !emailValid && 'sdfs'
    }
    return (
        <InputContainer
            name={checkBoxName}
            className={className}
            handleChange={handleChange}
            formData={data}
            isCheckbox={isCheckbox}
            index={index}
        >
            {label ? <label htmlFor={field} className="form-label">{label}</label> : null}
            <input
                value={data[name]}
                onChange={e => handleChange(e, !!error)}
                type={field}
                name={name}
                className={`form-control ${error ? 'is-invalid' : ''}`}
                id={typeof index === 'number' ? index : name}
            />
            {error && !suppressErrorMessage ? <div className="invalid-feedback">{error}</div> : null}
            {message ? <div className="form-text">{message}</div> : null}
        </InputContainer>
    )
}

export default Input;