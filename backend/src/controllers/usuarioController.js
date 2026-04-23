const usuarioService = require("../services/usuarioService");

async function getAll(req, res) {
  try {
    const options = {
      limit: req.query.limit,
      cursor: req.query.cursor
    };
    const usuarios = await usuarioService.getAllUsuarios(options);
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function getById(req, res) {
  const id = req.params.id;
  try {
    const usuarios = await usuarioService.getUsuarioById(id);
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

async function getByEmail(req, res) {
  const mail = req.params.mail;
  try {
    const usuarios = await usuarioService.getUsuarioByEmail(mail);
    res.json(usuarios);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { mail, password } = req.body;

    const usuario = await usuarioService.getUsuarioByEmail(mail);
    if (!usuario) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await usuarioService.validatePassword(password, usuario);
    if (!isMatch) {
      return res.status(400).json({ error: "Contrasena incorrecta" });
    }

    const token = usuarioService.generateToken(usuario);

    res.json({
      message: "Login exitoso",
      token,
      usuario: {
        id: usuario._id,
        nombre: usuario.username,
        mail: usuario.mail,
        rol: usuario.rol,
      },
    });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ error: "Error en el servidor" });
  }
};

async function createUsuario(req,res) {
  try {
      const usuario = await usuarioService.createUsuario(req.body);
      res.status(201).json(usuario);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
}

async function updateUsuario(req,res){
  const usuarioActualizado = await usuarioService.updateUsuario(req.params.id, req.body);
  res.status(201).json(usuarioActualizado);
}

async function softDelete(req, res) {
  try {
    const id = req.params.id;
    const result = await usuarioService.deleteUsuario(id);

    if (result.usuarios === 0) {
        return res.status(404).json({ message: "Usuario no encontrado o ya eliminado." });
    }

    res.status(200).json({
        message: "Usuario eliminado logicamente.",
        report: result
    });
  } catch (err) {
    console.error("Error en softDelete:", err);
    res.status(500).json({ error: "Error interno al eliminar el usuario." });
  }
}

module.exports = {
    getAll,
    getById,
    getByEmail,
    login,
    createUsuario,
    updateUsuario,
    softDelete,
};