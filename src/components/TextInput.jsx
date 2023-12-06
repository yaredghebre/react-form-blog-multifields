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

    if (type === 'checkbox') {
      newValue = e.target.checked;
    }

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
        {...{
          value: type !== 'checkbox' ? value : undefined,
          checked: type === 'checkbox' ? value : undefined,
        }}
        className="w-full border-2 px-3 py-4"
        value={value}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default TextInput;
