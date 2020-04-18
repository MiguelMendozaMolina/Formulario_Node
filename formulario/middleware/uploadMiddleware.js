const multer = require("multer"); /* necesario para poder procesar el archivo */
const extension = require("../classes/Mimetypes") /* clase para la verificacion de la extension */

var path = require("path"); /* no necesita instalacion ya viene incluido, es necesario para poder acceder a los archivos del sistema*/

/* Opciones para almacenamiento del archivo, 
   tambien se agrego una sintaxis de nombre para el archivo almacenado */
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../", "public/done"));
  },
  filename: function (req, file, cb) {
    const ext = new extension();
    cb(
      null,
      file.fieldname + "-" + Date.now() + ext.getExtension(file.mimetype)
    );
  },
});

/* condiciones por medio de multer || limite || destino */

const upload = multer({
  limits: {
    fileSize: 4 * 1024 * 1024
  },
  dest: path.join(__dirname, "../", "public"),
  storage: storage
});

module.exports = upload; /* exportacion del modulo */