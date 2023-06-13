import styles from './styles.module.sass';

export const ButtonDefault = ({
  lable = 'text',
  action,
  disabled = false,
  width = '',
  img = {},
  isMobile = false,
}) => {

  if (!isMobile) {
    return (
      <button
        className={disabled ? styles.disabled : styles.button}
        onClick={action}
        disabled={disabled}
        style={{ width: width }}
      >
        {lable}
      </button>
    );
  } else
    return (
      <div className={styles.btnWrap}>
        <button
          className={styles.mobileButton}
          onClick={action}
          disabled={disabled}
          style={{
            width: width,
            background: `url(${img}) no-repeat`,
            backgroundSize: 'contain',
            backgroundPosition: 'center'
          }}
        ></button>
        {/* <p className={styles.btnText}>{lable}</p> */}
      </div>
    );
};
