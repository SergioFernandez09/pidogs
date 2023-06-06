import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { validateForm } from './validations'
import './FormPage.css'; // Importa el archivo de estilos CSS para el formulario

const FormPage = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    altura: '',
    peso: '',
    aniosVida: '',
    temperamentos: [],
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    // Limpia el error correspondiente al campo modificado
    setErrors((prevState) => ({
      ...prevState,
      [name]: '',
    }));
  };

  const handleTemperamentoChange = (event) => {
    const { value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      temperamentos: [...prevState.temperamentos, value],
    }));
  };

  const [temperaments, setTemperaments] = useState([]);

  useEffect(() => {
    fetchTemperaments();
  }, []);

  const fetchTemperaments = async () => {
    try {
      const response = await axios.get('http://localhost:3001/temperaments');
      setTemperaments(response.data);
    } catch (error) {
      console.error('Error al obtener los temperamentos:', error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validar los campos antes de enviar la solicitud
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/dogs', formData);
      setSuccessMessage(response.data.message);
      // Reiniciar el formulario después de un envío exitoso
      setFormData({
        nombre: '',
        altura: '',
        peso: '',
        aniosVida: '',
        temperamentos: [],
      });
      setErrors({});
    } catch (error) {
      console.error('Error al crear el perro:', error);
      // Manejar errores del servidor
      if (error.response && error.response.data && error.response.data.message) {
        setErrors({ server: error.response.data.message });
      } else {
        setErrors({ server: 'Error al crear el perro.' });
      }
    }
  };

 

  return (
    <div className="form-container">
      <h1 className="form-title">Formulario de Creación de Raza de Perro</h1>
      {successMessage && <div>{successMessage}</div>}
      {errors.server && <div>{errors.server}</div>}
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nombre" className="form-label">Nombre:</label>
          <input type="text" id="nombre" name="nombre" value={formData.nombre} onChange={handleChange} className="form-input" />
          {errors.nombre && <div className="error-message">{errors.nombre}</div>}
        </div>
        <div className="row">
          <div className="form-group">
            <label htmlFor="altura" className="form-label">Altura:</label>
            <input type="number" id="altura" name="altura" value={formData.altura} onChange={handleChange} className="form-input" />
            {errors.altura && <div className="error-message">{errors.altura}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="peso" className="form-label">Peso:</label>
            <input type="number" id="peso" name="peso" value={formData.peso} onChange={handleChange} className="form-input" />
            {errors.peso && <div className="error-message">{errors.peso}</div>}
          </div>
          <div className="form-group">
            <label htmlFor="aniosVida" className="form-label">Años de Vida:</label>
            <input type="number" id="aniosVida" name="aniosVida" value={formData.aniosVida} onChange={handleChange} className="form-input" />
            {errors.aniosVida && <div className="error-message">{errors.aniosVida}</div>}
          </div>
        </div>
        <div>
          <label htmlFor="temperamentos" className="form-label">Temperamentos:</label>
          <select id="temperamentos" name="temperamentos" onChange={handleTemperamentoChange} className="form-input">
            <option value="">Seleccione un temperamento</option>
            {temperaments.map((temperamento) => (
              <option value={temperamento.nombre} key={temperamento.id}>
                {temperamento.nombre}
              </option>
            ))}
          </select>
          {errors.temperamentos && <div className="error-message">{errors.temperamentos}</div>}
        </div>
        <div className="selected-temperamentos">
          <h3>Temperamentos Seleccionados:</h3>
          <ul>
            {formData.temperamentos.map((temperamento, index) => (
              <li key={index}>{temperamento}</li>
            ))}
          </ul>
        </div>
        <button type="submit" disabled={Object.keys(errors).length === 0} className="submit-button">
          Crear Nueva Raza
        </button>
      </form>
    </div>
  );
  
};

export default FormPage;

