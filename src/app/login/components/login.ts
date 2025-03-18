export async function login(email: string, password: string) {
  try {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/posts/1",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    const data = await response.json();

    console.log("백엔드 응답:", data);

    if (!response.ok) {
      throw new Error(data.message || "로그인 실패");
    }

    return { success: true, message: "로그인 성공", token: data.token };
  } catch (error) {
    if (error instanceof Error)
      return { success: false, message: error.message };
  }
}
