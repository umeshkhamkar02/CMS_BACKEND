import express from "express";
import cors from 'cors';
import path from "path";
import { userrouter } from "./api/routes";
import { user_service } from "./api/services";
import { categoryroute } from "./api/routes/category_route";
import category_service from "./api/services/category_service";
import { productroute } from "./api/routes/product_route";
import product_service from "./api/services/product_service";
import { billrouter } from "./api/routes/bill_route";
import bill_service from "./api/services/bill_service";

const app = express();
const router = express.Router();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

var dir = path.join(__dirname, 'uploads');
app.use(express.static(dir));

app.use('/', router);
userrouter(router, new user_service());
categoryroute(router, new category_service());
productroute(router, new product_service());
billrouter(router, new bill_service());

export default app;
