const mongoose = require("mongoose");
const { runCascadeDelete } = require('../services/deleteService');

const usuarioSchema = new mongoose.Schema(
  {
    mail: { type: String, required: true, unique: true, trim: true},
    passwordHash: { type: String, required: true, default: "#FFFFFF" },
    username: {type: String, required: true, trim: true},
    rol: { type: String, enum: ["admin", "user"], default: "user" },
    url_profile_photo: { type: String, default: "" },
    isDeleted : { type: Boolean, default: false },
  },
  { timestamps: true }
);

usuarioSchema.statics.delete = async function(query) {
    return runCascadeDelete(this, query, {
        cascade: [],
        effects: []
    });
}

module.exports = mongoose.model("Usuario", usuarioSchema);