import React from "react";
import Successful_registration from '../images/Successful_registration.svg'
import Error_registration from '../images/Error_registration.svg'

function InfoTooltip(props) {

  const ArrText = [`Вы успешно зарегистрировались!`, `Что-то пошло не так!Попробуйте ещё раз.`]
  const imageRegistration = [Successful_registration,Error_registration]

  return (
    <>
      <section className={ props.isOpenInfoPopup?  `popup  popup_opened`:`popup` }>
        <div className="popup__main popup__infoTooltip">
          <button
            className="popup__button"
            type="button"
            id="closeButtonInfoTooltip"
            onClick={props.onClose}
          ></button>
          {
            props.infoPopup ? <img src={imageRegistration[0]} alt="Успешная регистрация" className="popup__info-img" id="profileInfoTooltip" /> :
              <img src={imageRegistration[1]} alt="Ошибка регистрации" className="popup__info-img" id="profileInfoTooltip" />
          }
          {
            props.infoPopup ? <h2 className="popup__info-title">{ArrText[0]}</h2>:<h2 className="popup__info-title">{ArrText[1]}</h2>
          }

        </div>
      </section>
    </>
  );
}

export default InfoTooltip;
