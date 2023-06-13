import { PersonalForm } from "./FormLandlord";
import styles from "./styles.module.sass";

export const PersonalRenter = () => {
  return (
    <div className={styles.element}>
      <PersonalForm />
      <section className={styles.section}>Список отправленных заявок</section>
    </div>
  );
};
