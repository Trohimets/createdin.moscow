import { useEffect, useRef, useState } from "react";
import { CardItem } from "./CardItem";
import styles from "./styles.module.sass";
// import { data } from "../../TEMP_DATA/DATA";
import { useSelector } from "react-redux";

export const CardsList = () => {
  const data = useSelector((state) => state.cards.objects);
  const [state, setState] = useState(6);

  const handleScroll = () => {
    let scrollTop = document.documentElement.scrollTop,
      windowHeight = window.innerHeight,
      height = document.body.scrollHeight - windowHeight,
      scrollPercentage = scrollTop / height;
    if (scrollPercentage > 0.6) {
      setState(state + 3);
      document.removeEventListener("scroll", handleScroll);
    }
  };

  useEffect(() => {
    document.addEventListener("scroll", handleScroll);
    return () => {
      document.removeEventListener("scroll", handleScroll);
    };
  }, [state]);

  let disp;
  const items = data.length && data?.slice(0, state);
  if (items) {
    disp = items.map((el, index) => {
      if(el.building_status[0]?.stat == "Опубликовано")
      return <CardItem data={el} key={index} />;
    });
  }

  return (
    <section className={styles.cardsList}>
      <h2 className={styles.cardsListTitle}> Все площадки</h2>

      <ul className={styles.listWrapper}>
        {disp}
      </ul>
    </section>
  );
};
