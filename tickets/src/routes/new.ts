import express, { Request, Response } from "express";
import { body } from "express-validator";
import { requireAuth } from "@rktickets555/common";
import { vaildateRequest } from "@rktickets555/common";

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
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

//module.exports = router;
export { router as createTicketRouter };
