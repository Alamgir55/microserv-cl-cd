//import { Publisher, Subjects, TicketCreatedEvent } from "@rktickets555/common";

import { Publisher, TicketCreatedEvent, Subjects } from "@rktickets555/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
