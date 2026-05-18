import { ExtractedData } from './calculate';

export interface Recommendation {
  approved: boolean;
  loanAmount: number;
  interestRate: number;
  tenure: number;
  emi: number;
  justification: string[];
}

export function generateLoanRecommendation(
  score: number,
  riskBand: string,
  savingsCorpus: number,
  extractedData: ExtractedData
): Recommendation {
  
  // Loan amount calculation (4x-10x of savings based on risk)
  const multiplier = 
    riskBand === 'green' ? 10 :
    riskBand === 'yellow' ? 6 : 4;
  
  const baseLoanAmount = savingsCorpus * multiplier;
  
  // Cap by risk band
  const maxLoanAmount = 
    riskBand === 'green' ? 1000000 :
    riskBand === 'yellow' ? 500000 : 200000;
  
  const loanAmount = Math.min(baseLoanAmount, maxLoanAmount);
  
  // Interest rate based on risk
  const interestRate = 
    riskBand === 'green' ? 8.5 :
    riskBand === 'yellow' ? 11.0 : 14.0;
  
  // Tenure (standard 24 months)
  const tenure = 24;
  
  // EMI calculation
  const monthlyRate = interestRate / 100 / 12;
  const emi = Math.round(
    (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) /
    (Math.pow(1 + monthlyRate, tenure) - 1)
  );
  
  // Justification based on extracted data
  const justification: string[] = [];
  
  if (extractedData.repayment.defaultRate === 0) {
    justification.push(`Zero default history (${Math.round(extractedData.repayment.ontimeRate * 100)}% on-time repayment)`);
  }
  
  if (extractedData.attendance.rate >= 0.9) {
    justification.push(`High attendance rate (${Math.round(extractedData.attendance.rate * 100)}%)`);
  }
  
  if (extractedData.savings.growthRate >= 0.2) {
    justification.push(`Strong savings growth (${Math.round(extractedData.savings.growthRate * 100)}% YoY)`);
  }
  
  justification.push(`Savings corpus: ₹${(savingsCorpus / 1000).toFixed(0)}K (${multiplier}x multiplier applied)`);
  
  return {
    approved: riskBand !== 'red',
    loanAmount,
    interestRate,
    tenure,
    emi,
    justification,
  };
}
