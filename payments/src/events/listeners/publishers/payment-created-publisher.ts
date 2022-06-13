import { Subjects, PaymentCreatedEvent, Publisher } from "@rktickets555/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}
