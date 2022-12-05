import React from "react";
import { useState } from "react";



const Login = (props) => {

 

  const [email, setUserEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleLogin(email,password)
  }

  function handleEmail(evt) {
    setUserEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }



  return (
    <section className="sectiom-main">
      <h3 className="section-main__title">Вход</h3>
      <form className="section-main__form" onSubmit={handleSubmit}>
        <input
          className="section-main__input"
          id="email-input"
          required
          placeholder="Email"
          type="email"
          name="email- link"
          value={email}
          onChange={handleEmail}
        />
        <input
          className="section-main__input"
          id="password-input"
          required
          placeholder="Пароль"
          type="password"
          name="password-link"
          value={password}
          onChange={handlePassword}
        />
        <button className="section-main__button">Войти</button>
      </form>
    </section>
  );
};

export default Login;
