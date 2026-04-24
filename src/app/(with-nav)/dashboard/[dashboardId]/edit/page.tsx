import Avatar from '@/components/common/avatar/Avatar';
import Button from '@/components/common/button/Button';
import { Input } from '@/components/common/input/Input';

interface DashboardEditPageProps {
  params: Promise<{
    dashboardId: string;
  }>;
}

export default async function DashboardEditPage({ params }: DashboardEditPageProps) {
  const { dashboardId } = await params;

  return (
    <section>
      <button>돌아가기</button>

      {/* 대시보드 이름 변경 */}
      <div>
        <h1>대시보드</h1>
        <Input type="text" label="대시보드 이름" value={dashboardId} />
        <div>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
          <button></button>
        </div>
        <Button>변경</Button>
      </div>
      {/* 대시보드 구성원 변경 */}
      <div>
        <div>
          <h1>구성원</h1>
          <div>
            <span>n 페이지 중 n</span>
            <div>
              <button></button>
              <button></button>
            </div>
          </div>
        </div>
        <div>
          <p>이름</p>
          <ul>
            <li>
              <Avatar name="이름" />
              <span>이름</span>
              <Button>삭제</Button>
            </li>
          </ul>
        </div>
      </div>
      {/* 대시보드 초대 내역 */}
      <div>
        <div>
          <h1>초대 내역</h1>
          <Button>초대하기</Button>
        </div>
        <div>
          <p>이메일</p>
          <ul>
            <li>
              <Avatar name="이름" />
              <span>이메일</span>
              <Button>취소</Button>
            </li>
          </ul>
        </div>
      </div>
      {/* 대시보드 삭제 버튼 */}
      <Button>대시보드 삭제 </Button>
    </section>
  );
}
