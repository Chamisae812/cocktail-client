import { Link, useSearchParams } from "react-router-dom";
import "./Header.css";
import { useAuth } from "../context/AuthContext"

const Header = () => {
  const { token, name, logout } = useAuth();
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
