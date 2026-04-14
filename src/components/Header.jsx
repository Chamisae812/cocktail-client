import { Link, useSearchParams } from "react-router-dom";
import "./Header.css";

const Header = () => {
  // localStorage에서 토큰을 꺼내서 로그인 여부 확인
  const token = localStorage.getItem("token");
  const name = localStorage.getItem("name");
  console.log(token); //없으면 null
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
  }
  return (
    <>
      <header className="site-header">
        <div className="site-header__brand">
          <Link to="/" className="site-header__logo">
            칵테일 레시피
          </Link>
        </div>
        <nav className="site-header__nav">
          {token ? (
            <>
              <span>{name}님, 환영합니다!</span>
              <button onClick={logout}>로그아웃</button>
            </>
        ) : <Link className="site-header__link" to="/login"> 로그인 </Link>}
        </nav>
      </header>
    </>
  );
};
export default Header;
