import React,{ useEffect, useState } from "react";
import ProductBox from "./ProductBox";
import UserDataService from "../api/UserDataService";
import black from "../images/Toffer2.png";
import green from "../images/Toffer1.png";
import puerh from "../images/Toffer3.jpg";
import {oolang,white,purple} from "../images/collectionTea.js"

const teaPic=[
  black,
  green,
  oolang,
  white,
  purple,
  puerh
];

const Products = () => {
  const [collection, setCollection] = useState([]);
  
  useEffect(() => {
    let mounted = true;
    UserDataService.getCollection()
    .then(data => {
      if (mounted) {
         setCollection([...data])
      }
    })
    return () => mounted = false;
  }, []);

  return (
    <div>
      <div id="products">
        <h1>Tea Collections</h1>
        <p>Buy now to improve your immunity with a flavorful twist!</p>
        <div className="a-container">
          {collection.map((name,index) => <ProductBox key={index} name={name} image={teaPic[index]} />)}
        </div>
      </div>
    </div>
  );
};

export default Products;
