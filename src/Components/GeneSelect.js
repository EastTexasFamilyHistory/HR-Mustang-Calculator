import React from 'react';
import '../styles/inputs.css';

const GeneSelect = ({ label, options, value, onChange }) => {
  return (
    <div className="gene-select">
      <label className="gene-label">
        {label}
      </label>
      <select 
        value={value} 
        onChange={(e) => onChange(e.target.value)}
        className="gene-dropdown"
      >
        {options.map(option => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
    </div>
  );
};

export default GeneSelect;
