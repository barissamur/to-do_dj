"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Next.js yönlendirme için useRouter
import { useAuth } from "../context/AuthContext"; // AuthContext'i import edin
import axios from "../services/axiosConfig"; // Global yapılandırılmış Axios'u import edin

const LoginForm = () => {
  const [username, setUsername] = useState(""); // Kullanıcı adı durumu
  const [password, setPassword] = useState(""); // Şifre durumu
  const [error, setError] = useState(null); // Hata mesajlarını saklamak için durum

  const { login } = useAuth(); // AuthContext'teki login fonksiyonunu alın
  const router = useRouter(); // Yönlendirme için Next.js useRouter kullanılıyor

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Kullanıcı giriş bilgilerini backend'e göndererek token'ları al
      const response = await axios.post("/token/", { username, password });
      const { access, refresh } = response.data; // Backend'den gelen token'ları al

      // Token'ları localStorage'a kaydet
      localStorage.setItem("access_token", access);
      localStorage.setItem("refresh_token", refresh);

      // AuthContext içindeki login fonksiyonunu çağırarak kullanıcı durumunu güncelle
      const userData = { username }; // Kullanıcı bilgilerini oluştur
      login(userData); // AuthContext'e kullanıcıyı ayarla

      console.log("Giriş başarılı!"); // Girişin başarılı olduğunu konsola yaz
      router.push("/dashboard"); // Kullanıcıyı Dashboard sayfasına yönlendir
    } catch (err) {
      console.error("Giriş hatası:", err.response?.data || err.message); // Hata detaylarını konsola yaz
      setError("Giriş başarısız! Lütfen bilgilerinizi kontrol edin."); // Kullanıcıya hata mesajı göster
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4">
      <div className="mb-3">
        <label htmlFor="username" className="form-label">
          Kullanıcı Adı
        </label>
        <input
          type="text"
          id="username"
          className="form-control"
          value={username}
          onChange={(e) => setUsername(e.target.value)} // Kullanıcı adını güncelle
          required // Boş bırakmayı engelle
        />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">
          Şifre
        </label>
        <input
          type="password"
          id="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)} // Şifreyi güncelle
          required // Boş bırakmayı engelle
        />
      </div>
      {/* Eğer hata varsa hata mesajını göster */}
      {error && <div className="alert alert-danger">{error}</div>}
      <button type="submit" className="btn btn-primary">
        Giriş Yap
      </button>
    </form>
  );
};

export default LoginForm;
