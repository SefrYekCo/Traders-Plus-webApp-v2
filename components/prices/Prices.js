import React, { useContext, useState, useEffect } from "react";
import styles from "./prices.module.css";
import { contextThemeController } from "../../context/themeContext";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import SaveIcon from "@mui/icons-material/TurnedInNot";
import UnsaveIcon from "@mui/icons-material/TurnedIn";

import { Pagination, Navigation } from "swiper";
import CandleChart from "../helperComponent/CandleChart";
import MyListTable from "../tables/MyListTable";
import { getCryptos, getCurrencies } from "../../api/cryptosApi";
import { numberWithCommas } from "../../helpers/helperFunctions";
import Loading from "../loading/loading";

const Prices = ({ currencies, cryptos }) => {
  const { Theme, setTheme } = useContext(contextThemeController);
  const [info, setInfo] = useState([]);
  const [search, setSearch] = useState("");
  const [savedCryptos, setSavedCryptos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [chartSymbol, setChartSymbol] = useState("btc");
  const [typeOfData, setTypeOfData] = useState({
    cryptos: true,
    currencies: false,
    metals: false,
    bourse: false,
  });

  const [type, setType] = useState("price");

  const cryptosWithChart = ["BTC", "ETH", "BNB", "LTC", "DOGE", "DOT", "XRP"];

  const selectChangeHandler = (e) => {
    setType(e.target.value);
  };

  useEffect(() => {
    // getCryptos((isOk ,data) => {
    //   if(isOk){
    //     localStorage.setItem("cryptos" , JSON.stringify(data.response.cryptos))
    //     return setInfo(data.response.cryptos)
    //   }
    //   return console.log(data);
    // })

    localStorage.setItem("cryptos", JSON.stringify(cryptos));
    return setInfo(cryptos);
  }, []);

  useEffect(() => {
    const updateArr = [];

    if (typeOfData.cryptos) {
      const savedItems = JSON.parse(localStorage.getItem("savedCryptos"));
      savedItems &&
        savedItems.map((item) => {
          for (let i = 0; i < info.length; i++) {
            if (item.symbol === info[i].symbol) {
              info[i].save = true;
              item.price = info[i].price;
              return updateArr.push(item);
            }
          }
        });

      localStorage.setItem("cryptos", JSON.stringify(info));
      updateArr.map((item, index) => {
        return (item.id = index + 1);
      });
      setSavedCryptos(updateArr);
    }

    if (typeOfData.metals) {
      const savedItems = JSON.parse(localStorage.getItem("savedMetals"));
      savedItems &&
        savedItems.map((item) => {
          for (let i = 0; i < info.length; i++) {
            if (item.slug === info[i].slug) {
              info[i].save = true;
              item.price = info[i].price;
              return updateArr.push(item);
            }
          }
        });

      localStorage.setItem("metals", JSON.stringify(info));
      updateArr.map((item, index) => {
        return (item.id = index + 1);
      });
      setSavedCryptos(updateArr);
    }

    if (typeOfData.currencies) {
      const savedItems = JSON.parse(localStorage.getItem("savedCurrencies"));
      savedItems &&
        savedItems.map((item) => {
          for (let i = 0; i < info.length; i++) {
            if (item.slug === info[i].slug) {
              info[i].save = true;
              item.price = info[i].price;
              return updateArr.push(item);
            }
          }
        });

      localStorage.setItem("currencies", JSON.stringify(info));
      updateArr.map((item, index) => {
        return (item.id = index + 1);
      });
      setSavedCryptos(updateArr);
    }
  }, [info]);

  const showChartHandler = (symbol) => {
    setChartSymbol(symbol.toLowerCase());
  };

  const searchChangeHandler = (e) => {
    setSearch(e.target.value);
  };

  const saveHandler = (symbol) => {
    const arr = [];
    if (typeOfData.cryptos) {
      const data = JSON.parse(localStorage.getItem("cryptos"));
      data.map((item) => {
        if (item.symbol == symbol && !item.save) {
          item.save = true;
          return arr.push(item);
        }
        if (item.symbol === symbol && item.save) {
          item.save = false;
          return arr.push(item);
        }
        if (item.symbol !== symbol) {
          return arr.push(item);
        }
      });
      const savedItems = arr.filter((item) => {
        return item.save === true;
      });
      localStorage.setItem("savedCryptos", JSON.stringify(savedItems));
      localStorage.setItem("cryptos", JSON.stringify(arr));
    }

    if (typeOfData.metals) {
      const data = JSON.parse(localStorage.getItem("metals"));
      data.map((item) => {
        if (item.slug === symbol && !item.save) {
          item.save = true;
          return arr.push(item);
        }
        if (item.slug === symbol && item.save) {
          item.save = false;
          return arr.push(item);
        }
        if (item.slug !== symbol) {
          return arr.push(item);
        }
      });
      const savedItems = arr.filter((item) => {
        return item.save === true;
      });
      localStorage.setItem("savedMetals", JSON.stringify(savedItems));
      localStorage.setItem("metals", JSON.stringify(arr));
    }

    if (typeOfData.currencies) {
      const data = JSON.parse(localStorage.getItem("currencies"));
      data.map((item) => {
        if (item.slug === symbol && !item.save) {
          item.save = true;
          return arr.push(item);
        }
        if (item.slug === symbol && item.save) {
          item.save = false;
          return arr.push(item);
        }
        if (item.slug !== symbol) {
          return arr.push(item);
        }
      });
      const savedItems = arr.filter((item) => {
        return item.save === true;
      });
      localStorage.setItem("savedCurrencies", JSON.stringify(savedItems));
      localStorage.setItem("currencies", JSON.stringify(arr));
    }

    setInfo(arr);
  };

  const cryptosClickHandler = () => {
    // setLoading(true)
    setTypeOfData({
      ["cryptos"]: true,
      ["currencies"]: false,
      ["bourse"]: false,
      ["metals"]: false,
    });
    // getCryptos((isOk ,data) => {
    //   if(isOk){
    //     setInfo(data.response.cryptos)
    //     return setLoading(false)
    //   }
    //   console.log(data);
    //   setLoading(false)
    // })
    setInfo(cryptos);
  };

  const bourseClickHandler = () => {
    // setLoading(true)
    setTypeOfData({
      ["cryptos"]: false,
      ["currencies"]: false,
      ["bourse"]: true,
      ["metals"]: false,
    });
    // getCurrencies((isOk ,data) => {
    //   if(isOk){
    //     setInfo(data.response.indexes)
    //     return setLoading(false)
    //   }
    //   console.log(data);
    //   setLoading(false)
    // })
    setInfo(currencies.indexes);
  };

  const metalsClickHandler = () => {
    //setLoading(true)
    setTypeOfData({
      ["cryptos"]: false,
      ["currencies"]: false,
      ["bourse"]: false,
      ["metals"]: true,
    });
    // getCurrencies((isOk ,data) => {
    //   if(isOk){
    //     localStorage.setItem("metals" , JSON.stringify(data.response.metals))
    //     setInfo(data.response.metals)
    //     return setLoading(false)
    //   }
    //   console.log(data);
    //   setLoading(false)
    // })
    localStorage.setItem("metals", JSON.stringify(currencies.metals));
    setInfo(currencies.metals);
  };

  const currenciesClickHandler = () => {
    // setLoading(true)
    setTypeOfData({
      ["cryptos"]: false,
      ["currencies"]: true,
      ["bourse"]: false,
      ["metals"]: false,
    });
    // getCurrencies((isOk ,data) => {
    //   if(isOk){
    //     localStorage.setItem("currencies" , JSON.stringify(data.response.currencies))
    //     setInfo(data.response.currencies)
    //     return setLoading(false)
    //   }
    //   console.log(data);
    //   setLoading(false)
    // })
    localStorage.setItem("currencies", JSON.stringify(currencies.currencies));
    setInfo(currencies.currencies);
  };

  const filterData =
    info &&
    info.filter((item) =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div className={styles.container}>
      <div className={styles.firstContainer}>
        <select
          className={Theme ? styles.selectTag : styles.selectTagDark}
          onChange={selectChangeHandler}
        >
          <option className={styles.option} value={"price"}>
            {" "}
            قیمت ها{" "}
          </option>
          <option className={styles.option} value={"myList"}>
            {" "}
            دیدبان{" "}
          </option>
        </select>
      </div>
      <ul className={Theme ? styles.unOrderedList : styles.unOrderedListDark}>
        <button
          style={
            typeOfData.cryptos
              ? { backgroundColor: "#45B6A3", borderRadius: "8px" }
              : {}
          }
          className={Theme ? styles.liTag : styles.liTagDark}
          type="button"
          autoFocus
          onClick={cryptosClickHandler}
        >
          ارز دیجیتال
        </button>
        <button
          style={
            typeOfData.bourse
              ? { backgroundColor: "#45B6A3", borderRadius: "8px" }
              : {}
          }
          className={Theme ? styles.liTag : styles.liTagDark}
          type="button"
          onClick={bourseClickHandler}
        >
          بورس ایران
        </button>
        <button
          style={
            typeOfData.metals
              ? { backgroundColor: "#45B6A3", borderRadius: "8px" }
              : {}
          }
          className={Theme ? styles.liTag : styles.liTagDark}
          type="button"
          onClick={metalsClickHandler}
        >
          سکه
        </button>

        <button
          style={
            typeOfData.currencies
              ? { backgroundColor: "#45B6A3", borderRadius: "8px" }
              : {}
          }
          className={Theme ? styles.liTag : styles.liTagDark}
          type="button"
          onClick={currenciesClickHandler}
        >
          ارز
        </button>
      </ul>

      <div className={styles.carouselContainer}>
        <input
          name="search"
          value={search}
          onChange={searchChangeHandler}
          className={Theme ? styles.search : styles.searchDark}
          placeholder={"جستجو بر اساس نام"}
        />
        {loading ? (
          <Loading height={"20vh"} />
        ) : (
          <Swiper
            dir="rtl"
            slidesPerView={1.5}
            spaceBetween={10}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4.5,
                spaceBetween: 50,
              },
            }}
            centeredSlides={true}
            centeredSlidesBounds={true}
            style={{ width: "100%" }}
            modules={[Pagination, Navigation]}
            className="mySwiper"
          >
            {filterData &&
              filterData.map((item, index) => {
                return (
                  <SwiperSlide key={index + 1} className={styles.swiperSlde}>
                    <div
                      tabIndex={1}
                      className={
                        Theme ? styles.eachCoinBtn : styles.eachCoinBtnDark
                      }
                    >
                      {typeOfData.cryptos && (
                        <div
                          className={
                            Theme
                              ? styles.eachContainer
                              : styles.eachContainerDark
                          }
                        >
                          {item.icon && (
                            <Image
                              width={50}
                              height={50}
                              className={styles.icon}
                              src={item.icon}
                              alt={"image"}
                            />
                          )}
                          <div
                            className={styles.coinContainer}
                            id={item.symbol}
                          >
                            <div className={styles.firstRowContainer}>
                              <button
                                className={
                                  Theme ? styles.saveBtn : styles.saveBtnDark
                                }
                                onClick={() => saveHandler(item.symbol)}
                              >
                                {item.save ? <UnsaveIcon /> : <SaveIcon />}
                              </button>

                              {cryptosWithChart.includes(item.symbol) && (
                                <button
                                  className={styles.chartBtn}
                                  onClick={() => showChartHandler(item.symbol)}
                                >
                                  نمایش نمودار
                                </button>
                              )}

                              <p
                                className={
                                  Theme
                                    ? styles.brokerageName
                                    : styles.brokerageNameDark
                                }
                              >
                                {" "}
                                {item.name}{" "}
                              </p>
                            </div>
                            <div
                              className={
                                Theme
                                  ? styles.coinDataContainer
                                  : styles.coinDataContainerDark
                              }
                            >
                              <span>
                                {" "}
                                {parseFloat(item.price).toFixed(2)}${" "}
                              </span>
                              <span>{item.symbol}</span>
                              <span
                                className={
                                  +item.change_percent_24h < 0
                                    ? styles.redPercentage
                                    : styles.greenPercentage
                                }
                              >
                                {" "}
                                {parseFloat(item.change_percent_24h).toFixed(
                                  2
                                )}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {typeOfData.currencies && (
                        <div
                          className={
                            Theme
                              ? styles.eachContainer
                              : styles.eachContainerDark
                          }
                        >
                          <div className={styles.coinContainer}>
                            <div className={styles.firstRowContainer}>
                              <button
                                className={
                                  Theme ? styles.saveBtn : styles.saveBtnDark
                                }
                                onClick={() => saveHandler(item.slug)}
                              >
                                {item.save ? <UnsaveIcon /> : <SaveIcon />}
                              </button>

                              <p
                                className={
                                  Theme
                                    ? styles.brokerageName
                                    : styles.brokerageNameDark
                                }
                              >
                                {" "}
                                {item.name}{" "}
                              </p>
                            </div>
                            <div
                              className={
                                Theme
                                  ? styles.coinDataContainer
                                  : styles.coinDataContainerDark
                              }
                            >
                              <span>
                                {" "}
                                {numberWithCommas(
                                  parseFloat(item.price).toFixed(0)
                                )}{" "}
                                ریال
                              </span>
                              <span>{item.slug}</span>
                              <span
                                className={
                                  +item.change_percent < 0
                                    ? styles.redPercentage
                                    : styles.greenPercentage
                                }
                              >
                                {" "}
                                {parseFloat(item.change_percent).toFixed(
                                  2
                                )}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {typeOfData.metals && (
                        <div
                          style={{ width: "100%" }}
                          className={
                            Theme
                              ? styles.eachContainer
                              : styles.eachContainerDark
                          }
                        >
                          <div
                            className={styles.coinContainer}
                            style={{ width: "100% !important" }}
                          >
                            <div className={styles.firstRowContainer}>
                              <button
                                className={
                                  Theme ? styles.saveBtn : styles.saveBtnDark
                                }
                                onClick={() => saveHandler(item.slug)}
                              >
                                {item.save ? <UnsaveIcon /> : <SaveIcon />}
                              </button>

                              <p
                                className={
                                  Theme
                                    ? styles.brokerageName
                                    : styles.brokerageNameDark
                                }
                              >
                                {" "}
                                {item.name}{" "}
                              </p>
                            </div>
                            <div
                              className={
                                Theme
                                  ? styles.coinDataContainer
                                  : styles.coinDataContainerDark
                              }
                            >
                              <span>
                                {" "}
                                {numberWithCommas(
                                  parseFloat(item.price).toFixed(0)
                                )}{" "}
                                ریال{" "}
                              </span>

                              <span
                                className={
                                  +item.change_percent < 0
                                    ? styles.redPercentage
                                    : styles.greenPercentage
                                }
                              >
                                {" "}
                                {parseFloat(item.change_percent).toFixed(
                                  2
                                )}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}

                      {typeOfData.bourse && (
                        <div
                          className={
                            Theme
                              ? styles.eachContainer
                              : styles.eachContainerDark
                          }
                        >
                          <div className={styles.coinContainer}>
                            <p
                              className={
                                Theme
                                  ? styles.brokerageName
                                  : styles.brokerageNameDark
                              }
                            >
                              {" "}
                              {item.name}{" "}
                            </p>
                            <div
                              className={
                                Theme
                                  ? styles.coinDataContainer
                                  : styles.coinDataContainerDark
                              }
                            >
                              <span>
                                {" "}
                                {numberWithCommas(
                                  parseFloat(item.value).toFixed(2)
                                )}
                                : value
                              </span>

                              <span
                                className={
                                  +item.percentage_of_changes < 0
                                    ? styles.redPercentage
                                    : styles.greenPercentage
                                }
                              >
                                {" "}
                                {parseFloat(item.percentage_of_changes).toFixed(
                                  2
                                )}{" "}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                );
              })}
          </Swiper>
        )}
      </div>
      {type === "price" ? (
        <CandleChart symbol={chartSymbol} />
      ) : (
        !typeOfData.bourse && (
          <MyListTable data={savedCryptos} theme={Theme} type={typeOfData} />
        )
      )}
    </div>
  );
};

export default Prices;
