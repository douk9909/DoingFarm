'use client';

import { useCallback, useState } from 'react';

export function useInvitationSearch() {
  const [inputKeyword, setInputKeyword] = useState('');
  const [searchKeyword, setSearchKeyword] = useState('');

  const submitSearch = useCallback(() => {
    // inputKeyword는 사용자가 입력 중인 값이고, searchKeyword는 실제 API 요청에 쓰는 값입니다.
    // Enter를 눌렀을 때만 검색어를 확정해서 입력 중 매번 요청이 나가지 않게 합니다.
    setSearchKeyword(inputKeyword);
  }, [inputKeyword]);

  return {
    inputKeyword,
    searchKeyword,
    setInputKeyword,
    submitSearch,
  };
}
