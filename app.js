//  REQUIRE mira todo lo que hay en la carpeta node_modules
const express = require("express");
require("dotenv").config();
const path = require("path");
const fileupload = require("express-fileupload");
const hbs = require("hbs");
const session = require("express-session");
const PORT = 3005;

const routeIndex = require("./routes/index");
const routeLogin = require("./routes/login");
const routeSecret = require("./routes/secret");
const routeFormRegister = require("./routes/formRegister");
const routeTableProduct = require("./routes/tableProducts");
const app = express();

app.use(fileupload({
    useTempFiles: true,
    tempFileDir: "/tmp",
}));

app.use(session({
    secret: "happy cat",
    resave: false,
    saveUninitialized: true
}));

const private = async (req, res, next) => {
    if (req.session.user) {
        app.locals.user = req.session.user;
        next();
    } else {
        const message = "Debe ingresar primero";
        res.render("login", {
            message
        });
    }
};

const isAuth = (req, res, next) => {
    app.locals.user = req.session.user;
    next();
};

app.use(express.static(path.join(__dirname, "./public")));
app.use(express.urlencoded({
    extended: false
}));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "./views/partials"));
app.use("/", isAuth, routeIndex);
app.use("/login", routeLogin);
app.use("/secret", private, routeSecret);
app.use("/formRegister", routeFormRegister);
app.use("/tableProducts", routeTableProduct);

app.get("*", (req, res) => {
    res.render("index");
});

app.listen(PORT, (err) => {
    err ? console.log("no funciona") : console.log(`Servidor corriendo en https://localhost:${PORT}/`);

});