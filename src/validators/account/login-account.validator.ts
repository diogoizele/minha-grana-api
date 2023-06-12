import { NextFunction, Request, Response } from "express";
import {
  FieldValidationError,
  check,
  validationResult,
} from "express-validator";

const validations = [
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Email format is invalid"),

  check("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
];

export async function loginAccountValidator(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  await Promise.all(validations.map((validation) => validation.run(req)));

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const formattedErrors = errors.array().map((error) => ({
      field: (error as FieldValidationError).path,
      message: error.msg,
    }));

    return res.status(400).json({ errors: formattedErrors });
  }

  return next();
}
