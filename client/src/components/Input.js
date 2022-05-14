import InputContainer from "./InputContainer";

function Input({field, label, message, handleChange, formData, name=field, className="mb-3", checkBoxName=null, isCheckbox=false, index}) {

    const data = Array.isArray(formData) ? formData[index] : formData
    
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
                onChange={handleChange}
                type={field}
                name={name}
                className="form-control"
                id={typeof index === 'number' ? index : name}
            />
            {message ? <div className="form-text">{message}</div> : null}
        </InputContainer>
    )
}

export default Input;