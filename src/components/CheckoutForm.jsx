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
    <form onSubmit={handleSubmit} className={styles.form}>
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

// import React, { useState } from "react";
// import Swal from "sweetalert2";
// import styles from "../styles/checkoutForm.module.scss";

// const CheckoutForm = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     paymentMethod: "contraentrega", // Método de pago predeterminado
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const { name, email, paymentMethod } = formData;

//     if (!name || !email) {
//       Swal.fire({
//         title: "Error",
//         text: "Por favor, completa todos los campos",
//         icon: "error",
//         confirmButtonText: "Aceptar",
//       });
//       return;
//     }

//     Swal.fire({
//       title: "¡Formulario enviado!",
//       text: `Gracias, ${name}. Nos pondremos en contacto contigo en ${email}.`,
//       icon: "success",
//       confirmButtonText: "Aceptar",
//     });

//     // Opcional: puedes limpiar el formulario después de enviar
//     setFormData({
//       name: "",
//       email: "",
//       paymentMethod: "contraentrega",
//     });
//   };

//   return (
//     <div className={styles.checkoutForm}>
//       <h2>Datos de Contacto y Pago</h2>
//       <form onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="name">Nombre</label>
//           <input
//             type="text"
//             id="name"
//             name="name"
//             value={formData.name}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="email">Email</label>
//           <input
//             type="email"
//             id="email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//             required
//           />
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="paymentMethod">Método de Pago</label>
//           <select
//             id="paymentMethod"
//             name="paymentMethod"
//             value={formData.paymentMethod}
//             onChange={handleInputChange}
//             disabled // Solo tiene "Contraentrega" como opción
//           >
//             <option value="contraentrega">Contraentrega</option>
//           </select>
//         </div>

//         <button type="submit">Enviar</button>
//       </form>
//     </div>
//   );
// };

// export default CheckoutForm;
