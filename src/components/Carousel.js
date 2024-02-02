import { makeStyles } from "@mui/styles";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ContextState } from "../Context";
import { TrendingCoins } from "../config/api";
import AliceCarousel from "react-alice-carousel";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({
  carousel: {
    height: "50%",
    display: "flex",
    alignItems: "center",
  },

  carouselItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer",
    textTransform: "uppercase",
    color: "white",
  },
}));

const Carousel = () => {
  const [trending, setTrending] = useState([]);
  const classes = useStyles();

  const { currency } = ContextState();
  const fetchTrendingCoins = async () => {
    const { data } = await axios.get(TrendingCoins(currency));

    console.log(data);
    setTrending(data);
  };

  const responsive = {
    0:{
        items:3
    },
    512: {
        items: 4
    },
  }

  const items = trending.map((coin) => {
    let profit = coin?.price_change_percentage_24h >= 0;

    return (
        <Link
        className={classes.carouselItem}
        to={`/coins/${coin.id}`}
        >
        <img
          src={coin?.image}
          alt={coin.name}
          height="80"
          style={{ marginBottom: 10 }}
        />
        </Link>
    //   <Link className={classes.carouselItem} to={`/coins/${coin.id}`}>
    //     <img
    //       src={coin?.image}
    //       alt={coin.name}
    //       height="80"
    //       style={{ marginBottom: 10 }}
    //     />
    //     <span>
    //       {coin?.symbol}
    //       &nbsp;
    //       <span
    //         style={{
    //           color: profit > 0 ? "rgb(14, 203, 129)" : "red",
    //           fontWeight: 500,
    //         }}
    //       >
    //         {profit && "+"}
    //         {coin?.price_change_percentage_24h?.toFixed(2)}%
    //       </span>
    //     </span>
    //     <span style={{ fontSize: 22, fontWeight: 500 }}>
    //       {symbol} {numberWithCommas(coin?.current_price.toFixed(2))}
    //     </span>
    //   </Link>
    );
  });

  useEffect(() => {
    fetchTrendingCoins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currency]);
  
  return <div className={classes.carousel}> 
    <AliceCarousel
        animationDuration={1500}
        mouseTracking
        infinite
        autoPlayInterval={1000}
        disableDotsControls
        responsive={responsive}
        autoPlay
        items={items}
    />
  </div>;
};

export default Carousel;
