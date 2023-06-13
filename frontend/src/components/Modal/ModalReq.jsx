import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.sass";
import { ButtonDefault } from "../ButtonDefault/ButtonDefault";
import { closeModal } from "../../store/modalSlice";

import { useEffect } from "react";

export const ModalReq = ({ setMessage, dateReq, handleSendReq }) => {
  const { modalReqIsOpened } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeModal());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleClose);
  }, []);

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  const date = new Date(dateReq);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const year = date.getFullYear().toString();
  const formattedDate = `${day}-${month}-${year}`;

  const handlePost = () => {
    handleSendReq();
    handleClose();
  };

  if (modalReqIsOpened) {
    return (
      <div
        className={styles.modal}
        onClick={(e) => {
          handleClose(e);
        }}
      >
        <div
          className={styles.modalContent}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <h2>Вы можете добавить текст к вашей заявке</h2>
          <p>{`Выбранная дата: ${formattedDate}`}</p>

          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            onChange={(e) => handleMessage(e)}
          ></textarea>
          <div className={styles.btnWrap}>
            <ButtonDefault lable="Закрыть" action={() => handleClose()} />
            <ButtonDefault
              lable="Отправить заявку"
              action={() => handlePost()}
            />
          </div>
        </div>
      </div>
    );
  }
};
