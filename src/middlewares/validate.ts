import { NextFunction, Request, Response } from "express";
import {
  FieldValidationError,
  ValidationChain,
  validationResult,
} from "express-validator";

import {
  loginAccountValidations,
  registerAccountValidations,
} from "../validators/account";

const validations: Record<string, ValidationChain[]> = {
  "POST /api/accounts": registerAccountValidations,
  "POST /api/accounts/login": loginAccountValidations,
};

export async function validate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const validation = validations[`${req.method} ${req.path}`];

  if (!validation) return next();

  await Promise.all(validation.map((validation) => validation.run(req)));

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
