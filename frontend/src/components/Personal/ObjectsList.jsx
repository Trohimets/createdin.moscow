import styles from './styles.module.sass';
// import { data } from "../../TEMP_DATA/DATA";
import { useEffect, useState } from 'react';
import { ObjectItem } from './ObjectItem';
import { useSelector } from 'react-redux';

export const ObjectsList = () => {
  const id = localStorage.getItem('id');
  const [cards, setCards] = useState([]);
  const data = useSelector((state) => state.cards.objects);

  useEffect(() => {
    let objects;
    if (data.length) {
      objects = data?.filter((el) => el.owner == id);
    }

    setCards(objects);
  }, [data.length]);

  return (
    <>
      {cards?.length >= 1 ? (
        <ul className={styles.listGrid}>
          {cards.map((el, index) => (
            <li key={index}>
              <ObjectItem data={el} key={index} />
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.emptyObjects}>Нет добавленных объектов</div>
      )}
    </>
  );
};
