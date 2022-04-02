import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "@rktickets555/common";
import { vaildateRequest } from "@rktickets555/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.post(
  "/api/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is requried"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  vaildateRequest,
  async (Request, res: Response) => {
    const { title, price } = Request.body;

    const ticket = Ticket.build({
      title,
      price,
      userId: Request.currentUser!.id,
    });
    //console.log(Request.currentUser);
    await ticket.save();

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
