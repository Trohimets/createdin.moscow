import { useDispatch, useSelector } from "react-redux";
import styles from "./styles.module.sass";
import { ButtonDefault } from "../ButtonDefault/ButtonDefault";
import { closeModal } from "../../store/modalSlice";
import error from "../../assets/images/error.png";
import success from "../../assets/images/success.png";
import { useEffect } from "react";

export const Modal = () => {
  const { status, title, modalIsOpened } = useSelector((state) => state.modal);
  const dispatch = useDispatch();
  const handleClose = () => {

    dispatch(closeModal());
  };

  useEffect(() => {
    window.addEventListener("scroll", handleClose);
  }, []);

  if (modalIsOpened) {
    return (
      <div
        className={styles.modal}
        onClick={(e) => {
          handleClose(e);
        }}
      >
        <div className={styles.modalContent}
        onClick={(e) => {
            e.stopPropagation();
          }}>
          <img src={status ? success : error} className={styles.img} />
          <h2 className={styles.title}>{title}</h2>
          <ButtonDefault lable="Закрыть" action={() => handleClose()} />
        </div>
      </div>
    );
  }

};
