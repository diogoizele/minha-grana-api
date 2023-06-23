import express from "express";

import ItemController from "../controllers/item.controller";

const router = express.Router();

router.get("/items", ItemController.listItems);

export default router;
