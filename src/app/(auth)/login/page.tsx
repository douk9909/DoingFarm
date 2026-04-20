import { Input } from '../../../components/common/input/Input';

export default function LoginPage() {
  return (
    <section>
      <h1>로그인</h1>
      <p>로그인 페이지 초안</p>
      <Input placeholder="아이디" />
      <Input placeholder="비밀번호" type="password" />
    </section>
  );
}
