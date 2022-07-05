import { useFormik } from 'formik';
import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import * as Yup from 'yup';
import style from '../LoginForm/LoginForm.module.scss';
import clock from '../../assets/clock.svg';

const initValues = {
  username: '',
  email: '',
  password: '',
  repPassword: '',
};

function RegisterForm() {
  const [error, setError] = useState(false);
  const [active, setActive] = useState(true);
  const [register, setRegister] = useState(false);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const newLogin = {
        email: values.email,
        password: values.password,
      };
      const resp = await fetch('https://autumn-delicate-wilderness.glitch.me/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLogin),
      });
      const result = await resp.json();
      console.log(result);
      if (result.changes === 1) {
        setRegister(true);
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
    <>
      {register ? (
        <div className={style.successMessage}>
          <p>Jūsų registracija buvo sėkminga, galite prisijungti čia</p>
          <Link className={style.navLink} to={'/login'}>
            <button>Prisijungti</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <div>
            <p className={style.loginTitle}>Susipažinkime</p>
            <nav>
              <NavLink className={style.navLink} to='/login'>
                Prisijungti
              </NavLink>
              <NavLink
                className={`${style.navLinkReg} ${active ? style.active : ''}`}
                to='/register'
                onClick={() => setActive(false)}
              >
                Registruotis
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
      )}
    </>
  );
}

export default RegisterForm;
