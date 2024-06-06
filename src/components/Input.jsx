export const Input = (props) => {
    const { label, className, type, placeholder, name, value, onChange, onBlur } =
      props.myInput;
    return (
      <div className="input-container">
        <label>{label}</label>
        <input
          className={className}
          type={type}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          required
        />
      </div>
    );
};