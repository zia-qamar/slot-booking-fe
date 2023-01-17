import React from 'react';

const Dropdown = ({options, onChange}) => {
    return (
        <select className="form-control" onChange={(e) => onChange(e.target.value)}>
            {options.map((option, i) => (
                <option key={i} value={option}>{option}</option>
            ))}
        </select>
    );
};

export default Dropdown;
