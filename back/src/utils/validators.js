/**
 * Valida se uma string é um endereço de e-mail válido.
 * @param {string} email O email a ser validado.
 * @returns {boolean} Retorna true se o email for válido, caso contrário false.
 */
const validarEmail = (email) => {
  if (!email) return false; // Garante que strings vazias, nulas ou undefined falhem.
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(String(email));
};

module.exports = { validarEmail };