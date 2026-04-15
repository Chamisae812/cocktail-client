import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:4000",
});

// 인터셉터(intercepter) : 요청/응답 시 중간에 가로채는 함수
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if(token) {
    // 토큰이 있다면 요청 시 헤더에 토큰을 넣어서 보냄
    // Authorization : Bearer 토큰은 JWT 인증의 표준형식
    config.headers.Authorization = `Bearer ${token}`;
  }
  // 수정된 config를 반환해야 요청 시 전송됨
  return config;
});

export default instance;
