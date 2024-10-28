// Gene category definitions
export const GENE_CATEGORIES = {
  color: {
    title: "Base Color Genes",
    genes: ["extension", "agouti"]
  },
  dilution: {
    title: "Dilution Genes",
    genes: ["creamPearl", "dun", "champagne", "silver"]
  },
  patterns: {
    title: "White Patterns",
    genes: ["frame", "tobiano", "roan"]
  },
  hidden: {
    title: "Hidden Genes",
    genes: ["flaxen", "sooty", "pangare"]
  }
};

// Gene configurations with their options and inheritance types
export const GENE_CONFIG = {
  extension: {
    label: "Extension (E/e)",
    type: "dominant",
    options: ["N/A", "EE", "Ee", "ee"]
  },
  agouti: {
    label: "Agouti (A/a)",
    type: "dominant",
    options: ["N/A", "AA", "Aa", "aa", "At", "A+"]
  },
  creamPearl: {
    label: "Cream/Pearl",
    type: "codominant",
    options: ["N/A", "Cream", "Pearl", "Cream Pearl", "Cream/Cream", "Pearl/Pearl"]
  },
  dun: {
    label: "Dun",
    type: "dominant",
    options: ["N/A", "DD", "Dd", "dd"]
  },
  champagne: {
    label: "Champagne",
    type: "dominant",
    options: ["N/A", "ChCh", "Chch", "chch"]
  },
  silver: {
    label: "Silver",
    type: "dominant",
    options: ["N/A", "ZZ", "Zz", "zz"]
  },
  frame: {
    label: "Frame Overo (Lethal when homozygous)",
    type: "dominant-lethal",
    options: ["N/A", "Oo", "oo"]
  },
  tobiano: {
    label: "Tobiano",
    type: "dominant",
    options: ["N/A", "TT", "Tt", "tt"]
  },
  roan: {
    label: "Roan",
    type: "dominant",
    options: ["N/A", "RR", "Rr", "rr"]
  },
  flaxen: {
    label: "Flaxen (Only shows on chestnut)",
    type: "recessive",
    options: ["N/A", "FF", "Ff", "ff"]
  },
  sooty: {
    label: "Sooty (Doesn't show on black/seal bay)",
    type: "dominant",
    options: ["N/A", "SS", "Ss", "ss"]
  },
  pangare: {
    label: "Pangare (Doesn't show on black)",
    type: "dominant",
    options: ["N/A", "PP", "Pp", "pp"]
  }
};
