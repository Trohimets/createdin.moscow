import { useEffect, useState } from "react";
import requestList from "./requestList.module.sass";
import { apiBooking } from "../../utils/api/bookingApi";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { ButtonDefault } from "../ButtonDefault/ButtonDefault";
export const RequestLandlordList = () => {
  const token = localStorage.getItem("token");
  const id = localStorage.getItem("id"); //16, build 54
  const [booking, setBooking] = useState([]);

  const [cards, setCards] = useState([]);
  const data = useSelector((state) => state.cards.objects);

  useEffect(() => {
    let objects;
    if (data.length) {
      objects = data?.filter((el) => el.owner == id);
    }
    setCards(objects);
  }, [data.length]);

  useEffect(() => {
    if (Array.isArray(cards)) {
      apiBooking.getBookings(token).then((res) => {
        console.log(res);
        const result = cards
          .filter((obj1) => res.some((obj2) => obj1.id === obj2.building))
          .map((obj1) => {
            const obj2 = res.find((obj2) => obj1.id === obj2.building);
            return {
              ...obj1,
              renter: obj2.renter,
              message: obj2.message,
              check_in: obj2.check_in,
              check_out: obj2.check_out,
              reqId: obj2.id,
              status: obj2.status,
              approve: obj2.approve,
            };
          });
        setBooking(result);
      });
    }
  }, [id, cards]);

  console.log(booking);

  const handleConfirm = (el) => {
    let data = {
      building: el.id,
      check_in: el.check_in,
      check_out: el.check_out,
      approve: true,
      status: true,
      id: el.reqId,
    };

    apiBooking.putBookingsConfirm(token, data).then((res) => console.log(res));
  };

  const handleReject = (el) => {
    let data = {
      building: el.id,
      check_in: el.check_in,
      check_out: el.check_out,
      approve: false,
      status: true,
      id: el.reqId,
    };
    apiBooking.putBookingsReject(token, data).then((res) => console.log(res));
  };

  console.log(booking)
  return (
    <section className={requestList.section}>
      <h2 className={requestList.title}>Все заявки</h2>

<div className={requestList.wrapper}>
      {booking.length !== 0 ?booking.map((el, index) => (
        <div
          className={el.approve ? requestList.item : requestList.itemFalse}
          key={index}
        >
          <NavLink to={`/space/${el.id}`} className={requestList.navLink}>
            {el.title}
          </NavLink>
          <p className={requestList.date}>{el.check_in}</p>
          <p className={requestList.message}>{el.message}</p>
          <div className={requestList.btnWrap}>
            {!el.status && (
              <>
                {" "}
                <ButtonDefault
                  lable="Подтвердить"
                  action={() => handleConfirm(el)}
                />
                <ButtonDefault
                  lable="Отклонить"
                  action={() => handleReject(el)}
                />
              </>
            )}

            {el.status && "Заявка обработана"}
            <p className={requestList.oferta}>{el.approve && <NavLink to={`/oferta/${el.id}`}>Ознакомиться с офертой</NavLink>}</p>
          </div>
        </div>
      )) : "Список заявок пуст"}
      </div>
    </section>
  );
};
