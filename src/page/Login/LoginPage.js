import React from 'react';
import LoginForm from '../../components/LoginForm/LoginForm';
import style from './LoginPage.module.scss';

function LoginPage() {
  return (
    <div className={style.login}>
      <div className='container'>
        <LoginForm />
      </div>
    </div>
  );
}

export default LoginPage;
