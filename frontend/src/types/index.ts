export interface Note {
  title: string;
  content: string;
  tags: string[];
  date: string;
  isPinned?: boolean;
}
