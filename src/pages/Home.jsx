import Card from "../components/Card";
import Header from "../components/Header";
import { useContext } from "react";
import Drawer from "../components/Drawer";
import { AppContext } from "../App";

const Home = ({ isLoading }) => {
  const {
    items,
    cartItems,
    cartOpened,
    setCartOpened,
    searchValue,
    onAddToCart,
    onChangeInput,
    removeFromCart,
    setSearchValue,
    toggleFavouritesFromHome
  } = useContext(AppContext);

  const renderItems = () => {
    const filteredItems = items.filter((item) =>
      item.name.toLowerCase().includes(searchValue.toLowerCase())
    );
    const skeletonItems = [
      { id: 111, price: 1, img: 1, name: 1 },
      { id: 222, price: 1, img: 1, name: 1 },
      { id: 333, price: 1, img: 1, name: 1 },
      { id: 444, price: 1, img: 1, name: 1 },
      { id: 555, price: 1, img: 1, name: 1 },
      { id: 666, price: 1, img: 1, name: 1 },
      { id: 777, price: 1, img: 1, name: 1 },
      { id: 888, price: 1, img: 1, name: 1 },
    ];

    return (isLoading ? skeletonItems : filteredItems).map((item, index) => (
      <Card
        key={item.id}
        loading={isLoading}
        home={true}
        onFavourite={(obj) => toggleFavouritesFromHome(obj)}
        onPlus={(obj) => onAddToCart(obj)}
        {...item}
      />
    ));
  };

  return (
    <div className="wrapper clear">

      <Drawer
        items={cartItems}
        closeCart={() => setCartOpened(false)}
        removeFromCart={removeFromCart}
        opened={cartOpened}
      />
      <Header openCart={() => setCartOpened(true)} />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>
            {searchValue
              ? `Поиск по запросу "${searchValue}"`
              : "Все кроссовки"}
          </h1>
          <div className="search-block d-flex">
            <img src="images/search.svg" alt="Search" />
            {searchValue && (
              <img
                onClick={() => setSearchValue("")}
                className="clear cu-p"
                src="images/removeBtn.svg"
                alt="clear"
              />
            )}
            <input
              onChange={onChangeInput}
              value={searchValue}
              type="text"
              placeholder="Поиск..."
            />
          </div>
        </div>
        <div className="d-flex flex-wrap">{renderItems()}</div>
      </div>
    </div>
  );
};

export default Home;
