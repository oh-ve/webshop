import "./App.css";
import { Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ItemList from "./Components/ItemList";
import ItemDetail from "./Components/ItemDetail";

export default function App() {
  const url = "http://localhost:8080/items";

  const [itemList, setItemList] = useState([]);

  const getItems = () => {
    axios.get(url).then((res) => {
      console.log(res);
      setItemList(res.data);
    });
  };

  useEffect(() => {
    getItems();
  }, []);

  console.log(itemList);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<ItemList itemList={itemList} />} />
        <Route path="/:id" element={<ItemDetail itemList={itemList} />} />
      </Routes>
    </div>
  );
}
