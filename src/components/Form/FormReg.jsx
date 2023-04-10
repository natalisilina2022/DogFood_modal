import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import api from "../../api";
import { ModalContext } from "../../context/modalContext";

const FormReg = ({ setType }) => {
  const { setActive } = useContext(ModalContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = async (data) => {
    try {
      await api.singUpUser(data);
      setActive(false);
      setType("in");
      setActive(true);
    } catch (error) {
      alert(error);
    }
  };

  const handleClose = () => {
    setActive(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Регистрация</h3>
      <input
        className={styles.input}
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value: /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: "Введите действительный адрес электронной почты"
          }
        })}
        type="text"
        placeholder="Email"
      />
      <div className={styles.error__form}>
        {errors?.email && <p>{errors?.email?.message}</p>}
      </div>
      <input
        className={styles.input}
        {...register("group", {
          required: "Обязательное поле",
        })}
        type="text"
        placeholder="Группа"
      />
      <div className={styles.error__form}>
        {errors?.group && <p>{errors?.group?.message}</p>}
      </div>
      <input
        className={styles.input}
        {...register("password", {
          required: "Обязательное поле",
        })}
        type="text"
        placeholder="Пароль"
      />
      <div className={styles.error__form}>
        {errors?.password && <p>{errors?.password?.message}</p>}
      </div>
      <p>Регистрируясь на сайте, вы соглашаетесь с нашими Правилами и Политикой конфиденциальности и соглашаетесь на информационную рассылку.</p>
      <div className={styles.button_group}>
        <button className={styles.forms_btn} onClick={handleClose}>Отмена</button>
        <button className={styles.forms_btn}>Зарегистрироваться</button>
      </div>
    </form>
  );
};

export default FormReg;
