import { useState } from 'react';
import { Login, Register } from '../../components/Auth';
import styles from './styles.module.sass';
import useMediaQuery from '../../utils/hooks/useMediaQuery';

export const AuthPage = () => {
  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle((prevState) => !prevState);
  };

  const isMobile = useMediaQuery('(max-width: 560px)');

  return (
    <section className={styles.section}>
      <div className={styles.buttons}>
        {!isMobile ? (
          <button className={styles.button} onClick={() => setToggle(false)}>
            Регистрация
          </button>
        ) : (
          <button
            className={styles.buttonMobileRegister}
            onClick={() => setToggle(false)}
          />
        )}

        <div onClick={handleClick} className={styles.toggle}>
          <div className={toggle ? styles.knobActive : styles.knob} />
        </div>
        
        {!isMobile ? (
          <button className={styles.button} onClick={() => setToggle(true)}>
            Авторизация
          </button>
        ) : (
          <button
            className={styles.buttonMobileLogin}
            onClick={() => setToggle(true)}
          />
        )}
      </div>

      {toggle ? <Login /> : <Register />}
    </section>
  );
};
