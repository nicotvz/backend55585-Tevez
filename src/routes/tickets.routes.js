import { Router } from "express";
import { verifyRole } from "../middlewares/auth.js";
import {
  getTickets,
  getTicketById,
  getTicketsByEmail,
  sendTicketEmail,
} from "../controllers/tickets.controller.js";

const ticketsRouter = Router();
ticketsRouter.get(
  "/",
  (req, res, next) => verifyRole(req, res, next, "admin"),
  getTickets
);
ticketsRouter.get("/:tid", getTicketById);
ticketsRouter.get(
  "/orders/:email",
  (req, res, next) => verifyRole(req, res, next, "user"),
  getTicketsByEmail
);
ticketsRouter.post(
  "/mail",
  (req, res, next) => verifyRole(req, res, next, "user"),
  sendTicketEmail
);

export default ticketsRouter;
