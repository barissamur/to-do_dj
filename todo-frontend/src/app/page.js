"use client";

import { useAuth } from "../context/AuthContext";
import LoginForm from "../components/LoginForm";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const { user, login } = useAuth(); // Kullanıcı durumunu ve login fonksiyonunu al
  const router = useRouter();

  useEffect(() => {
    console.log("Login sayfası: useEffect çalıştı, kullanıcı durumu:", user); // Log ekleme
    if (user) {
      console.log(
        "Login sayfası: Kullanıcı giriş yapmış, Dashboard'a yönlendirme yapılıyor."
      );
      router.push("/dashboard"); // Dashboard'a yönlendir
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">To-Do App</h1>
      {!user ? (
        <LoginForm onLogin={login} /> // Login formu, giriş yapıldığında kullanıcıyı günceller
      ) : (
        <p>Yönlendiriliyorsunuz...</p>
      )}
    </div>
  );
}
