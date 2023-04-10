import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import api from "../../api";
import { ModalContext } from "../../context/modalContext";

const FormLogin = () => {
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
      let result = await api.singInUser(data);
      setActive(false);
      localStorage.setItem("token", result.token);
    } catch (error) {
      alert(error);
      if (error === "Ошибка: 401") {
        alert("Почта или пароль введены неверно");
      } else alert(error);
    }
  };

  const handleClose = () => {
    setActive(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Авторизация</h3>
      <input
        className={styles.input}
        {...register("email", {
          required: "Обязательное поле",
          pattern: {
            value:
              /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu,
            message: "Введите действительный адрес электронной почты.",
          },
        })}
        type="text"
        placeholder="Email"
      />
      <div className={styles.error__form}>
        {errors?.email && <p>{errors?.email?.message}</p>}
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

      <div className={styles.button_group}>
        <button className={styles.forms_btn} onClick={handleClose}>Отмена</button>
        <button className={styles.forms_btn}>Войти</button>
      </div>
    </form>
  );
};

export default FormLogin;
