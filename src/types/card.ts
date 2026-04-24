export interface CardAssignee {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export interface Card {
  id: number;
  title: string;
  description: string;
  tags: string[];
  dueDate: string;
  assignee: CardAssignee;
  imageUrl: string | null;
  teamId: string;
  columnId: number;
  createdAt: string;
  updatedAt: string;
}
