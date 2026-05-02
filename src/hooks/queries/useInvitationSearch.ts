'use client';

import { useCallback, useState } from 'react';

export function useInvitationSearch() {
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const submitSearch = useCallback(() => {
    // Enter 입력 시 input에 적힌 값을 실제 검색어로 확정
    setSearchKeyword(inputKeyword);
  }, [inputKeyword]);

  return {
    inputKeyword,
    searchKeyword,
    setInputKeyword,
    submitSearch,
  };
}