import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';

import style from './Header.module.scss';
import img1 from '../../assets/logo.png';
import { AuthContext } from '../../store/AuthContext';

function Header() {
  const { isUserLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className={style.main}>
      <div className={style.header}>
        <Link className={style.navLink} to='/'>
          <img src={img1} alt='' />
        </Link>
        <nav>
          {isUserLoggedIn ? (
            <>
              <NavLink className={style.navLink} to='/'>
                Posts
              </NavLink>
              <NavLink className={style.navLink} to='/login' onClick={logout}>
                Logout
              </NavLink>
            </>
          ) : (
            ''
          )}
          {!isUserLoggedIn ? (
            <>
              <NavLink className={style.navLink} to='/register'>
                Register
              </NavLink>
              <NavLink className={style.navLink} to='/login'>
                Login
              </NavLink>
            </>
          ) : (
            ''
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
