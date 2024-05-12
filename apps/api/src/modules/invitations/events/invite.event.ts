import { InvitationType } from "@prisma/client";

export class InvitationCreatedEvent {
  email!: string;
  type!: InvitationType
  code?: string;

  constructor(payload: InvitationCreatedEvent) {
    Object.assign(this, payload);
  }
}
