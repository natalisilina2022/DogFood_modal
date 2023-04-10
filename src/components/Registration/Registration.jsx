import Modal from "../modal/Modal";
import { useContext, useState } from "react";
import { ModalContext } from "../../context/modalContext";
import FormLogin from "../Form/FormLogin";
import FormReg from "../Form/FormReg";
import "../App/index.css";
import style from "../Button/index.module.css"

const Registration = () => {
  const { setActive } = useContext(ModalContext);
  const [type, setType] = useState("");
  const handleSingUp = () => {
    setType("up");
    setActive(true);
  };

  const handleSingIn = () => {
    setType("in");
    setActive(true);
  };
  return (
    <div>
      <button className={style.btn_reg} onClick={handleSingUp}>
        Регистрация
      </button>
      <button className={style.btn_reg} onClick={handleSingIn}>
        Авторизация
      </button>
      <Modal>
        {type === "up" && <FormReg setType={setType} />}
        {type === "in" && <FormLogin />}
      </Modal>
    </div>
  );
};

export default Registration;