import React, { useContext, useState } from "react";
import { Cart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import ItemCount from "./ItemCount";
import styles from "../styles/itemDetail.module.scss";

const ItemDetail = ({ product }) => {
  const { addCart } = useContext(Cart);
  const [selectedOption, setSelectedOption] = useState(""); // Marca o tamaño
  const [quantity, setQuantity] = useState(1);
  const [basePrice, setBasePrice] = useState(product.basePrice);
  const navigate = useNavigate(); // Hook para redirigir

  const handleSizeChange = (size) => {
    setSelectedOption(size);
    const newPrice = calculateMirrorPrice(size);
    setBasePrice(newPrice);
  };

  const handleBrandChange = (brand) => {
    setSelectedOption(brand);
    const newPrice = calculateCasePrice(brand);
    setBasePrice(newPrice);
  };

  const calculateMirrorPrice = (size) => {
    const sizeCost = { chico: 50, mediano: 70, grande: 100 }[size] || 0;
    return product.basePrice + sizeCost;
  };

  const calculateCasePrice = (brand) => {
    const brandCost =
      { samsung: 45, huawei: 55, xiaomi: 55, iphone: 50, motorola: 40 }[
        brand
      ] || 0;
    return product.basePrice + brandCost;
  };

  const handleAddToCart = () => {
    if (!selectedOption) {
      Swal.fire({
        title: "Error",
        text: "Por favor, selecciona un tamaño o marca válida.",
        icon: "error",
        position: "center",
        confirmButtonText: "Aceptar",
        timer: 5000,
      });
      return;
    }

    const productToAdd = {
      id: product.id,
      tipoProducto: product.tipoDeProducto,
      modelo: selectedOption,
      unidades: quantity,
      costoTotal: basePrice * quantity,
      diseño: product.tipoDeDiseño,
      image: product.pictureUrl,
    };

    addCart(productToAdd, quantity);

    Swal.fire({
      title: "¡Producto agregado al carrito!",
      icon: "success",
      position: "center",
      confirmButtonText: "Aceptar",
      timer: 2000,
    }).then(() => {
      navigate("/cart"); // Redirigir al carrito después de mostrar la alerta
    });
  };

  return (
    <div className={styles.container}>
      <h1>Detalle del Producto</h1>
      <img
        src={product.pictureUrl}
        alt={product.tipoDeDiseño}
        style={{ width: 300 }}
      />
      <h2>{product.tipoDeDiseño}</h2>
      <h3>Precio total: ${basePrice * quantity}</h3>
      <p>Precio unitario: ${basePrice}</p>
      <span>{product.description}</span>

      {product.tipoDeProducto === "funda" ? (
        <div>
          <label htmlFor="brand">Elige tu marca:</label>
          <select
            id="brand"
            value={selectedOption}
            onChange={(e) => handleBrandChange(e.target.value)}
          >
            <option value="">Elige tu marca</option>
            <option value="samsung">Samsung</option>
            <option value="huawei">Huawei</option>
            <option value="xiaomi">Xiaomi</option>
            <option value="iphone">iPhone</option>
            <option value="motorola">Motorola</option>
          </select>
        </div>
      ) : (
        <div>
          <label htmlFor="size">Elige tu tamaño:</label>
          <select
            id="size"
            value={selectedOption}
            onChange={(e) => handleSizeChange(e.target.value)}
          >
            <option value="">Elige tu tamaño</option>
            <option value="chico">Chico</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
      )}

      <ItemCount initial={quantity} onQuantityChange={setQuantity} />

      <button onClick={handleAddToCart} disabled={!selectedOption}>
        Add to cart
      </button>
    </div>
  );
};

export default ItemDetail;
