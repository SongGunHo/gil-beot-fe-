// React에서 상태(state)를 관리하기 위한 Hook import
import { useState } from "react";

function App() {

  // 이메일 상태 변수
  // email : 현재 값
  // setEmail : 값을 변경하는 함수
  const [email, setEmail] = useState("");

  // 비밀번호 상태 변수
  const [password, setPassword] = useState("");

  // 로그인 버튼을 눌렀을 때 실행되는 함수
  const login = async () => {

    // Spring Boot 로그인 API 호출
    const response = await fetch("http://localhost:8080/api/member/login", {

      // HTTP 요청 방식 (로그인이므로 POST)
      method: "POST",

      // 요청 헤더
      headers: {
        "Content-Type": "application/json", // JSON 데이터 전송
      },

      // 서버로 보낼 데이터
      // JSON 문자열로 변환해야 함
      body: JSON.stringify({
        email,
        password,
      }),
    });

    // 응답이 실패한 경우
    if (!response.ok) {
      alert("로그인 실패");
      return;
    }

    // 서버에서 받은 JSON 데이터를 객체로 변환
    const data = await response.json();

    // 서버에서 받은 JWT 토큰을 localStorage에 저장
    // 나중에 인증이 필요한 API 호출 시 사용
    localStorage.setItem("token", data.token);

    // 로그인 성공 메시지
    alert("로그인 성공");

    // 콘솔에 데이터 출력 (디버깅용)
    console.log(data);
  };

  return (
    // 화면 전체 영역
    <div style={{ padding: "50px" }}>
      
      {/* 제목 */}
      <h1>로그인</h1>

      {/* 이메일 입력창 */}
      <input
        placeholder="email"           // 입력 안내 텍스트
        value={email}                 // 현재 email 상태 값
        onChange={(e) => setEmail(e.target.value)} 
        // 입력값이 바뀌면 email 상태 업데이트
      />

      <br />
      <br />

      {/* 비밀번호 입력창 */}
      <input
        type="password"               // 비밀번호 숨김 처리
        placeholder="password"
        value={password}              // 현재 password 상태 값
        onChange={(e) => setPassword(e.target.value)}
        // 입력값이 바뀌면 password 상태 업데이트
      />

      <br />
      <br />

      {/* 로그인 버튼 */}
      <button onClick={login}>
        로그인
      </button>

    </div>
  );
}

// 다른 파일에서 사용할 수 있도록 export
export default App;