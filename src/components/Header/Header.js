import { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { AuthContext } from '../store/AuthContext';
import style from './Header.module.scss';

function Header() {
  const { isUserLoggedIn, logout } = useContext(AuthContext);

  return (
    <header className={style.main}>
      <div className={style.header}>
        <Link className={style.navLink} to='/'>
          <img src='http://assets.stickpng.com/thumbs/584817d6cef1014c0b5e4999.png' alt='' />
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
