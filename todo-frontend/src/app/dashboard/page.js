"use client";

import { useAuth } from "../../context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Dashboard = () => {
  const { user } = useAuth(); // Kullanıcı durumunu al
  const router = useRouter();

  useEffect(() => {
    console.log(
      "Dashboard sayfası: useEffect çalıştı, kullanıcı durumu:",
      user
    ); // Log ekleme
    if (!user) {
      console.log(
        "Dashboard sayfası: Kullanıcı giriş yapmamış, login sayfasına yönlendiriliyor."
      );
      router.push("/"); // Login sayfasına yönlendir
    }
  }, [user]);

  return (
    <div className="container mt-5">
      <h1 className="text-center">Dashboard</h1>
      {user && <p>Merhaba, {user.username}!</p>}
    </div>
  );
};

export default Dashboard;
