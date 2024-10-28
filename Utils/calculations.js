// Basic dominant gene inheritance calculator
export const calculateBasicDominant = (sireGene, damGene) => {
  const sireAlleles = sireGene.split('').filter(a => a !== '/');
  const damAlleles = damGene.split('').filter(a => a !== '/');
  
  const results = new Map();
  
  for (const s of sireAlleles) {
    for (const d of damAlleles) {
      const alleles = [s, d].sort();
      const genotype = alleles.join('');
      results.set(genotype, (results.get(genotype) || 0) + 25);
    }
  }
  
  return Array.from(results.entries()).map(([genotype, probability]) => [genotype, probability]);
};

// Calculate single gene inheritance based on type
export const calculateSingleGeneProbability = (sireGene, damGene, type) => {
  if (sireGene === "N/A" || damGene === "N/A") return [];

  if (type === "dominant-lethal") {
    if (sireGene === "Oo" && damGene === "Oo") {
      return [
        ["OO", 25, true], // Lethal combination
        ["Oo", 50],
        ["oo", 25]
      ];
    }
    return calculateBasicDominant(sireGene, damGene);
  }

  return calculateBasicDominant(sireGene, damGene);
};

// Calculate cream/pearl inheritance
export const calculateCreamPearl = (sireGene, damGene) => {
  const interpretParentGenes = (gene) => {
    switch(gene) {
      case "Cream": return { cream: 1, pearl: 0 };
      case "Pearl": return { cream: 0, pearl: 1 };
      case "Cream Pearl": return { cream: 1, pearl: 1 };
      case "Cream/Cream": return { cream: 2, pearl: 0 };
      case "Pearl/Pearl": return { cream: 0, pearl: 2 };
      case "N/A": return { cream: 0, pearl: 0 };
      default: return { cream: 0, pearl: 0 };
    }
  };

  const sireGenes = interpretParentGenes(sireGene);
  const damGenes = interpretParentGenes(damGene);

  const results = new Map();

  const getGenotypeString = (cream, pearl) => {
    if (cream === 2) return "Cream/Cream";
    if (pearl === 2) return "Pearl/Pearl";
    if (cream === 1 && pearl === 1) return "Cream Pearl";
    if (cream === 1) return "Cream";
    if (pearl === 1) return "Pearl";
    return "N/A";
  };

  const calculateAlleles = (parent) => {
    if (parent === 2) return [1];
    if (parent === 1) return [1, 0];
    return [0];
  };

  const sireCreams = calculateAlleles(sireGenes.cream);
  const damCreams = calculateAlleles(damGenes.cream);
  const sirePearls = calculateAlleles(sireGenes.pearl);
  const damPearls = calculateAlleles(damGenes.pearl);

  for (const sc of sireCreams) {
    for (const dc of damCreams) {
      for (const sp of sirePearls) {
        for (const dp of damPearls) {
          const cream = sc + dc;
          const pearl = sp + dp;
          const genotype = getGenotypeString(cream, pearl);
          const probability = (100 / (sireCreams.length * damCreams.length * sirePearls.length * damPearls.length));
          results.set(genotype, (results.get(genotype) || 0) + probability);
        }
      }
    }
  }

  return Array.from(results.entries()).map(([genotype, probability]) => [genotype, probability]);
};
