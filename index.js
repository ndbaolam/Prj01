const express = require("express");
const dotenv = require("dotenv");
const database = require("./config/database");
const systemConfig = require("./config/system");
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const flash = require('express-flash'); 
const cookieParser = require('cookie-parser');
const session = require('express-session');

dotenv.config();

database.connect();

const routesClient = require("./routes/client/index.route.js");
const routesAdmin = require("./routes/admin/index.route.js");

const app = express();
const port = process.env.PORT;

app.set("views", "./views");
app.set("view engine", "pug");
app.use(methodOverride('_method'))
app.use(express.static("public"));

//flash
app.use(cookieParser('BaoLamIuMinhAnh'));
app.use(session({ cookie: { maxAge: 60000 }}));
app.use(flash());
//End flash

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//App global variable
app.locals.prefixAdmin = systemConfig.prefixAdmin;

routesClient(app);
routesAdmin(app);

app.listen(port, () => {
    console.log(`App listening on prot ${port}`);
});