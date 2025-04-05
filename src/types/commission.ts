export interface Commission {
  code: string;
  description: string;
  unitMeasure: string;
  warehouse: string;
  location: string;
  
  // Tax settings
  affectedByIGV: boolean;
  igvAffectationCode: string;
  igvRate: string;
  affectedByIVAP: boolean;
  
  // ISC settings
  affectedByISC: boolean;
  iscType: string;
  iscPercentage: string;
  iscUnitMeasure: string;
  
  // Other tax settings
  affectedByICBPER: boolean;
  affectedByPerception: boolean;
  perceptionPercentage: string;
  affectedByDetraction: boolean;
  detractionCode: string;
  detractionPercentage: string;
  
  // Inventory control
  reorderPoint: string;
  safetyStock: string;
  minimumStock: string;
  maximumStock: string;
}

export const defaultCommission: Commission = {
  code: "",
  description: "",
  unitMeasure: "",
  warehouse: "",
  location: "",
  
  affectedByIGV: false,
  igvAffectationCode: "",
  igvRate: "",
  affectedByIVAP: false,
  
  affectedByISC: false,
  iscType: "",
  iscPercentage: "0",
  iscUnitMeasure: "",
  
  affectedByICBPER: false,
  affectedByPerception: false,
  perceptionPercentage: "0",
  affectedByDetraction: false,
  detractionCode: "",
  detractionPercentage: "0",
  
  reorderPoint: "0",
  safetyStock: "0",
  minimumStock: "0",
  maximumStock: "0"
};
