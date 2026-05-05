'use client';

import { useEffect, useReducer, useRef, useState } from 'react';
import Image from 'next/image';

import Modal from '@/components/common/modal/Modal';
import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';
import DropdownMenu from '@/components/common/DropDownMenu/DropDownMenu';
import CommentForm from '@/components/common/commentForm/CommentForm';

import EditIcon from '@/assets/icons/EditIcon';
import TrashIcon from '@/assets/icons/TrashIcon';
import MoreIcon from '@/assets/icons/MoreIcon';
import CloseIcon from '@/assets/icons/CloseIcon';

import { cardApi } from '@/lib/api/card';
import { commentApi } from '@/lib/api/comment';
import { formatDate } from '@/lib/utils/formatDate';
import { showToast } from '@/lib/utils/toast';
import { getHashColor } from '@/lib/utils/color';

import type { Card } from '@/types/card';
import type { Comment } from '@/types/comment';
import type { User } from '@/types/user';

import styles from './TodoView.module.css';
import SkeletonTodoViewContent from './SkeletonTodoViewContent';

function formatDateTime(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'UTC',
  });
}

function formatDueDateTime(date: string | Date) {
  const d = new Date(date);
  return d.toLocaleString('ko-KR', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    timeZone: 'Asia/Seoul',
  });
}

function TempConfirmModal({
  message,
  onConfirm,
  onCancel,
}: {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal onClose={onCancel}>
      <div className={styles.confirmModal}>
        <p className={styles.confirmMessage}>{message}</p>
        <div className={styles.confirmButtons}>
          <Button variant="secondary" size="sm" onClick={onCancel}>
            취소
          </Button>
          <Button variant="primary" size="sm" onClick={onConfirm}>
            삭제
          </Button>
        </div>
      </div>
    </Modal>
  );
}

interface CommentState {
  items: Comment[];
  hasMore: boolean;
  isLoading: boolean;
}

type CommentAction =
  | { type: 'RESET' }
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; comments: Comment[]; hasMore: boolean; isFirstPage: boolean }
  | { type: 'FETCH_ERROR' }
  | { type: 'ADD'; comment: Comment }
  | { type: 'UPDATE'; comment: Comment }
  | { type: 'DELETE'; commentId: number };

function commentReducer(state: CommentState, action: CommentAction): CommentState {
  switch (action.type) {
    case 'RESET':
      return { items: [], hasMore: true, isLoading: false };
    case 'FETCH_START':
      return { ...state, isLoading: true };
    case 'FETCH_SUCCESS':
      return {
        items: action.isFirstPage ? action.comments : [...state.items, ...action.comments],
        hasMore: action.hasMore,
        isLoading: false,
      };
    case 'FETCH_ERROR':
      return { ...state, isLoading: false };
    case 'ADD':
      return { ...state, items: [action.comment, ...state.items] };
    case 'UPDATE':
      return {
        ...state,
        items: state.items.map((c) => (c.id === action.comment.id ? action.comment : c)),
      };
    case 'DELETE':
      return { ...state, items: state.items.filter((c) => c.id !== action.commentId) };
    default:
      return state;
  }
}

const COMMENT_PAGE_SIZE = 5;

