const mongoose = require("mongoose");
const Reserva = require("./reserva");
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");
const saltRounds = 10;
let Schema = mongoose.Schema;

let validateEmail = function (email) {
  let re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};

let usuarioSchema = new Schema({
  nombre: {
    type: String,
    trim: true,
    required: [true, "El nombre es obligatorio"],
  },
  email: {
    type: String,
    trim: true,
    required: [true, "El email es obligatorio"],
    lowercase: true,
    validate: [validateEmail, "Por favor, ingrese un email válido"],
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      "Por favor, ingrese un email válido",
    ],
  },
  password: {
    type: String,
    required: [true, "El password es obligatorio"],
  },
  passwordResetToken: String,
  passwordResetTokenExpires: Date,
  verificado: {
    type: Boolean,
    default: false,
  },
});

usuarioSchema.methods.reservar = function (biciId, desde, hasta, cb) {
  let reserva = new Reserva({
    usuario: this._id,
    bicicleta: biciId,
    desde: desde,
    hasta: hasta,
  });
  //console.log(reserva)
  reserva.save(cb);
};

usuarioSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.password = bycrypt.hashSync(this.password, saltRounds);
  }
  next();
});

usuarioSchema.methods.validPassword = function (password) {
  return bycrypt.compare(password, this.password);
};

usuarioSchema.plugin(uniqueValidator, {
  message: "El {PATH} ya existe con otro usuario.",
});

module.exports = mongoose.model("Usuario", usuarioSchema);
