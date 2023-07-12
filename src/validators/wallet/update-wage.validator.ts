import { check } from "express-validator";

export const updateWageValidations = [
  check("wage")
    .notEmpty()
    .withMessage("Wage is required")
    .isNumeric()
    .withMessage("Wage must be a number"),
];
