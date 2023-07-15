
import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
const Header = ({ openCart }) => {
  const { totalPrice } = useCart();
  return (
    <header className="d-flex justify-between align-center p-40">
      <Link to={"/"}>
        <div className="d-flex align-center">
          <img width={40} height={40} src="images/logo.png" />
          <div>
            <h3 className="text-uppercase">React Sneakers</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
      </Link>
      <ul className="d-flex">
        <li onClick={openCart} className="mr-30 cu-p">
          <img src="images/cart.svg" width={18} height={18} />
          <span>{totalPrice} руб.</span>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/favourites">
            <img src="images/heart.svg" width={18} height={18} />
          </Link>
        </li>
        <li className="mr-20 cu-p">
          <Link to="/orders">
            <img src="images/user.svg" width={18} height={18} />
          </Link>
        </li>
      </ul>
    </header>
  );
};

export default Header;
