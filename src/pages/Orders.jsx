import { useContext, useEffect, useState } from "react";
import Card from "../components/Card";
import Header from "../components/Header";
import axios from "axios";
import { AppContext } from "../App";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { isLoading, setIsLoading } =
  useContext(AppContext);
  useEffect(() => {
    async function fetchData() {
      try {
        const { data } = await axios.get(
          "https://6470f9e03de51400f72531aa.mockapi.io/orders"
          );
          setOrders(data.map((obj) => obj.items).flat());
          setIsLoading(false);
        } catch (err) {
          alert(err);
        }
      }
      fetchData();
    }, []);
    const skeletonItems = [
      { id: 1, price: 1, img: 1, name: 1 },
      { id: 1, price: 1, img: 1, name: 1 },
      { id: 1, price: 1, img: 1, name: 1 },
      { id: 1, price: 1, img: 1, name: 1 },
      { id: 1, price: 1, img: 1, name: 1 },
      { id: 1, price: 1, img: 1, name: 1 },
      { id: 1, price: 1, img: 1, name: 1 },
      { id: 1, price: 1, img: 1, name: 1 },
    ];
  return (
    <div className="wrapper clear">
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои заказы</h1>
        </div>
        <div className="d-flex flex-wrap">
          {(isLoading? skeletonItems: orders).map((item, index) => (
            <Card
              key={index}
              loading={isLoading}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Orders;
