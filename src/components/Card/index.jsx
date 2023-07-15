import { useContext, useState } from "react";
import styles from "./Card.module.scss";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";

const Card = ({
  name,
  price,
  img,
  onPlus,
  onFavourite,
  id,
  home,
  favourited = false,
  loading = false,
}) => {
  const { isInCart, favourites } = useContext(AppContext);
  const [isFavourite, setIsFavourite] = useState(favourited);
  const obj = { name, img, price, id, parentId: id };
  const addToCart = () => {
    onPlus(obj);
  };
  
  const addToFavourite = () => {
    onFavourite(obj);
    setIsFavourite(!isFavourite);
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={155}
          height={250}
          viewBox="0 0 155 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="155" height="155" />
          <rect x="0" y="167" rx="5" ry="5" width="155" height="15" />
          <rect x="0" y="187" rx="5" ry="5" width="100" height="15" />
          <rect x="1" y="234" rx="5" ry="5" width="80" height="25" />
          <rect x="124" y="230" rx="10" ry="10" width="32" height="32" />
        </ContentLoader>
      ) : (
        <>
          {favourites.find(item => home ? +item.parentId === +id : +item.id === +id) ?
            <div className={styles.favourite} onClick={addToFavourite}>
              <img
                width={32}
                height={32}
                src={`images/liked.svg`}
                alt="Unliked"
              />
            </div>
            :
            <div className={styles.favourite} onClick={addToFavourite}>
              <img
                width={32}
                height={32}
                src={`images/unliked.svg`}
                alt="Unliked"
              />
            </div>
          }

          <img width="100%" height={135} src={img} alt="" />
          <h5>{name}</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>{price} руб</b>
            </div>
            {onPlus && (
              <img
                onClick={addToCart}
                src={`images/${isInCart(id) ? "added" : "add"}.svg`}
                alt="Plus"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Card;
