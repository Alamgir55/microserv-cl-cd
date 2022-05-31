import { Publisher, TicketUpdatedEvent, Subjects } from "@rktickets555/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
