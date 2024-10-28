import React from 'react';
import '../styles/main.css';

const CategorySection = ({ title, isOpen, onToggle, children }) => {
  return (
    <div className="category-section">
      <button
        onClick={onToggle}
        className="category-button"
      >
        <span className="category-title">{title}</span>
        <span className="chevron">{isOpen ? '▲' : '▼'}</span>
      </button>
      {isOpen && (
        <div className="category-content">
          {children}
        </div>
      )}
    </div>
  );
};

export default CategorySection;
