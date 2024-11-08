import React, { useState } from "react";
import Swal from "sweetalert2";
import styles from "../styles/checkoutForm.module.scss";

const CheckoutForm = ({ onFormSubmit }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && email && paymentMethod) {
      onFormSubmit({ name, email, paymentMethod });
    } else {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos.",
        icon: "warning",
        confirmButtonText: "Aceptar",
        timer: 3000,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.checkoutForm}>
      <h2>Formulario de Compra</h2>

      <div className={styles.formGroup}>
        <label>Nombre:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
      </div>

      <div className={styles.formGroup}>
        <label>Método de Pago:</label>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          required
          className={styles.select}
        >
          <option value="">Seleccione</option>
          <option value="contraentrega">Contraentrega</option>
        </select>
      </div>

      <button type="submit" className={styles.submitButton}>
        Confirmar datos
      </button>
    </form>
  );
};

export default CheckoutForm;
