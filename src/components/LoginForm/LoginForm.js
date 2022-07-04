import { useFormik } from 'formik';
import React, { useContext } from 'react';
import { AuthContext } from '../store/AuthContext';
import * as Yup from 'yup';
import style from './LoginForm.module.scss';

const initValues = {
  email: '',
  password: '',
};

function LoginForm() {
  const { login } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      console.log(values);
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
        <label for='email'>Email</label>
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
          <p className={style.padding}></p>
        )}
      </div>
      <div className={style.inputContainer}>
        <label for='password'>Password</label>
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
          <p className={style.padding}></p>
        )}
      </div>
      <button type='submit'>Login</button>
    </form>
  );
}

export default LoginForm;
