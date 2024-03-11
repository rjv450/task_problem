import customers from "../data/data.js";
import { validationResult } from "express-validator";
import { validateCustomerData } from "../validation/validation.js";
export const listCustomers = (req, res) => {
  const { page = 1, pageSize = 10, first_name, last_name, city } = req.query;

  let filteredCustomers = customers;
  if (first_name) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.first_name.toLowerCase().includes(first_name.toLowerCase())
    );
  }
  if (last_name) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.last_name.toLowerCase().includes(last_name.toLowerCase())
    );
  }
  if (city) {
    filteredCustomers = filteredCustomers.filter((customer) =>
      customer.city.toLowerCase().includes(city.toLowerCase())
    );
  }

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + parseInt(pageSize);

  const paginatedCustomers = filteredCustomers.slice(startIndex, endIndex);

  res.json({
    totalCustomers: filteredCustomers.length,
    totalPages: Math.ceil(filteredCustomers.length / pageSize),
    currentPage: parseInt(page),
    pageSize: parseInt(pageSize),
    data: paginatedCustomers,
  });
};
export const getCustomerById = (req, res) => {
  const customerId = parseInt(req.params.id);
  const customer = customers.find((customer) => customer.id === customerId);

  if (!customer) {
    return res.status(404).json({ error: "Customer not found" });
  }

  res.json(customer);
};
export const listCitiesWithCustomerCount = (req, res) => {
  const cityCounts = {};

  customers.forEach((customer) => {
    const city = customer.city;

    if (!cityCounts[city]) {
      cityCounts[city] = 1;
    } else {
      cityCounts[city]++;
    }
  });

  res.json({ cityCounts });
};
export const addCustomer = (req, res) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const newCustomer = req.body;

  const validation = validateCustomerData(newCustomer);

  if (!validation.valid) {
    return res.status(400).json({ error: validation.error });
  }

  customers.push(newCustomer);
  res.status(201).json(newCustomer);
};

export default { listCustomers, getCustomerById, listCitiesWithCustomerCount };
