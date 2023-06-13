import { useEffect, useState } from 'react';
import styles from './styles.module.sass';
import { useForm } from 'react-hook-form';
import { ButtonDefault } from '../ButtonDefault/ButtonDefault';
import { useSelector } from 'react-redux';
import { apiProfiles } from '../../utils/api/profileApi';
import {
  phoneRegExp,
  numbersRegExp,
  nameRegExp,
  emailRegExp,
} from '../../utils/regExp';

export const FormLandlord = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [landlordData, setLandlordData] = useState({
    inn: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    phone_number: '',
    contact_email: '',
    organization_name: '',
    adress: '',
  });
  // const data = useSelector((state) => state.user.state);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    mode: 'all',
  });

  const user = useSelector((state) => state.user.user);

  const [radioBtns, setRadioBtns] = useState({ ooo: true, ip: false });
  const [radioValue, setRadioValue] = useState('ORGANIZATION');

  const handleChange = (e) => {
    const value = e.target.value;
    setRadioValue(value);
    if (value === 'IP') {
      setRadioBtns({
        ooo: false,
        ip: true,
      });
    } else {
      setRadioBtns({
        ooo: true,
        ip: false,
      });
    }
  };

  useEffect(() => {
    if (user.id) {
      apiProfiles
        .getProfileDataLandlord(user.id)
        .then((res) => {
          setLandlordData({ ...res[0], contact_email: user.email });
        })
        .catch((err) => console.log(err));
    }
  }, [user]);

  const onSubmit = (data) => {
    const dataToSend = { ...data, organization_type: radioValue };
    apiProfiles
      .updateProfileDataLandlord(dataToSend)
      .then(() => setIsDisabled(true))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    for (let key in landlordData) {
      if (key) {
        setValue(key, landlordData[key]);
      }
    }

    if (landlordData.organization_type === 'IP') {
      setRadioBtns({
        ooo: false,
        ip: true,
      });
    } else {
      setRadioBtns({
        ooo: true,
        ip: false,
      });
    }
  }, [landlordData]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
      <h2 className={styles.title}>Изменение данных профиля</h2>

      <div className={styles.inputGroup}>
        <label htmlFor="lastName" className={styles.lable}>
          Фамилия <span className='global-span'>*</span>
        </label>
        <input
          {...register('last_name', {
            required: 'Обязательное поле',
            minLength: {
              value: 2,
              message: 'Минимум два символа',
            },
            maxLength: {
              value: 100,
              message: 'Не более 100 символов',
            },
            pattern: {
              value: nameRegExp,
              message: 'Только буквы',
            },
          })}
          className={styles.input}
          name="last_name"
          id="lastName"
          type="text"
          placeholder="Фамилия"
          autoComplete="off"
          disabled={isDisabled}
          aria-invalid={errors.last_name ? 'true' : 'false'}
        />
        {errors.last_name && (
          <p role="alert" className={styles.inputError}>
            {errors.last_name.message}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="first_name" className={styles.lable}>
          Имя <span className='global-span'>*</span>
        </label>
        <input
          {...register('first_name', {
            required: 'Обязательное поле',
            minLength: {
              value: 2,
              message: 'Минимум два символа',
            },
            maxLength: {
              value: 100,
              message: 'Не более 100 символов',
            },
            pattern: {
              value: nameRegExp,
              message: 'Только буквы',
            },
          })}
          className={styles.input}
          name="first_name"
          id="first_name"
          type="text"
          placeholder="Имя"
          autoComplete="off"
          disabled={isDisabled}
          aria-invalid={errors.first_name ? 'true' : 'false'}
        />
        {errors.first_name && (
          <p role="alert" className={styles.inputError}>
            {errors.first_name.message}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="middle_name" className={styles.lable}>
          Отчество
        </label>
        <input
          {...register('middle_name', {
            required: false,
            minLength: {
              value: 2,
              message: 'Минимум два символа',
            },
            maxLength: {
              value: 100,
              message: 'Не более 100 символов',
            },
            pattern: {
              value: nameRegExp,
              message: 'Только буквы',
            },
          })}
          className={styles.input}
          name="middle_name"
          id="middle_name"
          type="text"
          placeholder="Отчество"
          autoComplete="off"
          disabled={isDisabled}
        />
        {errors.middle_name && (
          <p role="alert" className={styles.inputError}>
            {errors.middle_name.message}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="contact_email" className={styles.lable}>
          Email <span className='global-span'>*</span>
        </label>
        <input
          {...register('contact_email', {
            required: 'Обязательное поле',
            minLength: {
              value: 2,
              message: 'Минимум два символа',
            },
            pattern: {
              value: emailRegExp,
              message: 'Некорректный email',
            },
          })}
          className={styles.input}
          name="contact_email"
          id="contact_email"
          type="email"
          placeholder="email"
          autoComplete="off"
          disabled={isDisabled}
        />
        {errors.contact_email && (
          <p role="alert" className={styles.inputError}>
            {errors.contact_email.message}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="phone_number" className={styles.lable}>
          Телефон
        </label>
        <input
          {...register('phone_number', {
            required: false,
            minLength: {
              value: 2,
              message: 'Минимум два символа',
            },
            pattern: {
              value: phoneRegExp,
              message: 'Номер в формате +79123456789',
            },
          })}
          className={styles.input}
          name="phone_number"
          id="phone_number"
          type="text"
          placeholder="Мобильный номер"
          autoComplete="off"
          disabled={isDisabled}
          maxLength="12"
        />
        {errors.phone_number && (
          <p role="alert" className={styles.inputError}>
            {errors.phone_number.message}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="adress" className={styles.lable}>
          Адрес
        </label>
        <input
          {...register('adress', {
            required: false,
            minLength: {
              value: 2,
              message: 'Минимум два символа',
            },
            maxLength: {
              value: 300,
              message: 'Не более 300 символов',
            },
            pattern: {
              value: nameRegExp,
              message: 'Только буквы, цифры и знаки',
            },
          })}
          className={styles.input}
          name="adress"
          id="adress"
          type="text"
          placeholder="Адрес"
          autoComplete="off"
          disabled={isDisabled}
        />
        {errors.adress && (
          <p role="alert" className={styles.inputError}>
            {errors.adress.message}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="organization_name" className={styles.lable}>
          Название
        </label>
        <input
          {...register('organization_name', {
            required: false,
            minLength: {
              value: 2,
              message: 'Минимум два символа',
            },
            maxLength: {
              value: 300,
              message: 'Не более 300 символов',
            },
          })}
          className={styles.input}
          name="organization_name"
          id="organization_name"
          type="text"
          placeholder="Название организации"
          autoComplete="off"
          disabled={isDisabled}
        />
        {errors.organization_name && (
          <p role="alert" className={styles.inputError}>
            {errors.organization_name.message}
          </p>
        )}
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="organization_type" className={styles.lable}>
          Орг. форма
        </label>
        <div className={styles.radioGroup}>
          <div>
            <input
              type="radio"
              id="organization_type_ooo"
              className={styles.inputRadio}
              value="ORGANIZATION"
              checked={radioBtns.ooo}
              onChange={(event) => handleChange(event)}
              disabled={isDisabled}
            />
            <label
              htmlFor="organization_type_ooo"
              className={styles.labelRadio}
            >
              ООО
            </label>
          </div>

          <div>
            <input
              type="radio"
              id="organization_type_ip"
              className={styles.inputRadio}
              value="IP"
              checked={radioBtns.ip}
              onChange={(event) => handleChange(event)}
              disabled={isDisabled}
            />
            <label htmlFor="organization_type_ip">ИП</label>
          </div>
        </div>
      </div>

      <div className={styles.inputGroup}>
        <label htmlFor="inn" className={styles.lable}>
          ИНН
        </label>
        <input
          {...register('inn', {
            required: false,
            minLength: {
              value: 10,
              message: 'Введите от 10 символов',
            },
            pattern: {
              value: numbersRegExp,
              message: 'Только цифры',
            },
          })}
          className={styles.input}
          name="inn"
          id="inn"
          type="text"
          placeholder="ИНН"
          autoComplete="off"
          disabled={isDisabled}
          maxLength="12"
        />
        {errors.inn && (
          <p role="alert" className={styles.inputError}>
            {errors.inn.message}
          </p>
        )}
      </div>

      <div className={styles.buttons}>
        {!isDisabled ? (
          <>
            <ButtonDefault
              lable="Сохранить изменения"
              disabled={!isValid}
              action={handleSubmit(onSubmit)}
            />
            <ButtonDefault lable="Отмена" action={() => setIsDisabled(true)} />
          </>
        ) : (
          <ButtonDefault
            lable="Редактировать"
            action={() => setIsDisabled(false)}
            type="button"
          />
        )}
      </div>
    </form>
  );
};
