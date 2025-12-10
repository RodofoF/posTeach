const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // O token deve ser enviado como "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verifica o token
    req.user = decoded; // Adiciona os dados do usuário ao objeto req
    next(); // Chama o próximo middleware ou controlador
  } catch (error) {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authenticateToken;