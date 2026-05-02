import { createContext, useContext } from 'react';

const ColumnRefetchContext = createContext<(() => void) | null>(null);

export const useColumnRefetch = () => {
  const refetch = useContext(ColumnRefetchContext);
  if (!refetch) throw new Error('ColumnRefetchConxt가 없음');
  return refetch;
};

export default ColumnRefetchContext;
