import styles from "./styles.module.sass";
import { useState } from "react";
import { css } from "styled-components";
import { useNavigate } from "react-router-dom";
import { ButtonDefault } from "../ButtonDefault/ButtonDefault";
import { useDispatch } from 'react-redux';
import { setActivePlace } from '../../store/dataSlice';

export const ObjectItem = ({ data }) => {
  const [isHovering, setIsHovering] = useState(false);

  const {building_status, title, id, building_images} = data

  const dispatch = useDispatch()


  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const navigate = useNavigate();

  // Обработчик клика по кнопке Внести изменения в место
  const handleClickEdit = () => {
    dispatch(setActivePlace(data))
    navigate(`/edit/${id}`);
  }

  return (
    <div
      className={styles.objectWrapper}
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <img
        src={building_images && building_images[0]?.image}
        className={styles.img}
        alt={title}
        style={
          // building_status[0]?.stat === "Заблокировано" || "Снято с публикации" || "На модерации" ? { filter: css`grayscale(1)` } : {}
          building_status[0]?.stat === "На модерации" ? { filter: css`grayscale(1)` } : {}
        }
      />
      <p className={styles.infobar}>
        {building_status[0]?.stat == "Заблокировано"  || "Снято с публикации" || "На модерации"
          ? building_status[0]?.stat
          : building_status.stat}
      </p>
      <p className={styles.cardTitle}>{title}</p>
      {isHovering  &&
        (
          <div className={styles.hoverWrapper}>
            {building_status[0]?.stat == "Опубликовано" &&   <ButtonDefault
              lable="К карточке"
              action={() => navigate(`/space/${id}`)}
            /> }
          
            <ButtonDefault
              lable="Внести изменения"
              action={() => alert('не успели доделать')}
            />

          </div>
        )}
    </div>
  );
};
