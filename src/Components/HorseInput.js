import React, { useState } from 'react';
import CategorySection from './CategorySection';
import GeneSelect from './GeneSelect';
import { GENE_CATEGORIES, GENE_CONFIG } from '../Utils/geneConfigs';
import '../styles/inputs.css';

const HorseInput = ({ title, values, onChange }) => {
  const [openSections, setOpenSections] = useState({
    color: true,
    dilution: false,
    patterns: false,
    hidden: false
  });

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="horse-input">
      <h3 className="horse-input-title">{title}</h3>
      {Object.entries(GENE_CATEGORIES).map(([category, { title, genes }]) => (
        <CategorySection
          key={category}
          title={title}
          isOpen={openSections[category]}
          onToggle={() => toggleSection(category)}
        >
          <div className="gene-grid">
            {genes.map(gene => (
              <GeneSelect
                key={gene}
                label={GENE_CONFIG[gene].label}
                options={GENE_CONFIG[gene].options}
                value={values[gene]}
                onChange={(value) => onChange({ ...values, [gene]: value })}
              />
            ))}
          </div>
        </CategorySection>
      ))}
    </div>
  );
};

export default HorseInput;
