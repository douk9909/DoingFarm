import Link from 'next/link';
import styles from './Sidebar.module.css';
import { PATH } from '@/lib/constants/path';

export default function Sidebar() {
  return (
    <aside>
      <Link href={PATH.MY_DASHBOARD}>내 대시보드</Link>

      <div>
        <p>대시보드 목록</p>
        <button type="button">+ 새 대시보드</button>
      </div>
    </aside>
  );
}
