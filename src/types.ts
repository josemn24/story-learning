export type QuestionType = 'multiple-choice' | 'short-answer' | 'creative-writing';

export interface Checkpoint {
  type: QuestionType;
  question: string;
  answer?: string | number;
  options?: string[];
}

export interface Story {
  title: string;
  description?: string;
  stages: StoryStage[];
}
export interface StoryStage {
  content: string;
  checkpoint: Checkpoint;
  image?: {
    src: string;
    alt: string;
  };
}
