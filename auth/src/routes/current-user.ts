import express from "express";
import { currentUser } from "@rktickets555/common";

const router = express.Router();

// declare global {
//   namespace Express {
//     interface Request {
//       currentUser?: currentUser;
//     }
//   }
// }

router.get("/api/users/currentuser", currentUser, (req, res) => {
  //console.log(req.currentUser);
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };
