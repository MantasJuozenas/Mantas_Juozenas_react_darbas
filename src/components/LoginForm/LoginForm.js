import { useFormik } from 'formik';
import React, { useContext, useState } from 'react';

import * as Yup from 'yup';
import style from './LoginForm.module.scss';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../store/AuthContext';

const initValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const newLogin = {
        email: values.email,
        password: values.password,
      };
      const resp = await fetch('https://autumn-delicate-wilderness.glitch.me/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLogin),
      });
      const result = await resp.json();
      if (result.token) {
        login(result.token);
        history.push('/');
      }
      setError(result.err);
    },
    validationSchema: Yup.object({
      email: Yup.string().required('This field is required').email('Not a valid email'),
      password: Yup.string()
        .required('This field is required')
        .min(4, 'password should be at least 5 characters long')
        .max(10, 'Password should be 10 characters of less'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>
      <div className={style.inputContainer}>
        <label htmlFor='email'>Email</label>
        <input
          className={formik.touched.email && formik.errors.email ? `${style.errorInput}` : ''}
          type='text'
          placeholder='Your email'
          name='email'
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
        />
        {formik.touched.email && formik.errors.email ? (
          <p className={style.errorMsg}>{formik.errors.email}</p>
        ) : (
          <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
        )}
      </div>
      <div className={style.inputContainer}>
        <label htmlFor='password'>Password</label>
        <input
          className={formik.touched.password && formik.errors.password ? `${style.errorInput}` : ''}
          name='password'
          type='password'
          placeholder='Your password'
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
        />
        {formik.touched.password && formik.errors.password ? (
          <p className={style.errorMsg}>{formik.errors.password}</p>
        ) : (
          <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
        )}
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;
