import React, { useEffect, useState } from "react";
import ItemList from "./ItemList";
import { useParams } from "react-router-dom";
import { db } from "../firebase/config";
import { collection, query, where, getDocs } from "firebase/firestore";
import styles from "../styles/itemListContainer.module.scss";

const ItemListContainer = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 3; // Número de elementos por página
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
            productsFiltered.push({ id: doc.id, ...doc.data() });
          });
        } else {
          const querySnapshot = await getDocs(collection(db, "products"));
          querySnapshot.forEach((doc) => {
            productsFiltered.push({ id: doc.id, ...doc.data() });
          });
        }
        setProducts(productsFiltered);
      } catch (error) {
        console.log(error);
      }
    })();
  }, [categoryId]);

  // Calcular el índice de los productos a mostrar
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const handleNext = () => {
    if (endIndex < products.length) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <div className={styles.container}>
      <h2>Nuestros productos</h2>
      <div className={styles.navigation}>
        <button
          className={styles.button}
          onClick={handlePrev}
          disabled={currentPage === 0}
        >
          &lt;
        </button>
        <div className={styles.itemList}>
          <ItemList products={currentItems} />
        </div>
        <div className={styles.button - styles.container}>
          <button
            className={styles.button}
            onClick={handleNext}
            disabled={endIndex >= products.length}
          >
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default ItemListContainer;
