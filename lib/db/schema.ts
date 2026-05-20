import { pgTable, uuid, text, timestamp, integer, jsonb, boolean } from 'drizzle-orm/pg-core';

// Users table (Bank officers)
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
  productCategory: text('product_category'), // 'food' | 'handicrafts' | 'textiles' | 'services'
  annualTurnover: integer('annual_turnover'),
  hasGst: boolean('has_gst').default(false),
  hasFssai: boolean('has_fssai').default(false),
  nrlmRegistered: boolean('nrlm_registered').default(false),
  createdBy: uuid('created_by').references(() => users.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Assessments table (Credit Scoring Module)
export const assessments = pgTable('assessments', {
  id: uuid('id').primaryKey().defaultRandom(),
  shgId: uuid('shg_id').references(() => shgGroups.id).notNull(),
  score: integer('score'), // 0-850
  riskBand: text('risk_band'), // 'green' | 'yellow' | 'red'
  status: text('status').notNull().default('pending'), // 'pending' | 'processing' | 'completed' | 'failed'
  
  extractedData: jsonb('extracted_data').$type<{
    attendance: { rate: number; lastSixMonths: number[] };
    savings: { total: number; growthRate: number; perMember: number };
    repayment: { defaultRate: number; ontimeRate: number };
    meetings: { frequency: number; consistency: number };
  }>(),
  
  scoreBreakdown: jsonb('score_breakdown').$type<{
    repaymentReliability: number;
    groupStability: number;
    financialDiscipline: number;
    economicActivity: number;
  }>(),
  
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
  fileType: text('file_type').notNull(),
  sizeBytes: integer('size_bytes'),
  uploadedAt: timestamp('uploaded_at').defaultNow(),
});

// E-Commerce Profiles (Module 2)
export const ecommerceProfiles = pgTable('ecommerce_profiles', {
  id: uuid('id').primaryKey().defaultRandom(),
  shgId: uuid('shg_id').references(() => shgGroups.id).notNull(),
  productType: text('product_type'),
  monthlyCapacity: integer('monthly_capacity'),
  canShipNationwide: boolean('can_ship_nationwide').default(false),
  recommendedPlatforms: jsonb('recommended_platforms').$type<string[]>(),
  registrationStatus: jsonb('registration_status').$type<{
    amazon?: 'not_started' | 'in_progress' | 'completed';
    flipkart?: 'not_started' | 'in_progress' | 'completed';
    meesho?: 'not_started' | 'in_progress' | 'completed';
    gem?: 'not_started' | 'in_progress' | 'completed';
  }>(),
  documentsReady: jsonb('documents_ready').$type<string[]>(),
  firstListingDate: timestamp('first_listing_date'),
  currentMonthlyRevenue: integer('current_monthly_revenue'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// AI Chat Sessions (for both modules)
export const aiChatSessions = pgTable('ai_chat_sessions', {
  id: uuid('id').primaryKey().defaultRandom(),
  shgId: uuid('shg_id').references(() => shgGroups.id),
  sessionType: text('session_type').notNull(), // 'ecommerce' | 'schemes' | 'advisor'
  messages: jsonb('messages').$type<Array<{
    role: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }>>(),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Government Scheme Applications (Module 3)
export const schemeApplications = pgTable('scheme_applications', {
  id: uuid('id').primaryKey().defaultRandom(),
  shgId: uuid('shg_id').references(() => shgGroups.id).notNull(),
  schemeName: text('scheme_name').notNull(),
  schemeCode: text('scheme_code'),
  eligibilityScore: integer('eligibility_score'), // 0-100
  potentialBenefit: integer('potential_benefit'), // in rupees
  applicationStatus: text('application_status').default('not_started'), // 'not_started' | 'in_progress' | 'submitted' | 'under_review' | 'approved' | 'rejected'
  applicationData: jsonb('application_data'), // pre-filled form data
  applicationId: text('application_id'), // govt issued ID after submission
  submittedAt: timestamp('submitted_at'),
  expectedApprovalDate: timestamp('expected_approval_date'),
  notes: text('notes'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Audit logs table
export const auditLogs = pgTable('audit_logs', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id).notNull(),
  action: text('action').notNull(),
  assessmentId: uuid('assessment_id').references(() => assessments.id),
  metadata: jsonb('metadata'),
  timestamp: timestamp('timestamp').defaultNow(),
});
