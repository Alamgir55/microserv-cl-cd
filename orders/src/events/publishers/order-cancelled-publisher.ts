import { Publisher, OrderCancelledEvent, Subjects } from "@rktickets555/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  readonly subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
