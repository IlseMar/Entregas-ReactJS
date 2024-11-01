import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/config";

const saveJSONToFirebase = async () => {
  try {
    // Leer el carrito desde localStorage y convertirlo de JSON a un objeto JavaScript
    const cart = JSON.parse(localStorage.getItem("cart")) || [];

    // Guardar cada producto del carrito en la colección "products" de Firebase
    for (const product of cart) {
      const docRef = await addDoc(collection(db, "products"), {
        title: product.title,
        price: product.costoTotal, // Asegúrate de que este campo esté en el objeto
        description: product.description || "Descripción no disponible",
        pictureUrl: product.pictureUrl || "URL no disponible",
        stock: product.unidades || 1, // Guarda la cantidad en stock de acuerdo con las unidades en el carrito
        category: product.category || "Sin categoría",
      });
      console.log("Documento guardado con ID: ", docRef.id);
    }
    console.log("Carrito guardado en Firestore exitosamente.");
  } catch (error) {
    console.log("Error al guardar el carrito en Firestore: ", error);
  }
};

export default saveJSONToFirebase;

// import { addDoc, collection } from "firebase/firestore";
// import { db } from "../firebase/config";
// import products from "../assets/mockData.json"; //Colocamos la ruta donde está ubicado el json.

// //NOTA: también se puede hacer algo similar con un bucle dentro de Object.entries (pero ya es nivel un pcoo más avanzado)

// const saveJSONToFirebase = async () => {
//   try {
//     products.forEach(async (product) => {
//       //Adaptar el objeto a las propiedades del producto
//       const docRef = await addDoc(collection(db, "products"), {
//         title: product.title,
//         price: product.price,
//         description: product.description,
//         pictureUrl: product.pictureUrl,
//         stock: product.stock || 10,
//         category: product.category,
//       });
//       console.log("Document written with ID: ", docRef.id);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// };

// export default saveJSONToFirebase;
