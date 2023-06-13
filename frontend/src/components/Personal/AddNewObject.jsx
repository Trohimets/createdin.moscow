import { ButtonDefault } from '../ButtonDefault/ButtonDefault';
import styles from './styles.module.sass';
import { useNavigate } from 'react-router-dom';

export const AddNewObject = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.section}>
      <ButtonDefault
        lable="Добавить новую площадку"
        action={() => {
          navigate('/new');
        }}
      />
    </div>
  );
};
