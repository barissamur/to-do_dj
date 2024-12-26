"use client";

import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Kullanıcı durumunu tutar

  // Giriş yapıldığında kullanıcı durumunu ayarla
  const login = (userData) => {
    console.log("Login çağrıldı, userData:", userData); // Kullanıcı verisi
    setUser(userData); // Kullanıcı durumunu güncelle
    console.log("setUser çalıştı, user:", userData); // setUser sonrası kullanıcı
    localStorage.setItem("user", JSON.stringify(userData)); // Kullanıcıyı localStorage'a kaydet
    console.log(
      "localStorage güncellendi, user:",
      localStorage.getItem("user")
    ); // localStorage kontrolü
  };

  // Çıkış yapıldığında kullanıcı durumunu temizle
  const logout = () => {
    console.log("logout fonksiyonu çalıştı"); // Log ekleme
    setUser(null); // Kullanıcı durumunu temizle
    localStorage.removeItem("user");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

  // Sayfa yenilendiğinde kullanıcı durumunu yükle
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    console.log("useEffect çalıştı, localStorage'daki kullanıcı:", storedUser); // Log
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      console.log("Kullanıcı JSON parse sonrası:", parsedUser); // Log
      setUser(parsedUser); // Kullanıcı durumunu ayarla
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
