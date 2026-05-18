export const generateExtractionPrompt = (documentType: string) => {
  const prompts: Record<string, string> = {
    meeting_minutes: `
You are an expert financial analyst specializing in Self-Help Group (SHG) credit assessment.

Analyze this SHG meeting minutes document and extract the following data points:

1. **Attendance Information:**
   - Total members in the group
   - Number of members present in each meeting
   - Calculate attendance rate for the last 6 meetings

2. **Financial Transactions:**
   - Monthly savings contributions (per member)
   - Total group savings corpus
   - Any penalties or fines collected

3. **Internal Lending:**
   - Number of internal loans issued
   - Repayment status of loans
   - Any defaults or overdues

4. **Meeting Consistency:**
   - Meeting dates (extract all)
   - Calculate meetings per month

Return ONLY a JSON object with this exact structure:
{
  "attendance": {
    "totalMembers": number,
    "lastSixMeetings": [number, number, ...],
    "averageRate": number // (0-1)
  },
  "savings": {
    "monthlyPerMember": number,
    "totalCorpus": number,
    "growthRate": number // (0-1)
  },
  "internalLending": {
    "activeLoans": number,
    "defaultedLoans": number,
    "ontimeRepayments": number
  },
  "meetings": {
    "dates": ["YYYY-MM-DD", ...],
    "frequency": number // (meetings in last 12 months)
  }
}
`,

    bank_statement: `
You are analyzing a bank passbook for an SHG credit assessment.

Extract:
1. **Account Balance Trend:** Opening and closing balance for last 6 months
2. **Deposits:** Frequency and consistency of deposits
3. **Withdrawals:** Pattern and purpose (if mentioned)
4. **Loan Repayments:** Any EMI payments to external banks

Return JSON:
{
  "balances": {
    "current": number,
    "sixMonthsAgo": number,
    "growthRate": number
  },
  "deposits": {
    "monthlyAverage": number,
    "consistency": number // (0-1, 1 = every month)
  },
  "externalLoans": {
    "active": boolean,
    "repaymentHistory": "excellent" | "good" | "poor"
  }
}
`,

    loan_ledger: `
Analyze this internal loan ledger for SHG credit assessment.

Extract:
1. **Loan Portfolio:** Total loans issued, average loan size
2. **Repayment Performance:** On-time vs. delayed vs. defaulted
3. **Default Rate:** Percentage of loans never repaid

Return JSON:
{
  "portfolio": {
    "totalLoans": number,
    "totalAmount": number,
    "averageLoanSize": number
  },
  "repayment": {
    "ontime": number,
    "delayed": number,
    "defaulted": number,
    "defaultRate": number // (0-1)
  }
}
`
  };

  return prompts[documentType] || prompts.meeting_minutes;
};
