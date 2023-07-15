import { useState } from "react";
import Info from "../Card/Info";
import axios from "axios";
import { useCart } from "../../hooks/useCart";
import styles from './Drawer.module.scss'

const delay = ()=>new Promise((resolve)=>setTimeout(resolve,1000))

const Drawer = ({ closeCart, items = [], removeFromCart,opened }) => {
  const {cartItems,setCartItems,totalPrice}=useCart()
  const [isCompleted, setIsCompleted] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post(
        "https://6470f9e03de51400f72531aa.mockapi.io/orders",
        { items: cartItems }
      );

      setOrderId(data.id);
      setIsCompleted(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete(
          "https://646a743f70b2302c85e5eb2f.mockapi.io/cart/" + item.id
        );
        await delay()
      }
    } catch (err) {
      console.log("не удалось оформить заказ");
      console.log(err);
    }
    setIsLoading(false);
  };
  return (
    <div className={`${styles.overlay} ${opened? styles.overlayVisible:''}`}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30 ">
          Корзина
          <img
            onClick={closeCart}
            className="removeBtn cu-p"
            src="images/removeBtn.svg"
            alt=""
          />
        </h2>

        {items.length > 0 ? (
          <>
            <div className="items">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="cartItem d-flex align-center mb-20"
                >
                  <div
                    style={{ backgroundImage: `url(${item.img})` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{item.name}</p>
                    <b>{item.price} руб.</b>
                  </div>
                  <img
                    onClick={() => removeFromCart(item.id)}
                    className="removeBtn"
                    src="images/removeBtn.svg"
                    alt=""
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b> {totalPrice} руб</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>{Math.round(totalPrice/100 *5)} руб</b>
                </li>
              </ul>
              <button
                disabled={isLoading}
                onClick={onClickOrder}
                className="greenButton"
              >
                Оформить заказ
                <img src="images/arrow.svg" alt="" />
              </button>
            </div>
          </>
        ) : (
          <Info
            name={isCompleted ? "Заказ оформлен" : "Корзина пуста"}
            description={
              isCompleted
                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                : "Добавьте хотя бы одну пару кроссовок,чтобы сделать заказ."
            }
            img={
              isCompleted
                ? "images/completeOrder.jpg"
                : "images/empty-cart.jpg"
            }
          />
        )}
      </div>
    </div>
  );
};

export default Drawer;
