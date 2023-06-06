export const validateForm = (formData) => {
    const errors = {};
  
    if (!formData.nombre) {
      errors.nombre = 'El nombre es obligatorio.';
    }
  
    if (!formData.altura) {
      errors.altura = 'La altura es obligatoria.';
    }
  
    if (!formData.peso) {
      errors.peso = 'El peso es obligatorio.';
    }
  
    if (!formData.aniosVida) {
      errors.aniosVida = 'Los años de vida son obligatorios.';
    }
  
    if (formData.alturaMinima && formData.alturaMaxima && formData.alturaMinima > formData.alturaMaxima) {
      errors.alturaMinima = 'La altura mínima no puede ser mayor que la altura máxima.';
      errors.alturaMaxima = 'La altura máxima no puede ser menor que la altura mínima.';
    }
  
    if (formData.pesoMinimo && formData.pesoMaximo && formData.pesoMinimo > formData.pesoMaximo) {
      errors.pesoMinimo = 'El peso mínimo no puede ser mayor que el peso máximo.';
      errors.pesoMaximo = 'El peso máximo no puede ser menor que el peso mínimo.';
    }
  
    if (formData.temperamentos.length === 0) {
      errors.temperamentos = 'Debe seleccionar al menos un temperamento.';
    }
  
    return errors;
  };
  