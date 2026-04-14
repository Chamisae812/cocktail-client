import { useState } from "react";
import styles from "./RegisterPage.module.css";
import { register } from "../api/users";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await register(form);
      toast.success("회원가입이 완료되었습니다!");
      navigate("/login");
    } catch (error) {
      if (error.response.status === 409) {
        toast.error("이미 사용 중인 이메일입니다!");
      }
    }
  };

  return (
    <div className={styles.container}>
      <h2>회원가입</h2>
      <form onSubmit={handleSubmit}>
        <input
          className={styles.input}
          type="text"
          placeholder="이름"
          value={form.name}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, name: event.target.value }))
          }
        />
        <input
          className={styles.input}
          type="text"
          placeholder="이메일"
          value={form.email}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, email: event.target.value }))
          }
        />
        <input
          className={styles.input}
          type="password"
          placeholder="비밀번호"
          value={form.password}
          onChange={(event) =>
            setForm((prev) => ({ ...prev, password: event.target.value }))
          }
        />
        <button className={styles.btn}>회원가입</button>
      </form>
    </div>
  );
};
export default RegisterPage;
