"use client";

import { useEffect, useState } from "react";
import { login } from "./login";

export default function LoginComponent() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailTouched, setEmailTouched] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [failedLoginAttempts, setFailedLoginAttempts] = useState(1);

  useEffect(() => {
    if (emailTouched && email.length === 0) {
      setEmailError("이메일을 입력해주세요");
    } else {
      setEmailError("");
    }
  }, [email, emailTouched]);

  useEffect(() => {
    if (passwordTouched && password.length === 0) {
      setPasswordError("비밀번호를 입력해주세요");
    } else {
      setPasswordError("");
    }
  }, [password, passwordTouched]);

  const handleLogin = async () => {
    if (failedLoginAttempts === 5 || failedLoginAttempts > 5) {
      return alert("접속이 제한된 계정입니다. 관리자에게 문의해 주세요. ");
    }

    setError("");
    setLoading(true);

    const response = await login(email, password);
    if (response) {
      console.log("로그인 시도 성공");
    }
    setLoading(false);

    if (response?.success) {
      console.log("로그인 성공!", response);
    } else {
      if (response?.message) {
        setError(response?.message);
        setFailedLoginAttempts((prev) => prev + 1);
        alert(
          `아이디 또는 비밀번호를 다시 확인하세요.(실패${failedLoginAttempts}/5)`
        );
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-96">
        <h2 className="text-xl font-semibold text-gray-700 text-center mb-4">
          로그인
        </h2>

        <div className="mb-3">
          <label className="block text-gray-600 text-sm mb-1">이메일</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="이메일 입력"
            onBlur={() => setEmailTouched(true)}
          />
          {emailError && (
            <p className="text-red-600 test-sm mt-1">{emailError}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="block text-gray-600 text-sm mb-1">비밀번호</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-300"
            placeholder="비밀번호 입력"
            onBlur={() => setPasswordTouched(true)}
          />
          {passwordError && (
            <p className="text-red-600 test-sm mt-1">{passwordError}</p>
          )}
        </div>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-2 rounded-md mt-3 hover:bg-indigo-700 transition disabled:bg-gray-400"
        >
          {loading ? "로그인 중..." : "로그인"}
        </button>
      </div>
    </div>
  );
}
