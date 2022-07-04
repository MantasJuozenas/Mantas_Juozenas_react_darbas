import { useFormik } from 'formik';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import style from '../LoginForm/LoginForm.module.scss';

const initValues = {
  username: '',
  email: '',
  password: '',
  repPassword: '',
};

function RegisterForm() {
  const [registered, setRegistered] = useState(false);
  const [error, setError] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      console.log(values);
      const newUser = {
        email: values.email,
        password: values.password,
      };
      const resp = await fetch('https://autumn-delicate-wilderness.glitch.me/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newUser),
      });
      const result = await resp.json();
      console.log(result);
      if (result.changes === 1) {
        setRegistered(true);
      }
      setError(result.err);
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .required('This field is required')
        .min(4, 'Username should be at least 4 characters long')
        .max(10, 'Username should be not longer than 10 characters'),
      email: Yup.string().required('This field is required').email('Should be valid email address'),
      password: Yup.string().required('This field is required').min(5, 'Password should be at least 5 characters long'),
      repPassword: Yup.string()
        .required('This field is required')
        .oneOf([Yup.ref('password'), null], 'Passwords must match'),
    }),
  });

  return (
    <div>
      {registered ? (
        <div className={style.onSuccess}>
          Registered successfully, you can proceed to <NavLink to='/login'>Log in</NavLink>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={`${style.form} ${style.mgtop}`}>
          <div className={style.inputContainer}>
            <label htmlFor='username'>Username</label>
            <input
              className={formik.touched.username && formik.errors.username && `${style.errorInput}`}
              type='text'
              name='username'
              placeholder='Username'
              onChange={formik.handleChange}
              value={formik.values.username}
              onBlur={formik.handleBlur}
            />
            {formik.touched.username && formik.errors.username ? (
              <p className={style.errorMsg}>{formik.errors.username}</p>
            ) : (
              <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
            )}
          </div>
          <div className={style.inputContainer}>
            <label htmlFor='email'>Email</label>
            <input
              className={formik.touched.email && formik.errors.email && `${style.errorInput}`}
              type='text'
              name='email'
              placeholder='Email'
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
              className={formik.touched.password && formik.errors.password && `${style.errorInput}`}
              type='password'
              name='password'
              placeholder='Password'
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
          <div className={style.inputContainer}>
            <label htmlFor='repPassword'>Repeat Password</label>
            <input
              className={formik.touched.repPassword && formik.errors.repPassword && `${style.errorInput}`}
              type='password'
              name='repPassword'
              placeholder='Repeat password'
              onChange={formik.handleChange}
              value={formik.values.repPassword}
              onBlur={formik.handleBlur}
            />
            {formik.touched.repPassword && formik.errors.repPassword ? (
              <p className={style.errorMsg}>{formik.errors.repPassword}</p>
            ) : (
              <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
            )}
          </div>
          <button type='submit'>Register</button>
        </form>
      )}
    </div>
  );
}

export default RegisterForm;
