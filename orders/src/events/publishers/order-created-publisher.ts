import { Publisher, OrderCreatedEvent, Subjects } from "@rktickets555/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  readonly subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
