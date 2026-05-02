import type { CardTag } from '@/components/common/card/Card';

export interface TodoColumnOption {
  id: number;
  title: string;
}

export interface TodoAssigneeOption {
  id: number;
  nickname: string;
}

export interface TodoFormCard {
  title: string;
  tags: CardTag[];
  dueDate: string;
  assignee: {
    nickname: string;
    profileImage: string | null;
  };
  src: string;
}

export interface CreateTodoRequest {
  assigneeUserId?: number;
  title: string;
  description: string;
  dueDate?: string;
  tags?: string[];
  imageUrl?: string;
}