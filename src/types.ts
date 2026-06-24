export interface Question {
  id: string;
  label: string;
  description?: string;
}

export interface FileSection {
  id: string;
  fileName: string;
  title: string;
  description: string;
  questions: Question[];
}

export type Answers = Record<string, string>;
