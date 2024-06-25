import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class BaseNotificationCommand {
  abstract commandName: string;

  constructor() {}

  getCommandName() {
    return this.commandName;
  }

  getPayload() {
    const { commandName, ...payload } = this;

    return payload;
  }

  abstract run(): Promise<void>;
}

export class SendTicketMessageCommand extends BaseNotificationCommand {
  commandName = SendTicketMessageCommand.name;
  static eventName = 'message.ticket';

  constructor(
    public readonly data: {
      message: string;
      recipient: string;
      date: string;
    }
  ) {
    super();

    Object.assign(this, this.data);
  }

  async run(): Promise<void> {
    console.log('Run send ticket command');
  }
}

@Injectable()
export class NotificationEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}
  // constructor

  async emit(event: BaseNotificationCommand) {
    console.log('Emitting', event.commandName);

    this.eventEmitter.emit(event.commandName, event);
  }
}

/**
 * Notifications:
 * - Investment
 * - Withdrawal
 * - Message
 * - KYC Complete
 *
 * Goal:
 * - Shared interface
 * - Strongly typed data
 * - Logic for and determining which types to use. IE email, SMS, push, etc.
 *   should be located somewhere shared. IE a gate/router that determines which
 *   notifications are allowed to be sent
 * - Logic for sending individual notifications IE "Investment" vs "Message" should be
 *   isolated
 * - A notification can be sent to multiple platforms IE email, SMS, push, etc. ONLY if the user
 *   has opted in to receive notifications on those platforms
 * - The data for each notification can be different but will share the same base structure.
 */
