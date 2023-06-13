import { ButtonDefault } from './ButtonDefault';
import styles from './styles.module.sass';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '../../utils/hooks/useMediaQuery';
import iconBack from '../../assets/icons/arrow-left.svg';

export const ButtonBack = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 600px)');

  return (
    <div className={styles.buttonBackWrapper}>
      <ButtonDefault
        action={() => navigate(-1)}
        lable="Назад"
        isMobile={isMobile}
        img={iconBack}
        width={isMobile ? '30px' : ''}
      />
    </div>
  );
};
