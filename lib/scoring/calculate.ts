export interface ExtractedData {
  attendance: { rate: number; lastSixMonths: number[] };
  savings: { total: number; growthRate: number; perMember: number };
  repayment: { defaultRate: number; ontimeRate: number };
  meetings: { frequency: number; consistency: number };
}

export interface ScoreBreakdown {
  repaymentReliability: number;
  groupStability: number;
  financialDiscipline: number;
  economicActivity: number;
}

export function calculateCreditScore(data: ExtractedData): {
  score: number;
  breakdown: ScoreBreakdown;
  riskBand: 'green' | 'yellow' | 'red';
} {
  
  // Component 1: Repayment Reliability (Max 340 points = 40% of 850)
  const repaymentBase = 340 * (1 - data.repayment.defaultRate);
  const repaymentBonus = data.repayment.ontimeRate === 1.0 ? 20 : 0;
  const repaymentReliability = Math.min(340, repaymentBase + repaymentBonus);

  // Component 2: Group Stability (Max 255 points = 30% of 850)
  const attendanceScore = 85 * Math.min(1, data.attendance.rate / 0.9);
  const consistencyScore = 85 * data.meetings.consistency;
  const meetingScore = 85 * Math.min(1, data.meetings.frequency / 48);
  const groupStability = attendanceScore + consistencyScore + meetingScore;

  // Component 3: Financial Discipline (Max 170 points = 20% of 850)
  const savingsGrowthScore = 85 * Math.min(1, data.savings.growthRate / 0.2);
  const perMemberScore = data.savings.perMember >= 500 ? 85 : 
                         data.savings.perMember >= 300 ? 60 : 40;
  const financialDiscipline = savingsGrowthScore + perMemberScore;

  // Component 4: Economic Activity (Max 85 points = 10% of 850)
  const hasInternalLending = data.repayment.ontimeRate > 0;
  const economicActivity = hasInternalLending ? 85 : 50;

  const breakdown: ScoreBreakdown = {
    repaymentReliability: Math.round(repaymentReliability),
    groupStability: Math.round(groupStability),
    financialDiscipline: Math.round(financialDiscipline),
    economicActivity: Math.round(economicActivity),
  };

  const totalScore = Math.round(
    repaymentReliability + groupStability + financialDiscipline + economicActivity
  );

  const riskBand: 'green' | 'yellow' | 'red' =
    totalScore >= 700 ? 'green' :
    totalScore >= 550 ? 'yellow' : 'red';

  return { score: Math.min(totalScore, 850), breakdown, riskBand };
}
