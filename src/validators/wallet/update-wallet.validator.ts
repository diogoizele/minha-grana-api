import { check } from "express-validator";

export const updateWalletValidations = [
  check("wage")
    .notEmpty()
    .withMessage("Wage is required")
    .isNumeric()
    .withMessage("Wage must be a number"),
  check("saved")
    .notEmpty()
    .withMessage("Saved is required")
    .isNumeric()
    .withMessage("Saved must be a number"),
  check("cashValue")
    .notEmpty()
    .withMessage("CashValue is required")
    .isNumeric()
    .withMessage("CashValue must be a number"),
  check("paymentDate")
    .notEmpty()
    .withMessage("PaymentDate is required")
    .isNumeric()
    .withMessage(
      "PaymentDate must be a number, representing the day of the month",
    ),
  check("lastUpdatePaymentDate")
    .optional()
    .isDate()
    .withMessage("LastUpdatePaymentDate must be a date"),
];
