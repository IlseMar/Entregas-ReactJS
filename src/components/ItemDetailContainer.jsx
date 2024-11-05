import React, { useEffect, useState } from "react";
import ItemDetail from "./ItemDetail";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";
import styles from "../styles/itemDetaileContainer.module.scss";

const ItemDetailContainer = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ ...docSnap.data(), id });
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    // Llamamos a la función para obtener el producto
    fetchProduct();

    // Temporizador de 3 segundos para asegurar que el loading se muestre
    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 1500);

    // Limpiamos el temporizador al desmontar el componente
    return () => clearTimeout(loadingTimeout);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        <p>Cargando producto...</p>
      </div>
    );
  }

  return product ? (
    <ItemDetail product={product} />
  ) : (
    <p>Producto no encontrado</p>
  );
};

export default ItemDetailContainer;

// import React, { useEffect, useState } from "react";
// import ItemDetail from "./ItemDetail";
// import { useParams } from "react-router-dom";
// import { doc, getDoc } from "firebase/firestore";
// import { db } from "../firebase/config";
// import styles from "../styles/itemDetaileContainer.module.scss";

// const ItemDetailContainer = () => {
//   const [product, setProduct] = useState(null);
//   const [loading, setLoading] = useState(true); // Estado de carga
//   const { id } = useParams();

//   useEffect(() => {
//     (async () => {
//       try {
//         const docRef = doc(db, "products", id);
//         const docSnap = await getDoc(docRef);

//         if (docSnap.exists()) {
//           console.log("Document data:", docSnap.data());
//           setProduct({ ...docSnap.data(), id });
//         } else {
//           console.log("No such document!");
//         }
//       } catch (error) {
//       } finally {
//         setLoading(false); // Finaliza el estado de carga, ya sea éxito o error
//       }
//     })();
//   }, [id]);

//   if (loading) {
//     return (
//       <div className={styles.loading}>
//         <div className={styles.spinner}></div>
//         <p>Cargando producto...</p>
//       </div>
//     );
//   }

//   return product ? (
//     <ItemDetail product={product} />
//   ) : (
//     <p>Producto no encontrado</p>
//   );
// };

// export default ItemDetailContainer;
