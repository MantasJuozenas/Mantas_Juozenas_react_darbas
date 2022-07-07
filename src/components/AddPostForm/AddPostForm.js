import { useFormik } from 'formik';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import style from '../AddPostForm/AddPostForm.module.scss';
import clock from '../../assets/clock.svg';
import { useContext } from 'react';
import { AuthContext } from '../../store/AuthContext';

const initValues = {
  title: '',
  description: '',
};

function AddPostForm() {
  const [error, setError] = useState(false);
  const [created, setCreated] = useState(false);
  const { token } = useContext(AuthContext);

  const formik = useFormik({
    initialValues: initValues,
    onSubmit: async (values) => {
      const newPost = {
        title: values.title,
        description: values.description,
      };
      const resp = await fetch('https://autumn-delicate-wilderness.glitch.me/v1/content/skills', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newPost),
      });
      const result = await resp.json();
      if (result.msg) {
        setCreated(true);
      }
      setError(result.err);
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Šis laukas negali būti tuščias')
        .min(5, 'Antraštė turėtų būti ne mažiau 5 skaitmenų'),
      description: Yup.string()
        .required('Šis laukas negali būti tuščias')
        .min(20, 'Tekstas turėtų būti ne mažiau 20 skaitmenų'),
    }),
  });

  return (
    <>
      {created ? (
        <div className={style.successMessage}>
          <p>Jūsų įrašas sėkmingai sukurtas!</p>
          <Link className={style.navLink} to={'/'}>
            <button className={style.btn}>Grįžti į įrašus</button>
          </Link>
        </div>
      ) : (
        <form onSubmit={formik.handleSubmit} className={style.form}>
          <div>
            <p className={style.loginTitle}>Čia galite pridėti įrašą</p>

            <div className={style.inputContainer}>
              <input
                className={formik.touched.title && formik.errors.title ? `${style.errorInput}` : ''}
                type='text'
                placeholder='Antraštė (pvz: Pasaka)'
                name='title'
                onChange={formik.handleChange}
                value={formik.values.title}
                onBlur={formik.handleBlur}
              />
              {formik.touched.title && formik.errors.title ? (
                <p className={style.errorMsg}>{formik.errors.title}</p>
              ) : (
                <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
              )}
            </div>
            <div className={style.inputContainer}>
              <textarea
                className={formik.touched.description && formik.errors.description ? `${style.errorInput}` : ''}
                name='description'
                type='text'
                placeholder='Jūsų įrašo tekstas'
                onChange={formik.handleChange}
                value={formik.values.description}
                onBlur={formik.handleBlur}
              ></textarea>
              {formik.touched.description && formik.errors.description ? (
                <p className={style.errorMsg}>{formik.errors.description}</p>
              ) : (
                <p className={`${style.padding} ${style.errorMsg}`}>{error ? error : ''}</p>
              )}
            </div>
            <button type='submit'>Pridėti įrašą</button>
          </div>
          <div>
            <div className={style.message}>
              <p>Galite pridėti įrašą įrašant antraštę bei tekstą</p>
            </div>
            <img className={style.clock} src={clock} alt='clock' />
          </div>
        </form>
      )}
    </>
  );
}

export default AddPostForm;
