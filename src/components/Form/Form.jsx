import { useContext } from "react";
import { useForm } from "react-hook-form";
import styles from "./form.module.css";
import api from "../../api";
import { ModalContext } from "../../context/modalContext";

const Form = ({ id, setCurrentReviews }) => {
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
      await api.setReview(id, data);
      setActive(false);
      let result = await api.getProductReviews(id);
      setCurrentReviews(result);
    } catch (error) {
      alert(error);
    }
  };

  const handleClose = () => {
    setActive(false);
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <h3>Оставить отзыв</h3>
      <textarea
        className={styles.input}
        {...register("text", {
          required: "Обязательное поле",
        })}
        type="text"
        placeholder="Ваш текст"
      />
      <div className={styles.erroe__form}>
        {errors?.text && <p>{errors?.text?.message}</p>}
      </div>
      <div className={styles.button_group}>
        <button className={styles.forms_btn} onClick={handleClose}>Отмена</button>
        <button className={styles.forms_btn}>Сохранить</button>
      </div>
    </form>
  );
};

export default Form;
