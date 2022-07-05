import { useFormik } from 'formik';
import { useContext } from 'react';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import { AuthContext } from '../../store/AuthContext';
import style from '../LoginForm/LoginForm.module.scss';
import clock from '../../assets/clock.svg';

const initValues = {
  username: '',
  email: '',
  password: '',
  repPassword: '',
};

function RegisterForm() {
  const { login } = useContext(AuthContext);
  const history = useHistory();
  const [error, setError] = useState(false);
  const [active, setActive] = useState(true);

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
      email: Yup.string().required('Šis laukas negali būti tuščias').email('Turi būti validus el. paštas'),
      password: Yup.string()
        .required('Šis laukas negali būti tuščias')
        .min(4, 'Slaptažodis turėtų būti ne mažiau 5 skaitmenų')
        .max(10, 'Slaptažodis turėtų būti ne daugiau 10 skaitmenų'),
      repPassword: Yup.string()
        .required('Šis laukas negali būti tuščias')
        .oneOf([Yup.ref('password'), null], 'Slaptažodžiai turi sutapti'),
    }),
  });

  return (
    <form onSubmit={formik.handleSubmit} className={style.form}>
      <div>
        <p className={style.loginTitle}>Susipažinkime</p>
        <nav>
          <NavLink className={style.navLink} to='/login'>
            Login
          </NavLink>
          <NavLink
            className={`${style.navLinkReg} ${active ? style.active : ''}`}
            to='/register'
            onClick={() => setActive(false)}
          >
            Register
          </NavLink>
        </nav>
        <div className={style.inputContainer}>
          <input
            className={formik.touched.email && formik.errors.email ? `${style.errorInput}` : ''}
            type='text'
            placeholder='El. Paštas (pvz Jonas@gmail.com)'
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
          <input
            className={formik.touched.password && formik.errors.password ? `${style.errorInput}` : ''}
            name='password'
            type='password'
            placeholder='Jūsų slaptažodis'
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
          <input
            className={formik.touched.repPassword && formik.errors.repPassword && `${style.errorInput}`}
            type='password'
            name='repPassword'
            placeholder='Pakartoti slaptažodį'
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
        <button type='submit'>Registruotis</button>
      </div>
      <div>
        <div className={style.message}>
          <p>Prašome prisiregistruoti įrašant el. paštą, slaptažodį, bei jį pakartoti</p>
        </div>
        <img className={style.clock} src={clock} alt='clock' />
      </div>
    </form>
  );
}

export default RegisterForm;
