

function InputContainer({ name, className, children, formData, handleChange, isCheckbox, index }) {
    
    if (isCheckbox) {
        return (
            <div className={`input-group ${className}`}>
                <div className="input-group-text">
                    <input
                        className={`form-check-input ${className}`}
                        type="checkbox"
                        value=""
                        aria-label="Checkbox for following text input"
                        name={name}
                        checked={formData[name]}
                        onChange={handleChange}
                        id={index}
                    />
                </div>
                    {children}
            </div>
        )
    } else {
        return <div className={className}>{children}</div>
    }
}

export default InputContainer