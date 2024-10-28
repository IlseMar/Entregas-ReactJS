import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import mockProducts from "../assets/mokckData.json";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  const { categoryId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        let productsFiltered = [];

        if (categoryId) {
          const q = query(
            collection(db, "products"),
            where("category", "==", categoryId)
          );

          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
            productsFiltered.push({ id: doc.id, ...doc.data() });
          });
        } else {
          const querySnapshot = await getDocs(collection(db, "products"));
          querySnapshot.forEach((doc) => {
            console.log(`${doc.id} => ${doc.data()}`);
            productsFiltered.push({ id: doc.id, ...doc.data() });
          });
        }
        setProducts(productsFiltered);
      } catch (error) {
        console.log(error);
      }
    })();

    //   const promise1 = new Promise((res, rej) => {
    //     setTimeout(() => {
    //       res(mockProducts);
    //     }, 2000);
    //   });

    //   try {
    //     const getProducts = async () => {
    //       setLoading(true);
    //       const products = await promise1;
    //       let productsFiltered;
    //       if (categoryId) {
    //         productsFiltered = products.filter(
    //           (product) => product.category === categoryId
    //         );
    //       } else {
    //         productsFiltered = products;
    //       }
    //       setProducts(productsFiltered);
    //       setLoading(false);
    //     };

    //     getProducts();
    //   } catch (error) {}
    // }, [categoryId]);

    // useEffect(() => {
    //   console.log("Este side effect se ejecuta en el montaje del componente");

    //   return () => {
    //     console.log("Aca se va a desmontar el componente!");
    //   };
  }, [categoryId]);

  // console.log(products);

  return <ItemList products={products} />;
};

export default ItemListContainer;
