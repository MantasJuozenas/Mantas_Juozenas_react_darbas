import style from './Footer.module.scss';

function Footer() {
  return (
    <footer className={style.footer}>
      <p>&#9400; {new Date().getFullYear()} Mantas Juozenas. All rights reserved</p>
    </footer>
  );
}

export default Footer;
