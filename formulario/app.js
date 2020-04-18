var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);

/* importacion de Middleware || permite la administracion de una imagen */
const upload = require("./middleware/uploadMiddleware");

/* Implementacion de recibo de parametros por medio de POST 
 Se agrega el middleware despues del llamado de confirmación 
 el elemento photo es el mismo nombre que se tiene en el formulario index.pug
 
 datos = datos ingresados
 files = archivo adjunto */

app.post("/confirmacion", upload.single("photo"), (req, res, next) => {
  // res.send("OK");
  res.render("confirmacion", {
    datos: req.body,
    files: req.file
  });

  /* Obtengo la redirección de la vista y los datos del formulario */
  /* Esto nos ayuda a desplegar una plantilla */
  //res.send(req.body); /* esto nos muestra los datos enviados como un JSON
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;