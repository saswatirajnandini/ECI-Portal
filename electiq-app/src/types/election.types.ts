export interface Election {
  id: string;
  name: string;
  type: 'federal' | 'state' | 'local';
  election_date: string;
  state?: string;
  office?: string;
  candidates?: Candidate[];
  description?: string;
  official_source?: string;
}

export interface Candidate {
  name: string;
  party: string;
  incumbent?: boolean;
}

export interface ElectionPhase {
  id: string;
  election_id: string;
  phase_name: string;
  phase_order: number;
  start_date: string;
  end_date: string;
  description: string;
  is_critical: boolean;
  status: 'completed' | 'active' | 'upcoming';
}

export interface StateRegistrationRule {
  state_code: string;
  state_name: string;
  registration_deadline_type: 'days_before' | 'same_day' | 'automatic';
  registration_deadline_days: number;
  online_registration_available: boolean;
  same_day_registration: boolean;
  automatic_registration: boolean;
  voter_id_required: boolean;
  registration_url: string;
  official_site: string;
}

export interface QuizQuestion {
  id: string;
  module_id: string;
  question_text: string;
  options: { id: string; text: string }[];
  correct_option: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  points: number;
}

export interface QuizAttempt {
  id: string;
  user_id: string;
  module_id: string;
  score: number;
  max_score: number;
  answers: Record<string, string>;
  completed_at: string;
}

export interface FactCheck {
  id: string;
  claim_text: string;
  verdict: 'true' | 'false' | 'misleading' | 'unverified';
  explanation: string;
  sources: { title: string; url: string }[];
  times_checked: number;
  created_at: string;
}

export interface ExplainerModule {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'expert';
  estimated_minutes: number;
  steps: ModuleStep[];
}

export interface ModuleStep {
  title: string;
  content: string;
  diagram?: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  sources?: { title: string; url: string }[];
  timestamp: Date;
}
