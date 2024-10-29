import React, { useContext, useState, useEffect } from "react";
import { Cart } from "../context/CartProvider";
import Swal from "sweetalert2";
import ItemCount from "./ItemCount";
import { NavLink } from "react-router-dom";

const ItemDetail = ({ product }) => {
  const { addCart } = useContext(Cart);
  const [selectedOption, setSelectedOption] = useState("marca");
  const [quantity, setQuantity] = useState(1);
  const [price, setPrice] = useState(product.basePrice);
  const [selectedSize, setSelectedSize] = useState(null);

  // Para espejos
  const handleSizeChange = (size) => {
    setSelectedSize(size);
    const newPrice = calculateMirrorPrice(size);
    setPrice(newPrice);
  };

  // Para fundas
  const handleBrandChange = (brand) => {
    const newPrice = calculateCasePrice(brand);
    setPrice(newPrice);
  };

  // Calcular el precio total al cambiar la cantidad
  useEffect(() => {
    if (selectedOption !== "marca") {
      setPrice((prevPrice) => prevPrice * quantity); // Actualizar el precio basado en la cantidad
    }
  }, [quantity, selectedOption]); // Ejecutar cuando la cantidad o el modelo cambien

  const calculateMirrorPrice = (size) => {
    let basePrice = product.basePrice;
    let sizeCost = 0;

    switch (size) {
      case "chico":
        sizeCost = 50;
        break;
      case "mediano":
        sizeCost = 70;
        break;
      case "grande":
        sizeCost = 100;
        break;
      default:
        sizeCost = 0;
    }
    return basePrice + sizeCost;
  };

  const calculateCasePrice = (brand) => {
    let basePrice = product.basePrice; // Asume que tienes un precio base para fundas
    let brandCost = 0;

    switch (brand) {
      case "samsung":
        brandCost = 45;
        break;
      case "huawei":
        brandCost = 55;
        break;
      case "xiaomi":
        brandCost = 55;
        break;
      case "iphone":
        brandCost = 50;
        break;
      case "motorola":
        brandCost = 40;
        break;
      default:
        brandCost = 0;
    }

    return basePrice + brandCost;
  };

  const handleAddToCart = () => {
    if (selectedOption !== "marca" && quantity > 0) {
      const productToAdd = {
        id: product.id,
        tipoProducto: product.tipoDeProducto,
        modelo: selectedOption,
        unidades: quantity,
        costoTotal: price * quantity,
        diseño: product.tipoDeDiseño,
        image: product.pictureUrl,
      };

      addCart(productToAdd, quantity); // Llama a la función de agregar al carrito
      Swal.fire({
        title: "¡Producto agregado al carrito!",
        icon: "success",
        position: "center",
        confirmButtonText: "Aceptar",
        timer: 5000,
      });
    } else {
      Swal.fire({
        title: "Error",
        text: "Por favor, selecciona un tamaño y una cantidad válida.",
        icon: "error",
        position: "center",
        confirmButtonText: "Aceptar",
        timer: 5000,
      });
    }
  };

  return (
    <div>
      <h1>Detalle del Producto</h1>
      <img
        src={product.pictureUrl}
        alt={product.tipoDeDiseño}
        style={{ width: 300 }}
      />
      <h2>{product.tipoDeDiseño}</h2>
      <h3>Precio total: ${price * quantity}</h3>
      <span>{product.description}</span>
      {product.tipoDeProducto === "funda" ? (
        <div>
          <label htmlFor="brand">Elige tu marca:</label>
          <select
            id="brand"
            value={selectedOption}
            onChange={(e) => handleBrandChange(e.target.value)}
          >
            <option value="marca">Elige tu marca</option>
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
            <option value="marca">Elige tu tamaño</option>
            <option value="chico">Chico</option>
            <option value="mediano">Mediano</option>
            <option value="grande">Grande</option>
          </select>
        </div>
      )}
      <ItemCount onQuantityChange={setQuantity} initial={quantity} />{" "}
      <button onClick={handleAddToCart}>
        <NavLink to={"/cart"}>Add to cart</NavLink>
      </button>
    </div>
  );
};

export default ItemDetail;
