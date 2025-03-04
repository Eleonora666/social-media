import "./auth.scss";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import { useForm } from "react-hook-form"; 

const HackerAuth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate(); 

  // Хук для регистрации (добавляем watch для проверки совпадения паролей)
  const {
    handleSubmit: handleSubmitRegister,
    register: registerRegister,
    formState: { errors: errorsRegister },
    watch,
  } = useForm();

  // Хук для входа
  const {
    handleSubmit: handleSubmitLogin,
    register: registerLogin,
    formState: { errors: errorsLogin },
  } = useForm();

  // Регистрация
  const handleRegister = async (data) => {
    console.log("Регистрация, данные формы:", data);

    const payload = {
      username: data.username,
      password: data.password,
      confirm_password: data.confirm_password,
    };

    try {
      const response = await fetch('http://49.13.31.246:9191/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (response.ok) {
        alert('Регистрация прошла успешно! Теперь войдите.');
        setIsLogin(true); 
      } else {
        console.error("Ответ сервера:", result);
        alert(result.message || 'Ошибка регистрации');
      }
    } catch (error) {
      console.error('Ошибка регистрации:', error);
      alert('Ошибка сети');
    }
  };

  // Вход
  const handleLogin = async (data) => {
    console.log("Вход, данные формы:", data);
    try {
      const response = await fetch('http://49.13.31.246:9191/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        localStorage.setItem('token', result.token); // Сохраняем токен
        alert('Вход выполнен успешно!');
        navigate('/profile'); // Переход на страницу профиля
      } else {
        console.error("Ответ сервера:", result);
        alert(result.message || 'Ошибка входа');
      }
    } catch (error) {
      console.error('Ошибка входа:', error);
      alert('Ошибка сети');
    }
  };

  return (
    <section>
      {[...Array(200)].map((_, i) => (
        <span key={i}></span>
      ))}
      <div className="signin">
        <div className="content">
          <h2>{isLogin ? "Sign In" : "Sign Up"}</h2>
          <form
            className="form"
            onSubmit={isLogin ? handleSubmitLogin(handleLogin) : handleSubmitRegister(handleRegister)}
          >
            <div className="inputBox">
              <input
                type="text"
                {...(isLogin ? registerLogin : registerRegister)("username", { required: true })}
                required
              />
              <label>Username</label>
              {(isLogin ? errorsLogin : errorsRegister).username && (
                <span>This field is required</span>
              )}
            </div>
            <div className="inputBox">
              <input
                type="password"
                {...(isLogin ? registerLogin : registerRegister)("password", { required: true })}
                required
              />
              <label>Password</label>
              {(isLogin ? errorsLogin : errorsRegister).password && (
                <span>This field is required</span>
              )}
            </div>
            {!isLogin && (
              <div className="inputBox">
                <input
                  type="password"
                  {...registerRegister("confirm_password", { required: true })}
                  required
                />
                <label>Confirm Password</label>
                {errorsRegister.confirm_password && (
                  <span>This field is required</span>
                )}
              </div>
            )}
            <div className="links">
              <a href="#" onClick={() => setIsLogin(!isLogin)}>
                {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
              </a>
            </div>
            <div className="inputBox">
              <input type="submit" value={isLogin ? "Login" : "Sign Up"} />
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default HackerAuth;
