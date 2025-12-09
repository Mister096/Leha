export enum ExerciseType {
  MULTIPLE_CHOICE = 'MULTIPLE_CHOICE',
  FILL_IN_BLANK = 'FILL_IN_BLANK'
}

export interface Exercise {
  question: string;
  type: ExerciseType;
  options?: string[]; // For multiple choice
  correctAnswer: string;
  explanation: string;
}

export interface TopicContent {
  topicTitle: string;
  ruleExplanation: string; // Markdown supported
  exercises: Exercise[];
}

export interface TopicDefinition {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export type LoadingState = 'idle' | 'loading' | 'success' | 'error';