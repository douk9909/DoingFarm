import Image from 'next/image';
import Avatar from '@/components/common/avatar/Avatar';
import characterImg from '@/assets/character/carrot1.svg';
import sideMenuIcon from '@/assets/icon/ic_sidemenu.svg';
import settingIcon from '@/assets/icon/ic_setting.svg';
import userPlusIcon from '@/assets/icon/ic_user-plus.svg';
import styles from './Navbar.module.css';
import { cn } from '@/lib/utils/cn';

const MAX_VISIBLE_USERS = 5;

export default function Navbar() {
  // Todo: 목업 데이터 - API 연동 후 삭제 예정
  const users = [
    { id: 1, nickname: '홍길동', profileImage: null },
    { id: 2, nickname: '김순덕', profileImage: null },
    { id: 3, nickname: '박미자', profileImage: null },
    { id: 4, nickname: '김순이', profileImage: null },
    { id: 5, nickname: '박순자', profileImage: null },
    { id: 6, nickname: '제갈순이', profileImage: null },
    { id: 7, nickname: '신짱구', profileImage: null },
    { id: 8, nickname: '홍길순', profileImage: null },
  ];

  const displayUsers = users.slice(0, MAX_VISIBLE_USERS);
  const extraCount = users.length - MAX_VISIBLE_USERS;

  return (
    <header className={styles.container}>
      <div className={styles.leftContainer}>
        <Image
          src={characterImg}
          alt="캐릭터이미지"
          width={60}
          height={72}
          className={styles.characterImg}
        />
        <button className={cn(styles.button, styles.sideMenuButton)}>
          {/* Todo: 사이드메뉴 열기 */}
          <Image src={sideMenuIcon} alt="사이드메뉴아이콘" className={styles.onlyMobileIcon} />
        </button>
      </div>

      <div className={styles.rightContainer}>
        {/* Todo: 나의 대시보드 페이지일 땐  보이지 않도록 처리 */}
        <div className={styles.userList}>
          {displayUsers.map((user) => (
            <Avatar
              key={user.id}
              src={user.profileImage}
              name={user.nickname}
              alt={user.nickname}
              className={styles.profile}
            />
          ))}
          {extraCount > 0 && <span className={styles.extraCount}>+{extraCount}</span>}
        </div>

        <div className={styles.line}></div>

        <div className={styles.buttonContainer}>
          {/* Todo: dashboard/{dashboardId}/edit로 페이지 이동 */}
          <button className={cn(styles.button, styles.textButton)}>
            <Image src={settingIcon} alt="설정아이콘" />
            <span>관리</span>
          </button>

          {/* Todo: 초대하기 모달창 띄우기 */}
          <button className={cn(styles.button, styles.textButton, styles.inviteButton)}>
            <Image src={userPlusIcon} alt="초대아이콘" className={styles.iconStyle} />
            <span>초대</span>
          </button>
        </div>
      </div>
    </header>
  );
}
