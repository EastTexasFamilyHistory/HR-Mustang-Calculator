import React, { useState } from 'react';
import '../styles/results.css';

const ResultSection = ({ combinations }) => {
  const [openSections, setOpenSections] = useState({});

  const groupedResults = combinations.reduce((acc, combo) => {
    if (!acc[combo.color]) {
      acc[combo.color] = {
        totalProbability: 0,
        combinations: []
      };
    }
    acc[combo.color].combinations.push(combo);
    acc[combo.color].totalProbability += combo.probability;
    return acc;
  }, {});

  const sortedPhenotypes = Object.entries(groupedResults)
    .sort(([, a], [, b]) => b.totalProbability - a.totalProbability);

  const toggleSection = (color) => {
    setOpenSections(prev => ({
      ...prev,
      [color]: !prev[color]
    }));
  };

  return (
    <div className="results-container">
      {sortedPhenotypes.map(([color, { totalProbability, combinations }]) => (
        <div key={color} className="result-item">
          <button
            onClick={() => toggleSection(color)}
            className="result-header"
          >
            <div className="result-title">
              <span className="color-name">{color}</span>
              <span className="probability-badge">
                {totalProbability.toFixed(2)}%
              </span>
            </div>
            <span className="chevron">
              {openSections[color] ? '▲' : '▼'}
            </span>
          </button>

          {openSections[color] && (
            <div className="genotype-list">
              <div className="genotype-header">Possible Genotypes:</div>
              {combinations.map((combo, index) => (
                <div key={index} className="genotype-item">
                  <span className="genotype-code">{combo.combo}</span>
                  <span className="genotype-probability">
                    {combo.probability.toFixed(2)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ResultSection;
