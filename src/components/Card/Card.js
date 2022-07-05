import style from './Card.module.scss';

function Card({ data }) {
  return (
    <div className={style.card}>
      <div className={style.info}>
        <h3>{data.title}</h3>
        <p>Id: {data.id}</p>
      </div>
      <div className={style.text}>
        <p>{data.description}</p>
      </div>
    </div>
  );
}

export default Card;
