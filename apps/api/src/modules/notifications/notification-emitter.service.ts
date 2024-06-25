import { Injectable } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';

export abstract class BaseNotificationCommand {
  static readonly commandName: string;
}

@Injectable()
export class NotificationEmitter {
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emit(command: BaseNotificationCommand) {
    // @ts-expect-error - This is a dynamic property
    const eventName = command.constructor['commandName'];

    if (!eventName) {
      return console.error('Command name is required');
    }

    this.eventEmitter.emit(eventName, command);
  }
}
