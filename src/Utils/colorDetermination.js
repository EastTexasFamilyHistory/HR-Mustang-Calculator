// Determine final color based on gene combination
export const determineColor = (genes) => {
  // Determine base color from extension and agouti
  let baseColor = genes.extension === "ee" ? "Chestnut" :
                  genes.agouti === "aa" ? "Black" : "Bay";

  let color = baseColor;
  
  // Apply dilutions
  if (genes.creamPearl && genes.creamPearl !== "N/A") {
    switch(genes.creamPearl) {
      case "Cream/Cream":
        color = baseColor === "Chestnut" ? "Cremello" :
                baseColor === "Black" ? "Smoky Cream" : "Perlino";
        break;
      case "Pearl/Pearl":
        color = baseColor === "Chestnut" ? "Apricot Pearl" :
                baseColor === "Black" ? "Black Pearl" : "Bay Pearl";
        break;
      case "Cream Pearl":
        color = baseColor === "Chestnut" ? "Gold Pearl" :
                baseColor === "Black" ? "Smoky Pearl" : "Amber Pearl";
        break;
      case "Cream":
        color = baseColor === "Chestnut" ? "Palomino" :
                baseColor === "Black" ? "Smoky Black" : "Buckskin";
        break;
      case "Pearl":
        color = baseColor; // Pearl only shows when homozygous or with cream
        break;
    }
  }

  // Add patterns
  const patterns = [];
  if (genes.roan && genes.roan !== "rr" && genes.roan !== "N/A") patterns.push("Roan");
  if (genes.frame === "Oo") patterns.push("Frame");
  if (genes.tobiano && genes.tobiano !== "tt" && genes.tobiano !== "N/A") patterns.push("Tobiano");

  return patterns.length > 0 ? `${color} ${patterns.join(" ")}` : color;
};
