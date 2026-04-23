const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Acceso denegado. Token no proporcionado.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token invalido o expirado.' });
    }

    req.user = user;
    next();
  });
};

const isAdmin = (req, res, next) => {
  if (req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Se requieren permisos de administrador.' });
  }

  next();
};

const isSelf = (req, res, next) => {
  if (req.user.id !== req.params.id && req.user.rol !== 'admin') {
    return res.status(403).json({ error: 'Acceso denegado. Solo el usuario editado o un administrador pueden realizar esta accion' });
  }
  next();
};

module.exports = {
    authenticateToken,
    isAdmin,
    isSelf,
};