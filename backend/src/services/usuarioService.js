const Usuario = require("../models/usuarioModel");
const globalService = require("./globalService");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getAllUsuarios(options = {}) {
    const usuarios = await globalService.getDocuments(Usuario, options);
    return usuarios;
}

async function getUsuarioById(id) {
    return await globalService.getDocument(Usuario, { _id: id });
}

async function getUsuarioByEmail(mail) {
    return await globalService.getDocument(Usuario, { mail: mail });
}

async function validatePassword(password, usuario) {
    return await bcrypt.compare(password, usuario.passwordHash);
}

function generateToken(usuario) {
    const payload = {
        id: usuario._id,
        email: usuario.mail,
        rol: usuario.rol
    }

    return jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
}

async function createUsuario(data){
    const {mail, password, username, rol, url_profile_photo} = data;

    if (!mail || !password || !username || !rol) {
        throw new Error("Faltan campos obligatorios...");
    }

    const saltRounds = 12;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    const userData = {
        mail,
        passwordHash,
        username,
        rol,
    };

    if (url_profile_photo !== undefined) userData.url_profile_photo = url_profile_photo;

    const nuevoUsuario = await Usuario.create(userData);
    return nuevoUsuario;
}

async function updateUsuario(id, data){
    return await globalService.update(Usuario, id, data);
}

async function deleteUsuario(id, options = {}) {
    return await Usuario.delete({ _id: id }, options);
}

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    getUsuarioByEmail,
    validatePassword,
    generateToken,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};