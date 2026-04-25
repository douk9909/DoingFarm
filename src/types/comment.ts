export interface CommentAuthor {
  profileImageUrl: string | null;
  nickname: string;
  id: number;
}

export interface Comment {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  cardId: number;
  author: CommentAuthor;
}
