import mockProducts from "../assets/mokckData.json";
import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { categoryId } = useParams();

  useEffect(() => {
    const promise1 = new Promise((res, rej) => {
      setTimeout(() => {
        res(mockProducts);
      }, 2000);
    });

    try {
      const getProducts = async () => {
        setLoading(true);
        const products = await promise1;
        let productsFiltered;
        if (categoryId) {
          productsFiltered = products.filter(
            (product) => product.category === categoryId
          );
        } else {
          productsFiltered = products;
        }
        setProducts(productsFiltered);
        setLoading(false);
      };

      getProducts();
    } catch (error) {}
  }, [categoryId]);

  useEffect(() => {
    console.log("Este side effect se ejecuta en el montaje del componente");

    return () => {
      console.log("Aca se va a desmontar el componente!");
    };
  }, []);

  console.log(products);

  return loading ? <h1>Loading.. </h1> : <ItemList products={products} />;
};

export default ItemListContainer;
