import { createContext, useContext, useState } from "react";

/*
    context : 여러 컴포넌트가 함께 쓸 수 있는 전역 공간
*/

const AuthContext = createContext(null);

/*
    provider : context를 사용할 수 있도록 감싸주는 컴포넌트
*/

export const AuthProvider = ({ children}) => {
    // localStorage에서 토큰을 꺼내서 로그인 여부 확인
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [name, setName] = useState(localStorage.getItem("name"));

    const login = (data) => {
        // JWT 토큰을 localStorage에 저장
        // 나중에 인증이 필요한 요청을 보낼 때 꺼내서 사용
        localStorage.setItem("token", data.token);
        localStorage.setItem("name", data.name);
        // state를 바꾸면 context를 사용하는 모든 컴포넌트가 즉시 렌더링
        setToken(data.token);
        setName(data.name);
    };

    const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    setToken(null);
    setName(null);
  }

    return ( <AuthContext.Provider value={{ login, token, name, logout }}>
        {children}
        </AuthContext.Provider>
    );
};

// 커스텀 훅 : 전체 공간에서 값을 꺼내 쓸 수 있도록 편의 함수 만듦
export const useAuth = () => useContext(AuthContext);
