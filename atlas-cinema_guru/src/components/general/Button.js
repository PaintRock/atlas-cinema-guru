import stylesheet from './general';

export default function Button({
    label,
    className, 
    onClick,
    icon,
}) {
  return (
    <button 
      className={`button ${className}`}
      onClick={onClick}
    >
      {label}
      {icon}
    </button>
  );
}

