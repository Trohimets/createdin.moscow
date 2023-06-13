import { useParams } from "react-router-dom";
// import { data } from "../../TEMP_DATA/DATA";
import styles from "./styles.module.sass";
import { useEffect, useState } from "react";

import adress from "../../assets/icons/adress.png";
import people from "../../assets/icons/people.png";
import email from "../../assets/icons/email.png";
import ruble from "../../assets/icons/ruble.png";
import phone from "../../assets/icons/phone.png";
import site from "../../assets/icons/site.png";
import ratingIcon from "../../assets/icons/rating.png";
import square from "../../assets/icons/square.png";
import { Calendar } from "../../components/Calendar/Calendar";
import { YandexMapSpace } from "../../components/Ymap/YandexMapSpace";
import { useDispatch, useSelector } from "react-redux";
import { Feedback } from "../../components/Feedbacks/Feedback/Feedback";
import { Helmet } from "react-helmet-async";
import { ButtonBack } from "../../components/ButtonDefault/ButtonBack";
import { ModalReq } from "../../components/Modal/ModalReq";
import { openModalReq, openModal } from "../../store/modalSlice";
import { apiBooking } from "../../utils/api/bookingApi";
import { requestSendedSuccess } from "../../utils/modalPayload";
import { requestSendedError } from "../../utils/modalPayload";

export const SpacePage = () => {
  const { id } = useParams();
  const [card, setCard] = useState([]);
  const [rating, setRating] = useState(null);
  const [comments, setComments] = useState([]);
  const [booking, setBooking] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const data = useSelector((state) => state.cards.objects);
  const dataComments = useSelector((state) => state.cards.comments);
  const bookingData = useSelector((state) => state.cards.booking);
  // console.log(bookingData)

  const [dateReq, setDateReq] = useState("");
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (data.length && dataComments) {
      let itemData = data.find((el) => el.id == id);
      setCard(itemData);
      let intg = Math.floor(itemData.rating);
      setRating(intg);
      let commentsData = dataComments.filter((el) => el.building == id);
      setComments(commentsData);
      let bookingDate = bookingData.filter((el) => el.building == id);
      const checkInArray = bookingDate.map((booking) => booking.check_in);
      setBooking(checkInArray);
    }
  }, [data]);

  let locationArray = card.coordinates
    ? card.coordinates.split(",").map(Number)
    : [];
  const token = localStorage.getItem("token");
  const handlePostReq = (date) => {
    dispatch(openModalReq());
  };
  const handleSendReq = () => {
    const date = new Date(dateReq);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    const formattedDate = `${year}-${month}-${day}`;
    let obj = {
      building: id,
      check_in: formattedDate,
      check_out: formattedDate,
      message: message,
      approve: false,
    };
    apiBooking
      .postBooking(obj, token)
      .then((res) => dispatch(openModal(requestSendedSuccess)))
      .catch((err) => dispatch(openModal(requestSendedError)));
  };
  // console.log(booking)

  return (
    <section className={styles.section}>
      <Helmet>
        <title>{card.title}</title>
        <meta name="description" content={card.desc} />
        <meta name="theme-color" content="#008f68" />
      </Helmet>
      <ButtonBack />
      <h2 className={styles.title}>{card.title}</h2>
      <div className={styles.infobar}>
        <div className={styles.iconWrapper}>
          <div className={styles.iconValueWrap}>
            <p className={styles.iconValue}>{card.capacity}</p>
          </div>
          <p className={styles.iconText}>Вместимость человек</p>
        </div>

        <div className={styles.iconWrapper}>
          <div className={styles.iconValueWrap}>
            <p className={styles.iconValue}>{card.area_rent}</p>
          </div>
          <p className={styles.iconText}>Доступно для аренды м2</p>
        </div>

        <div className={styles.iconWrapper}>
          <div className={styles.iconValueWrap}>
            <p className={styles.iconValue}>{card.area_sum}</p>
          </div>
          <p className={styles.iconText}>Всего м2</p>
        </div>

        <div className={styles.iconWrapper}>
        <div className={styles.iconValueWrap}>
            <p className={styles.iconValue}>{rating ? rating : "Не задан"}</p>
          </div>
          <p className={styles.iconText}>Рейтинг</p>
        </div>

        <div className={styles.iconWrapper}>
        <div className={styles.iconValueWrap}>
        <a className={styles.iconText} href={card.site} target="_blank">
            Кликни
          </a> 
          </div>
          <p className={styles.iconText}>Сайт</p>
        </div>

        <div className={styles.iconWrapper}>
        <div className={styles.iconValueWrap}>
            <p className={styles.iconValue}>{card.cost} &#8381;</p>
          </div>
          <p className={styles.iconText}>Цена за день</p>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.leftSide}>
          {!localStorage.getItem("logIn") ? (
            <p className={styles.contactsPlug}>
              Контакты доступны только авторизованным пользователям
            </p>
          ) : (
            <div className={styles.contacts}>
              <h3 className={styles.contactsTitle}>Контактная информация</h3>
              <div className={styles.contactsWrapper}>
                <div className={styles.iconWrapper}>
                  <img src={phone} alt="" className={styles.iconImg} />
                  <a className={styles.iconText} href={`tel:${card.phone}`}>
                    {card.phone}
                  </a>
                </div>

                <div className={styles.iconWrapper}>
                  <img src={adress} alt="" className={styles.iconImg} />
                  <p className={styles.iconText}>{card.address}</p>
                </div>

                <div className={styles.iconWrapper}>
                  <img src={email} alt="" className={styles.iconImg} />
                  <a className={styles.iconText} href={`mailto:${card.email}`}>
                    {card.email}
                  </a>
                </div>
              </div>
            </div>
          )}

          <p className={styles.description}>{card.desc}</p>

          <div className={styles.calendarWrapper}>
            <p className={styles.cta}>Выберите дату и оставьте заявку</p>
            {card.coordinates && (
              <Calendar
                data={booking}
                currentMonth={currentMonth}
                onChangeMonth={setCurrentMonth}
                handlePostReq={handlePostReq}
                setDateReq={setDateReq}
                message={message}
                id={id}
              />
            )}
          </div>
        </div>

        <div className={styles.grid}>
          {locationArray.length && <YandexMapSpace data={locationArray} />}
          {card.building_images?.map((el, index) => (
            <div className={styles.imgWrapper} key={index}>
              <img src={el.image} alt="" className={styles.img} />
            </div>
          ))}
        </div>
      </div>

      <Feedback comments={comments} />
      <ModalReq
        setMessage={setMessage}
        dateReq={dateReq}
        handleSendReq={handleSendReq}
      />
    </section>
  );
};
