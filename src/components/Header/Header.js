import { Link } from 'react-router-dom';
import style from './Header.module.scss';
import img1 from '../../assets/sme_color.svg';

function Header() {
  return (
    <header className={style.main}>
      <div className={style.header}>
        <Link to='/'>
          <img src={img1} alt='' />
        </Link>
      </div>
    </header>
  );
}

export default Header;
