import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { login } from "../api/users";
import { toast } from "sonner";

const LoginPage = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(form);
      // JWT 토큰을 localStorage에 저장
      // 나중에 인증이 필요한 요청을 보낼 때 꺼내서 사용
      localStorage.setItem("token", data.token);
      localStorage.setItem("name", data.name);
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "로그인에 실패했습니다.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">로그인</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">이메일</label>
            <input
              id="email"
              type="email"
              placeholder="이메일을 입력하세요"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">비밀번호</label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
            />
          </div>
          <button type="submit" className="login-button">
            로그인
          </button>
        </form>
        <p className="login-footer">
          아직 계정이 없으신가요? <Link to="/signup">회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
