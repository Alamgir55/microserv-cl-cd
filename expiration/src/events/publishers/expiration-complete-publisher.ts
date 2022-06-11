import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from "@rktickets555/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}
