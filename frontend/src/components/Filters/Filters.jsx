import { ButtonDefault } from "../ButtonDefault/ButtonDefault";
import styles from "./styles.module.sass";
import { useState } from "react";
// import DatePicker from "react-multi-date-picker";
// import gregorian_ru_lowercase from "./locale";
import resetIcon from "../../assets/icons/reset.png";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "../../store/filterSlice";
import { Dropdown } from "./Dropdown";

export const Filters = () => {
  // let today = new Date
  // const [value, setValue] = useState([today]);
  const [price, setPrice] = useState();
  const [type, setType] = useState("Лофт");
  const [capacity, setCapacity] = useState();
  const [areaSum, setAreaSum] = useState();
  const [areaRent, setAreaRent] = useState();
  const [rating, setRating] = useState();
  const [result, setResult] = useState()
  const dispatch = useDispatch();
  const data = useSelector((state) => state.cards.objects);

  function handleSubmit(e) {
    e.preventDefault();
    let dataMod = data.filter(
      (el) => el.building_status[0]?.stat == "Опубликовано"
    );
    const filteredData = dataMod.filter((item) => {
      return (
        (type ? item.specialization === type : true) &&
        (price ? item.cost > 0 && item.cost <= price : true) &&
        (capacity ? item.capacity > 0 && item.capacity >= capacity : true) &&
        (areaSum ? item.area_sum > 0 && item.area_sum >= areaSum : true) &&
        (areaRent ? item.area_rent > 0 && item.area_rent >= areaRent : true) &&
        (rating ? item.rating > 0 && item.rating >= rating : true)
      );
    });
    if (filteredData.length >= 1) {
      setResult(`Найдено площадок: ${filteredData.length}`)
      dispatch(setFilters(filteredData));
      console.log(filteredData);
    } else setResult('По заданным параметрам ничего не найдено')
  }

  const handleReset = (e) => {
    e.preventDefault();
    setType("Лофт");
    setPrice();
    setAreaRent();
    setCapacity();
    setAreaSum();
    setRating();
    setResult()
    let dataMod = data.filter(
      (el) => el.building_status[0]?.stat == "Опубликовано"
    );
    dispatch(setFilters(dataMod));
  };

  return (
    <section className={styles.section}>
      <form action="" className={styles.form}>
        <div className={styles.wrapper}>
          <Dropdown lable="Вместимость от.." value={capacity && `от ${capacity} человек`}>
            <div className={styles.formGroup}>
              <input
                className="input"
                name="price"
                id="price"
                type="number"
                value={capacity}
                style={{ "min-width": "100%" }}
                onChange={(e) => setCapacity(e.target.value)}
              />
            </div>
          </Dropdown>
          <Dropdown lable="Арендная площадь от.." value={areaRent && `аренда от ${areaRent}м2`}>
            <div className={styles.formGroup}>
              <input
                className="input"
                name="price"
                id="price"
                type="number"
                value={areaRent}
                style={{ "min-width": "100%" }}
                onChange={(e) => setAreaRent(e.target.value)}
              />
             
            </div>
          </Dropdown>
          <Dropdown lable="Общая площадь  от.." value={areaSum && `общая площадь ${areaSum}м2`}>
            <div className={styles.formGroup}>
              <input
                className="input"
                name="price"
                id="price"
                type="number"
                value={areaSum}
                style={{ "min-width": "100%" }}
                onChange={(e) => setAreaSum(e.target.value)}
              />
              <label htmlFor="price" className="form-group__lable">
                {areaSum ? `${areaSum} m2` : ""}
              </label>
            </div>
          </Dropdown>
          <Dropdown lable="Тип площадки" value={type}>
            <div className={styles.formGroup}>
              <select
                name="select"
                onChange={(e) => setType(e.target.value)}
                value={type}
              >
                <option value="Арт">Лофт</option>
                <option value="ПО и компьютерные игры">
                  ПО и компьютерные игры
                </option>
                <option value="Реклама">Реклама</option>
                <option value="Дизайн">Дизайн</option>
                <option value="Мода">Мода</option>
                <option value="Кино и анимация">Кино и анимация</option>
                <option value="Телерадиовещание и медиа">
                  Телерадиовещание и медиа
                </option>
                <option value="Издательское дело">Издательское дело</option>
                <option value="Архитектура">Архитектура</option>
                <option value="Музыка">Музыка</option>
                <option value="Исполнительские искусства">
                  Исполнительские искусства
                </option>
              </select>
            </div>
          </Dropdown>

          <Dropdown lable="Цена до.." value={price  && `цена до ${price} руб`}>
            <div className={styles.formGroup}>
              <input
                className="input"
                name="price"
                id="price"
                type="number"
                value={price}
                style={{ "min-width": "100%" }}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </Dropdown>

          <Dropdown lable="Рейтинг  от.." value={rating &&`Рейтинг от ${rating} баллов`}>
            <div className={styles.formGroup}>
              <input
                className="input"
                name="rating"
                id="rating"
                type="range"
                value={rating}
                min=""
                max="10"
                onChange={(e) => setRating(e.target.value)}
              />

            </div>
          </Dropdown>
        </div>
        <div className={styles.btn}>
          <ButtonDefault lable="ПОИСК" action={(e) => handleSubmit(e)} />
          <button className={styles.reset} onClick={(e) => handleReset(e)}>
            <img
              src={resetIcon}
              alt="сбросить фильтр"
              className={styles.findIcon}
            />
          </button>
        </div>
        <div className={styles.error}>{result}</div>
      </form>
    </section>
  );
};
