export type QuestionType = 'multiple-choice' | 'short-answer' | 'creative-writing';

export interface Checkpoint {
  type: QuestionType;
  question: string;
  answer?: string | number;
  options?: string[];
}

export interface StoryStage {
  content: string;
  checkpoint: Checkpoint;
  image?: {
    src: string;
    alt: string;
  };
}
