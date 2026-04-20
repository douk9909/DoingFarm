import { Input } from '@/components/common/input/Input';
import eyeIcon from '@/app/icon.png';

export default function LoginPage() {
  return (
    <section>
      <h1>로그인</h1>
      <p>로그인 페이지 초안</p>
      <Input placeholder="아이디" label="아이디" />
      <Input
        placeholder="비밀번호"
        type="password"
        label="비밀번호"
        status="error"
        errorMsg="오류메시지"
        rightIcon={() => <img src={eyeIcon.src || eyeIcon} alt="icon" width={24} />}
      />
    </section>
  );
}
