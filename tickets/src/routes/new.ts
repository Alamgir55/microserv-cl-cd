import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth, vaildateRequest } from "@rktickets555/common";
import { Ticket } from "../models/ticket";
import { TicketCreatedPublisher } from "../events/publishers/ticket-created-publisher";
import { natsWrapper } from "../nats-wrapper";

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

    // const ok = await new TicketCreatedPublisher();
    // //@ts-ignore
    // ok(natsWrapper.client).publish({
    //   id: ticket.id,
    //   title: ticket.title,
    //   price: ticket.price,
    //   userId: ticket.userId,
    // });
    //const client = natsWrapper.client;
    //--log-error

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });
    // console.log(new Publisher());

    // const tl = await new Publisher(natsWrapper.client).publish();
    // console.log(tl);

    res.status(201).send(ticket);
  }
);

export { router as createTicketRouter };
