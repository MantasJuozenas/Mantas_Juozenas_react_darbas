import style from './CardList.module.scss';

function CardList(props) {
  return <div className={style.grid}>{props.children}</div>;
}

export default CardList;
