'use client';

import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import Card from '@/components/common/card/Card';
import type { Card as CardType } from '@/types/card';
import { useRef } from 'react';

interface DraggableCardProps {
  card: CardType;
  onClick?: () => void;
}

export default function DraggableCard({ card, onClick }: DraggableCardProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
    data: { card }, // 드래그할 때 카드 정보를 담아둬요
  });

  const mouseDownTimeRef = useRef(0);

  const handleMouseDown = () => {
    mouseDownTimeRef.current = Date.now();
  };

  const handlePointerUp = () => {
    const elapsed = Date.now() - mouseDownTimeRef.current;
    console.log('elapsed:', elapsed);
    if (elapsed < 200) {
      onClick?.();
    }
  };

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    cursor: 'grab',
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      onMouseDown={handleMouseDown}
      onPointerUp={handlePointerUp}
      {...listeners}
    >
      <Card
        id={card.id}
        title={card.title}
        tags={card.tags}
        dueDate={card.dueDate}
        assignee={card.assignee}
        src={card.imageUrl}
      />
    </div>
  );
}