function useComments(cardId: number) {
  const [state, dispatch] = useReducer(commentReducer, {
    items: [],
    hasMore: true,
    isLoading: false,
  });
  const isFetchingRef = useRef(false);
  const cursorRef = useRef<number | undefined>(undefined);

  const fetchComments = async (isFirstPage: boolean) => {
    if (isFetchingRef.current) return;
    if (!isFirstPage && cursorRef.current === undefined) return;
    isFetchingRef.current = true;
    dispatch({ type: 'FETCH_START' });
    try {
      const res = await commentApi.getList({
        cardId,
        size: COMMENT_PAGE_SIZE,
        cursorId: isFirstPage ? undefined : cursorRef.current,
      });
      const { comments, cursorId: nextCursor } = res.data;
      cursorRef.current = nextCursor ?? undefined;
      dispatch({
        type: 'FETCH_SUCCESS',
        comments,
        hasMore: nextCursor !== null && nextCursor !== undefined,
        isFirstPage,
      });
    } catch {
      dispatch({ type: 'FETCH_ERROR' });
    } finally {
      isFetchingRef.current = false;
    }
  };

  useEffect(() => {
    isFetchingRef.current = false;
    cursorRef.current = undefined;
    dispatch({ type: 'RESET' });
    const t = setTimeout(() => void fetchComments(true), 0);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  const fetchMore = () => {
    if (state.hasMore && !isFetchingRef.current) void fetchComments(false);
  };

  return { ...state, dispatch, fetchMore, isFetchingRef };
}

function SideInfo({
  card,
  dashboardTitle,
  columnTitle,
}: {
  card: Card;
  dashboardTitle?: string;
  columnTitle: string;
}) {
  return (
    <>
      <div className={styles.sideSection}>
        <span className={styles.sideLabel}>프로젝트</span>
        <span className={styles.sideValue}>
          {dashboardTitle ? `${dashboardTitle} / ${columnTitle}` : columnTitle}
        </span>
      </div>
      <div className={styles.sideSection}>
        <span className={styles.sideLabel}>담당자</span>
        <div className={styles.assignee}>
          <Avatar
            src={card.assignee?.profileImageUrl ?? null}
            name={card.assignee?.nickname ?? ''}
            alt={card.assignee?.nickname ?? '담당자'}
          />
          <span className={styles.sideValue}>{card.assignee?.nickname}</span>
        </div>
      </div>
      {card.dueDate && (
        <div className={styles.sideSection}>
          <span className={styles.sideLabel}>마감일</span>
          <span className={styles.sideValue}>{formatDueDateTime(card.dueDate)}</span>{' '}
        </div>
      )}
    </>
  );
}

export interface TodoViewContentProps {
  cardId: number;
  columnId: number;
  dashboardId: number;
  dashboardTitle?: string;
  columnTitle: string;
  currentUser: User;
  onClose: () => void;
  onCardDeleted?: (cardId: number) => void;
  onEditCard?: (card: Card) => void;
}

export default function TodoViewContent({
  cardId,
  columnId,
  dashboardId,
  dashboardTitle,
  columnTitle,
  currentUser,
  onClose,
  onCardDeleted,
  onEditCard,
}: TodoViewContentProps) {
  const [card, setCard] = useState<Card | null>(null);
  const [cardLoading, setCardLoading] = useState(true);

  const {
    items: comments,
    hasMore,
    isLoading: commentLoading,
    dispatch: commentDispatch,
    fetchMore,
    isFetchingRef,
  } = useComments(cardId);

  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [showCardDeleteConfirm, setShowCardDeleteConfirm] = useState(false);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const bottomRef = useRef<HTMLLIElement | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setCardLoading(true);
      try {
        const res = await cardApi.getOne(cardId);
        if (!cancelled) setCard(res.data);
      } catch (e) {
        console.error('카드 불러오기 실패', e);
      } finally {
        if (!cancelled) setCardLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [cardId]);

  useEffect(() => {
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isFetchingRef.current) fetchMore();
      },
      { threshold: 0.1 },
    );
    if (bottomRef.current) observerRef.current.observe(bottomRef.current);
    return () => observerRef.current?.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasMore]);

  const handleCommentCreate = async (content: string) => {
    try {
      const res = await commentApi.create({ content, cardId, columnId, dashboardId });
      commentDispatch({ type: 'ADD', comment: res.data });
    } catch (e) {
      console.error('댓글 등록 실패', e);
      showToast.error('댓글 등록에 실패했습니다.');
    }
  };

  const handleCommentUpdate = async (commentId: number, content: string) => {
    try {
      const res = await commentApi.update(commentId, { content });
      commentDispatch({ type: 'UPDATE', comment: res.data });
      setEditingCommentId(null);
    } catch (e) {
      console.error('댓글 수정 실패', e);
    }
  };

  const handleCommentDelete = async (commentId: number) => {
    try {
      await commentApi.delete(commentId);
      commentDispatch({ type: 'DELETE', commentId });
      showToast.success('댓글이 삭제되었습니다.');
    } catch (e) {
      console.error('댓글 삭제 실패', e);
    }
  };

  const handleCardDelete = async () => {
    try {
      await cardApi.delete(cardId);
      onCardDeleted?.(cardId);
      onClose();
    } catch (e) {
      console.error('카드 삭제 실패', e);
      showToast.error('카드 삭제에 실패했습니다.');
    } finally {
      setShowCardDeleteConfirm(false);
    }
  };

  const cardKebabItems = [
    { id: 'edit', icon: EditIcon, label: '수정하기', onClick: () => card && onEditCard?.(card) },
    {
      id: 'delete',
      icon: TrashIcon,
      color: 'var(--color-danger)',
      label: '삭제하기',
      onClick: () => setShowCardDeleteConfirm(true),
    },
  ];

  if (cardLoading || !card) {
    return (
      <div className={styles.loadingWrapper}>
        <SkeletonTodoViewContent />
      </div>
    );
  }

  if (!card) {
    return (
      <div className={styles.loadingWrapper}>
        <span className={styles.loadingText}>데이터를 불러오지 못했습니다.</span>
      </div>
    );
  }

  return (
    <>
      <div className={styles.layout}>
        <div className={styles.main}>
          <div className={styles.compactHeader}>
            <h2 className={styles.compactTitle}>{card.title}</h2>
            <div className={styles.compactActions}>
              <DropdownMenu trigger={<MoreIcon size={24} />} menuItems={cardKebabItems} />
              <button type="button" className={styles.closeBtn} aria-label="닫기" onClick={onClose}>
                <CloseIcon size={24} />
              </button>
            </div>
          </div>

          <h2 className={styles.pcTitle}>{card.title}</h2>

          {card.tags && card.tags.length > 0 && (
            <div className={styles.tags}>
              {card.tags.map((tag, i) => (
                <span
                  key={`${tag}-${i}`}
                  className={styles.tag}
                  style={{ '--bg-color': getHashColor(tag) } as React.CSSProperties}
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className={styles.separator} />

          <p className={styles.description}>{card.description}</p>

          {card.imageUrl && (
            <div className={styles.imageWrapper}>
              <Image
                src={card.imageUrl}
                alt={card.title}
                width={600}
                height={400}
                className={styles.cardImage}
              />
            </div>
          )}

          <div className={styles.inlineSideInfo}>
            <SideInfo card={card} dashboardTitle={dashboardTitle} columnTitle={columnTitle} />
          </div>

          <div className={styles.separator} />

          <section className={styles.commentSection}>
            <CommentForm
              mode="create"
              currentUser={{
                nickname: currentUser.nickname,
                src: currentUser.profileImageUrl ?? null,
              }}
              onSubmit={handleCommentCreate}
            />
            <ul className={styles.commentList}>
              {comments.map((comment) => {
                const isMine = comment.author.id === currentUser.id;
                const isEditing = editingCommentId === comment.id;
                return (
                  <li key={comment.id} className={styles.commentItem}>
                    <Avatar
                      src={comment.author.profileImageUrl}
                      name={comment.author.nickname}
                      alt={comment.author.nickname}
                    />
                    <div className={styles.commentBody}>
                      <div className={styles.commentTopRow}>
                        <div className={styles.commentMeta}>
                          <span className={styles.commentAuthor}>{comment.author.nickname}</span>
                          <span className={styles.commentDate}>
                            {formatDateTime(comment.createdAt)}
                          </span>
                        </div>
                      </div>
                      {isEditing ? (
                        <CommentForm
                          mode="edit"
                          initialContent={comment.content}
                          currentUser={{
                            nickname: currentUser.nickname,
                            src: currentUser.profileImageUrl ?? null,
                          }}
                          onSubmit={(content) => handleCommentUpdate(comment.id, content)}
                          onCancel={() => setEditingCommentId(null)}
                        />
                      ) : (
                        <>
                          <p className={styles.commentText}>{comment.content}</p>
                          {isMine && (
                            <div className={styles.commentActions}>
                              <button
                                type="button"
                                className={styles.commentActionBtn}
                                onClick={() => setEditingCommentId(comment.id)}
                              >
                                수정
                              </button>
                              <button
                                type="button"
                                className={styles.commentActionBtn}
                                onClick={() => handleCommentDelete(comment.id)}
                              >
                                삭제
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  </li>
                );
              })}
              {hasMore && (
                <li ref={bottomRef} className={styles.scrollAnchor} aria-hidden>
                  {commentLoading && <span className={styles.loadingText}>불러오는 중...</span>}
                </li>
              )}
              {!hasMore && comments.length === 0 && (
                <li className={styles.emptyComment}>아직 댓글이 없어요.</li>
              )}
            </ul>
          </section>
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.sidebarTopActions}>
            <DropdownMenu trigger={<MoreIcon size={24} />} menuItems={cardKebabItems} />
            <button type="button" className={styles.closeBtn} aria-label="닫기" onClick={onClose}>
              <CloseIcon size={24} />
            </button>
          </div>
          <SideInfo card={card} dashboardTitle={dashboardTitle} columnTitle={columnTitle} />
        </aside>
      </div>

      {showCardDeleteConfirm && (
        <TempConfirmModal
          message="이 카드를 삭제하시겠습니까?"
          onConfirm={handleCardDelete}
          onCancel={() => setShowCardDeleteConfirm(false)}
        />
      )}
    </>
  );
}
