import { useContext } from "react";
import { AppContext } from "../../App";

const Info = ({name,img,description}) => {
    const {setCartOpened} = useContext(AppContext)
  return (
    <div className="cartEmpty d-flex align-center justify-center flex-column flex">
      <img
        className="mb-20"
        width={120}
        src={img}
        alt="Cart empty"
      />
      <h2>{name}</h2>
      <p className="opacity-6">
       {description}
      </p>
      <button onClick={()=>setCartOpened(false)} className="greenButton">
        <img src="images/arrow.svg" alt="Arrow" /> Вернуться назад
      </button>
    </div>
  );
};

export default Info;
