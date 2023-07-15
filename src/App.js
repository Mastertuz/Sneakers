import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Favourites from "./pages/Favourites";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import Orders from "./pages/Orders";

export const AppContext = createContext({});
function App() {
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favourites, setFavourites] = useState([]);
  const [cartOpened, setCartOpened] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartItemsResponse, favouritesItemsResponse, itemsResponse] =
          await Promise.all([
            axios.get("https://646a743f70b2302c85e5eb2f.mockapi.io/cart"),
            axios.get("https://646c77ba7b42c06c3b2b4e55.mockapi.io/favourites"),
            axios.get("https://646a743f70b2302c85e5eb2f.mockapi.io/items"),
          ]);

        setIsLoading(false);
        setCartItems(cartItemsResponse.data);
        setFavourites(favouritesItemsResponse.data);
        setItems(itemsResponse.data);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const onAddToCart = async (obj) => {
    const findItem = cartItems.find((item) => item.parentId == obj.id);
    try {
      if (findItem) {
        setCartItems((prev) => prev.filter((item) => item.parentId !== obj.id));
        await axios.delete(
          `https://646a743f70b2302c85e5eb2f.mockapi.io/cart/${findItem.id}`
        );
      } else {
        setCartItems((prev) => [...prev, obj]);
        const { data } = await axios.post(
          "https://646a743f70b2302c85e5eb2f.mockapi.io/cart",
          obj
        );
        setCartItems((prev) =>
          prev.map((item) => {
            if (item.parentId == data.parentId) {
              return {
                ...item,
                id: data.id,
              };
            }
          })
        );
      }
    } catch (err) {
      console.log("Не получилось добавить товар в корзину");
    }
  };
  const onChangeInput = (e) => {
    setSearchValue(e.target.value);
  };

  const removeFromCart = (id) => {
    try {
      axios.delete(`https://646a743f70b2302c85e5eb2f.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert(err)
    }
  };

  const addToFavourites = async (obj) => {

    try {
      if (favourites.find((favObj) => +favObj.id === +obj.id)) {
        await axios.delete(
          `https://646c77ba7b42c06c3b2b4e55.mockapi.io/favourites/${obj.id}`
        );
        setFavourites((prev) => prev.filter((item) => +item.id !== +obj.id));
      } else {
        const { data } = await axios.post(
          "https://646c77ba7b42c06c3b2b4e55.mockapi.io/favourites",
          obj
        );
        setFavourites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Не удалось добавить в закладки");
    }
  };

  const toggleFavouritesFromHome = async (obj) => {

    const product = favourites.find(item => +item.parentId === +obj.id)
    try {
      if (product && favourites.find((favObj) => +favObj.id === +product.id)) {
        await axios.delete(
          `https://646c77ba7b42c06c3b2b4e55.mockapi.io/favourites/${product.id}`
        );
        setFavourites((prev) => prev.filter((item) => +item.id !== +product.id));
      } else {
        const { data } = await axios.post(
          "https://646c77ba7b42c06c3b2b4e55.mockapi.io/favourites",
          obj
        );
        setFavourites((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Не удалось добавить в закладки");
    }
  };

  const isInCart = (id) => {
    return cartItems.some((item) => +item.parentId === +id);
  };
  const isInFavourites = (id) => {
    return favourites.some((item) => +item.parentId === +id);
  };


  return (
    <AppContext.Provider
      value={{
        items,
        isInFavourites,
        favourites,
        cartItems,
        cartOpened,
        setCartOpened,
        setCartItems,
        searchValue,
        onAddToCart,
        onChangeInput,
        addToFavourites,
        removeFromCart,
        setSearchValue,
        isInCart,
        isLoading,
        setIsLoading,
        toggleFavouritesFromHome
      }}
    >
      <Router>
        <Routes>
          <Route path="/" exact element={<Home isLoading={isLoading} />} />
          <Route
            path="/favourites"
            exact
            element={
              <Favourites
              />
            }
          />
          <Route path="/orders" exact element={<Orders />}></Route>
        </Routes>
      </Router>
    </AppContext.Provider>
  );
}

export default App;
