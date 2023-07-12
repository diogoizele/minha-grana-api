/* eslint-disable no-unused-vars */
import { Request } from "express";

import { Account } from "../models";

declare global {
  namespace Express {
    interface Request {
      data: {
        account: Account;
        payload: any;
      };
    }
  }
}
