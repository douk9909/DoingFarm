import { createContext, useContext } from 'react';

const ColumnRefetchContext = createContext<(() => void) | null>(null);

export const useColumnRefetch = () => {
  const refetch = useContext(ColumnRefetchContext);
  if (!refetch) throw new Error('ColumnRefetchContext가 없음');
  return refetch;
};

export default ColumnRefetchContext;
