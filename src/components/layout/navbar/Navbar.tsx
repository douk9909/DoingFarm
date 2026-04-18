import Link from 'next/link';
import styles from './Navbar.module.css';
import { PATH } from '@/lib/constants/path';

export default function Navbar() {
  return (
    <header>
      <Link href={PATH.HOME}>Do!ngFarm</Link>

      <div>
        <button type="button">유저 메뉴</button>
      </div>
    </header>
  );
}
