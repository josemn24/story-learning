export type QuestionType = 'multiple-choice' | 'short-answer' | 'creative-writing';

export type BookLayoutType = 'text-left-image-right' | 'image-left-text-right' | 'text-left-right' | 'full-image';

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
  layoutType: BookLayoutType;
}
