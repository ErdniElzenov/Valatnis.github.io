import React, { useEffect, useState } from "react";
import md5 from "md5";
import Card from "../components/Card/Card";
import Hader from "../components/Hader/Hader";
import Filetr from "../components/Filter/Filter";
import { Pagination } from "antd";
import "./Home.css";

// возможно надо было их вынести
const url = "https://api.valantis.store:41000";
const password = "Valantis";
const timeshtamp = new Date()
  .toISOString()
  .slice(0, 10)
  .replace(/[^0-9]/g, ""); // получаем дату
const authString = md5(`${password}_${timeshtamp}`);
const headersOptions = {
  "Content-Type": "application/json",
  "X-Auth": authString,
};

const Home = () => {
  const [card, setCard] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [carrentPage, setCarrentpage] = useState(0);
  const [pagetotal, setPagetotal] = useState(500);
  const [pagesize, setPagesize] = useState(20);
  const [data, setData] = useState([]);
  const [product, setProduct] = useState({
    action: "get_ids",
    params: { offset: 0, limit: pagetotal },
  });

  useEffect(() => {
    // получаем массив id
    const sendProductid = async () => {
      setIsloading(true);
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: headersOptions,
          body: JSON.stringify(product),
        });

        const dataid = await response.json();
        setData(dataid);
        setPagetotal(dataid.result.length);
        setCarrentpage(0);
      } catch (error) {
        setIsloading(false);
        console.error("Ошибка при отправке запроса получение id:", error);
      }
    };

    sendProductid();
  }, [product]);

  useEffect(() => {
    const sendRequest = async () => {
      setIsloading(true);
      try {
        // создаем массив запроса отталкиваясь от пагинации
        const pageArray = [];
        for (let i = carrentPage; i <= carrentPage + pagesize; i++) {
          pageArray.push(data.result[i]);
        }
        // запрос
        const reqOption = await fetch(url, {
          method: "POST",
          headers: headersOptions,
          body: JSON.stringify({
            action: "get_items",
            params: { ids: pageArray },
          }),
        });
        const element = await reqOption.json();
        setCard(element);
        setIsloading(false);
      } catch (error) {
        setIsloading(false);
        console.error("Ошибка при отправке запроса получение товара:", error);
      }
    };

    sendRequest();
  }, [data, carrentPage, pagesize]);

  return (
    <>
      <div>
        <Hader />
        <Pagination
          className="pagination"
          defaultCurrent={carrentPage + 1}
          onChange={(page, size) => {
            setCarrentpage(page - 1);
            setPagesize(size);
          }}
          total={pagetotal}
          defaultPageSize={pagesize}
        />
        <div className="home">
          <Filetr setProduct={setProduct} />
          <Card card={card} isLoading={isLoading} />
        </div>
      </div>
    </>
  );
};
export default Home;
