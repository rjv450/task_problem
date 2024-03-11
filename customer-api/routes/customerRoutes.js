import express from "express";
import { body } from "express-validator";
import {
  listCustomers,
  getCustomerById,
  listCitiesWithCustomerCount,
  addCustomer,
} from "../controllers/customerControllers.js";

const router = express.Router();

router.get("/customers", listCustomers);
router.get("/customers/:id", getCustomerById);
router.get("/cities", listCitiesWithCustomerCount);

router.post(
  "/customers",
  [
    body("id").isInt(),
    body("first_name").notEmpty(),
    body("last_name").notEmpty(),
    body("city").notEmpty(),
    body("company").notEmpty(),
  ],
  addCustomer
);

export default router;
