import { ButtonDefault } from "../../components/ButtonDefault/ButtonDefault";
import styles from "./styles.module.sass";
import { useNavigate } from "react-router-dom";
export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>404</h2>
      <p className={styles.text}>На этой странице ничего нет</p>
      <ButtonDefault lable="На главную" action={() => navigate("/")} />
    </section>
  );
};
