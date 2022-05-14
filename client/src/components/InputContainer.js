

function InputContainer({ isCheckbox, className, children }) {
    if (isCheckbox) {
        return (
            <div className={`input-group ${className}`}>
                <div className="input-group-text">
                    <input className={`form-check-input ${className}`} type="checkbox" value="" aria-label="Checkbox for following text input"/>
                </div>
                    {children}
            </div>
        )
    } else {
        return <div className={className}>{children}</div>
    }
}

export default InputContainer