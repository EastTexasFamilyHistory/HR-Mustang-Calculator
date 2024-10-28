import React, { useState } from 'react';
import HorseInput from './Components/HorseInput';
import ResultSection from './Components/ResultSection';
import { GENE_CONFIG } from './Utils/geneConfigs';
import { calculateSingleGeneProbability, calculateCreamPearl } from './Utils/calculations';
import { determineColor } from './Utils/colorDetermination';
import './styles/main.css';

function App() {
  const initialGenes = Object.fromEntries(
    Object.keys(GENE_CONFIG).map(gene => [gene, "N/A"])
  );

  const [sire, setSire] = useState(initialGenes);
  const [dam, setDam] = useState(initialGenes);
  const [result, setResult] = useState(null);

  const calculateFoal = () => {
    let combinations = [{ genes: {}, probability: 100 }];

    Object.entries(GENE_CONFIG).forEach(([gene, config]) => {
      const geneProbabilities = config.type === "codominant" ?
        calculateCreamPearl(sire[gene], dam[gene]) :
        calculateSingleGeneProbability(sire[gene], dam[gene], config.type);
      
      if (geneProbabilities.length === 0) return;

      const newCombinations = [];
      combinations.forEach(existing => {
        geneProbabilities.forEach(([genotype, probability]) => {
          newCombinations.push({
            genes: { ...existing.genes, [gene]: genotype },
            probability: (existing.probability * probability) / 100
          });
        });
      });
      combinations = newCombinations;
    });

    setResult(combinations.map(combo => ({
      combo: Object.entries(combo.genes)
        .map(([gene, value]) => `${value}`)
        .join('/'),
      genes: combo.genes,
      color: determineColor(combo.genes),
      probability: Number(combo.probability.toFixed(2))
    })).sort((a, b) => b.probability - a.probability));
  };

  const copyResults = () => {
    if (!result) return;
    const text = result.map(combo => 
      `${combo.color} (${combo.probability}%): ${combo.combo}`
    ).join('\n');
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="app-container">
      <div className="calculator-container">
        <h1 className="main-title">Horse Reality Mustang Foal Calculator</h1>
        
        <div className="calculator-content">
          <HorseInput title="Sire" values={sire} onChange={setSire} />
          <HorseInput title="Dam" values={dam} onChange={setDam} />
          
          <button 
            onClick={calculateFoal}
            className="calculate-button"
          >
            Calculate Possible Foal Genes
          </button>

          {result && (
            <div className="results-section">
              <div className="results-header">
                <h3>Possible Foal Combinations</h3>
                <button onClick={copyResults} className="copy-button">
                  <span>📋</span>
                  Copy Results
                </button>
              </div>
              <ResultSection combinations={result} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
