import { useEffect, useState } from "react";
import requestList from "./requestList.module.sass";
import { apiBooking } from "../../utils/api/bookingApi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
export const RequestList = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id"); //15, build 54
  const [booking, setBooking] = useState([]);

  console.log(booking);
  const obj = useSelector((state) => state.cards.objects);
  useEffect(() => {
    if (Array.isArray(obj)) {
      apiBooking.getBookings(token).then((res) => {
        let renter = res.filter((el) => el.renter == id);
        console.log(id);
        const result = renter
          .filter((obj1) => obj.some((obj2) => obj1.building === obj2.id))
          .map((obj1) => {
            const obj2 = obj.find((obj2) => obj1.building === obj2.id);
            return { ...obj1, title: obj2.title };
          });
        setBooking(result);
      });
    }
  }, [id, obj]);

  console.log(booking)

  return (
    <section className={requestList.section}>
      <h2 className={requestList.title}>Все заявки</h2>

      <div className={requestList.wrapper}>
      {booking.length !== 0 ? booking.map((el, index) => (
          <div
            className={el.approve ? requestList.item : requestList.itemFalse}
            key={index}
          >
            <NavLink
              to={`/space/${el.building}`}
              className={requestList.navLink}
            >
              {el.title}
            </NavLink>
            <p className={requestList.date}>{el.check_in}</p>
            <p className={requestList.status}>
              {!el.status
                ? "Ожидайте ответа"
                : el.approve
                ? "Подтверждено"
                : "Отклонено"}
            </p>
            <p className={requestList.oferta}>{el.approve && <NavLink to={`/oferta/${el.building}`}>Ознакомиться с офертой</NavLink>}</p>
          </div>
        )) : <p className={requestList.result}>Вы еще не оставляли заявок</p>}
      </div>
    </section>
  );
};
