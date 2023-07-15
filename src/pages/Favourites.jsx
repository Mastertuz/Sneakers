import Header from "../components/Header";
import Card from "../components/Card";
import React, { useContext } from 'react'
import { AppContext } from "../App";

const Favourites = () => {
  const { favourites, addToFavourites } = useContext(AppContext)

  return (
    <div className="wrapper clear">
      <Header />
      <div className="content p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1>Мои закладки</h1>
        </div>
        <div className="d-flex flex-wrap">
          {favourites.map((item, index) => (
            <Card
              key={item.id}
              home={false}
              favourited={true}
              onFavourite={addToFavourites}
              {...item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favourites;
