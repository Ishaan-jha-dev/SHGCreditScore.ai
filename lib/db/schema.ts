import { pgTable, uuid, text, timestamp, integer, jsonb, decimal } from 'drizzle-orm/pg-core';

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: text('email').notNull().unique(),
  name: text('name').notNull(),
  role: text('role').notNull().default('officer'), // 'admin' | 'manager' | 'officer'
  bankId: text('bank_id'),
  passwordHash: text('password_hash').notNull(),
  createdAt: timestamp('created_at').defaultNow(),
});

// SHG Groups table
export const shgGroups = pgTable('shg_groups', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  district: text('district').notNull(),
  state: text('state').notNull(),
  membersCount: integer('members_count').notNull(),
  formedDate: timestamp('formed_date'),
  bankId: text('bank_id'),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Assessments table
export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  shgId: uuid('shg_id').references(() => shgGroups.id).notNull(),
  score: integer('score'), // 0-850
  riskBand: text('risk_band'), // 'green' | 'yellow' | 'red'
  status: text('status').notNull().default('pending'), // 'pending' | 'processing' | 'completed' | 'failed'
  
  // Extracted data from documents (JSON)
  extractedData: jsonb('extracted_data').$type<{
    attendance: { rate: number; lastSixMonths: number[] };
    savings: { total: number; growthRate: number; perMember: number };
    repayment: { defaultRate: number; ontimeRate: number };
    meetings: { frequency: number; consistency: number };
  }>(),
  
  // Score breakdown
  scoreBreakdown: jsonb('score_breakdown').$type<{
    repaymentReliability: number;
    groupStability: number;
    financialDiscipline: number;
    economicActivity: number;
  }>(),
  
  // Loan recommendation
  recommendation: jsonb('recommendation').$type<{
    approved: boolean;
    loanAmount: number;
    interestRate: number;
    tenure: number;
    emi: number;
    justification: string[];
  }>(),
  
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Documents table
export const documents = pgTable('documents', {
  id: uuid('id').primaryKey().defaultRandom(),
  assessmentId: uuid('assessment_id').references(() => assessments.id).notNull(),
  shgId: uuid('shg_id').references(() => shgGroups.id).notNull(),
  fileUrl: text('file_url').notNull(),
  fileName: text('file_name').notNull(),
  fileType: text('file_type').notNull(), // 'meeting_minutes' | 'bank_statement' | 'loan_ledger' | 'attendance'
  sizeBytes: integer('size_bytes'),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

// Audit logs table
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  action: text('action').notNull(), // 'assessment_created' | 'score_modified' | 'document_accessed'
  assessmentId: uuid('assessment_id').references(() => assessments.id),
  metadata: jsonb('metadata'),
  timestamp: timestamp('timestamp').defaultNow(),
});
