import { Request, Response } from "express";
import { listItems } from "../services/item";

class ItemController {
  async listItems(req: Request, res: Response) {
    try {
      const items = await listItems(req);

      return res.status(200).json(items);
    } catch (error) {
      return res
        .status(400)
        .json({ message: `Failed to list items. ${error}` });
    }
  }
}

export default new ItemController();
