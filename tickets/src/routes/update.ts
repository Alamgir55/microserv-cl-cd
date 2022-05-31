import express, { Request, Response } from "express";
import { body } from "express-validator";
import {
  NotFoundError,
  vaildateRequest,
  requireAuth,
  NotAuthorizedError,
} from "@rktickets555/common";
import { Ticket } from "../models/ticket";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper";

// declare module "express" {
//   export interface Request {
//     currentUser: any;
//   }
// }

// interface IRequest extends express.Request {
//   currentUser: any;
// }

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is requried"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be provided and must be greater than 0"),
  ],
  vaildateRequest,
  async (req: Request, res: Response) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      throw new NotFoundError();
    }
    if (ticket.userId !== (<any>req).currentUser!.id) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: req.body.title,
      price: req.body.price,
    });
    //console.log(Request.currentUser);
    await ticket.save();
    new TicketUpdatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });
    res.send(ticket);

    //res.json((<any>req).currentUser);
    //console.log((<any>req).currentUser);
  }
);

export { router as updateTicketRouter };
