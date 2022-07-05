import React from 'react';
import { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AddPostForm from '../../components/AddPostForm/AddPostForm';
import { AuthContext } from '../../store/AuthContext';
import style from './AddPost.module.scss';

function AddPost() {
  const { logout } = useContext(AuthContext);

  return (
    <div className={style.mainContainer}>
      <nav>
        <NavLink className={style.navLink} to='/'>
          Įrašai
        </NavLink>
        <NavLink className={`${style.navLinkReg} ${style.active}`} to='/addpost'>
          Pridėti įrašą
        </NavLink>
        <button onClick={logout} className={style.btn}>
          Atsijungti
        </button>
      </nav>
      <AddPostForm />
    </div>
  );
}

export default AddPost;
