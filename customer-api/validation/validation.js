import { cities, companies } from "../data/data.js";

export const validateCustomerData = (customer) => {
  const { id, first_name, last_name, city, company } = customer;

  if (!id || !first_name || !last_name || !city || !company) {
    return { valid: false, error: "All fields are required" };
  }

  if (!cities.includes(city)) {
    return { valid: false, error: "City does not exist" };
  }

  if (!companies.includes(company)) {
    return { valid: false, error: "Company does not exist" };
  }

  return { valid: true };
};