import general from './general.css';

export default function Input({ 
    label, 
    type, 
    className, 
    value, 
    setValue, 
    icon, 
    inputAttributes 
    }) {
  return (
    <div className={`input-container ${className}`}>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={e => setValue(e.target.value)}
        {...inputAttributes}
      />
      {icon}
    </div>
  );
}