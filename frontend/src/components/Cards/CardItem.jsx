import { useNavigate } from 'react-router-dom'
import { ButtonDefault } from '../ButtonDefault/ButtonDefault'
import styles from './styles.module.sass'
import { useState } from "react";
import { css } from "styled-components";
export const CardItem = ({data}) => {

    const {title, desc, id, building_images} = data

    const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };


    const navigate = useNavigate()

    return (
        <li className={styles.cardItem}
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        >
            <h2 className={styles.cardItem__title}>{title}</h2>

        <div className={styles.imgWrapper}>
            <img src={building_images[0].image} alt="" className={styles.img}/>
            </div>
   
            
            {isHovering  &&
        (
          <div className={styles.hoverWrapper}>
         
         <p className={styles.description}>{desc}</p>
          <ButtonDefault lable='Подробнее' action={() => navigate(`space/${id}`)}/>

          </div>
        )}
           
        </li>
    )
} 