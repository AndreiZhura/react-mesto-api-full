import React from 'react';
import { Link } from 'react-router-dom';
import { useState} from 'react';


   

const Register = (props) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState(''); 

  const handleSubmit = (e) => {
    
    e.preventDefault()
    props.handleRegistration(email,password)
  }

  function handleEmail(evt) {
    setEmail(evt.target.value);
  }

  function handlePassword(evt) {
    setPassword(evt.target.value);
  }


  

  return (
    <section className='sectiom-main'>
      <h3 className='section-main__title'>Регистрация</h3>
      <form className='section-main__form' onSubmit={handleSubmit} >
        <input
          className="section-main__input"
          id="email-input"
          required
          placeholder="Email"
          type="email"
          name="email-link"
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
        <button className='section-main__button'>Зарегестрироваться</button>
        <p className='section-main__text'>Уже зарегестрированны?
          <Link to="/sign-in" className='section-main__text-button'>Войти
          </Link></p>
      </form>

    </section>
  );
}

export default Register;