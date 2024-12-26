import axios from "axios";

// API'nin temel URL'si
const API_URL = "http://127.0.0.1:8000/api";

// Axios örneği oluşturuyoruz, bu örnek API çağrıları için kullanılacak
const instance = axios.create({
  baseURL: API_URL,
});

// Request Interceptor: Her isteğe Authorization header ekler
instance.interceptors.request.use((config) => {
  // LocalStorage'dan JWT access token'ını alıyoruz
  const token = localStorage.getItem("access_token");

  // Eğer token varsa, Authorization header'ına ekleniyor
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;

// Görevleri Listele: API'den "tasks" endpoint'ini çağırır ve görevleri getirir
export const fetchTasks = async () => {
  const response = await instance.get("/tasks/");
  return response.data; // API'den dönen görevleri geri döndürür
};

// Kullanıcı Girişi: Kullanıcı adı ve şifre ile giriş yapar, token'ları alır ve saklar
export const login = async (username, password) => {
  // Giriş isteği gönderiliyor
  const response = await axios.post(`${API_URL}/token/`, {
    username,
    password,
  });

  // API'den dönen access ve refresh token'larını alıyoruz
  const { access, refresh } = response.data;

  // Token'ları localStorage'a kaydediyoruz
  localStorage.setItem("access_token", access);
  localStorage.setItem("refresh_token", refresh);

  return response.data; // Giriş işleminden dönen yanıtı geri döndürür
};
