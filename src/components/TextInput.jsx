import React from 'react';

const TextInput = ({
  title,
  label,
  placeholder,
  value,
  onValueChange,
  type = 'text',
}) => {
  const handleInputChange = (e) => {
    let newValue = e.target.value;
    onValueChange(newValue);
  };

  return (
    <div>
      <label htmlFor={title + '_input'} className="mb-2 block font-bold">
        {label}
      </label>
      <input
        type={type}
        name={title}
        placeholder={placeholder}
        id={title + '_input'}
        className="w-full border-2 px-3 py-4"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextInput;
