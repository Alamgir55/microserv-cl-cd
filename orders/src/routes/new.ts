import mongoose from "mongoose";
import express, { Request, Response } from "express";
import { requireAuth, vaildateRequest } from "@rktickets555/common";
import { body } from "express-validator";

const router = express.Router();

router.post(
  "/api/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .custom((input: string) => mongoose.Types.ObjectId.isValid(input))
      .withMessage("TicketId must be provided"),
  ],
  vaildateRequest,
  async (req: Request, res: Response) => {
    res.send({});
  }
);

export { router as newOrderRouter };
