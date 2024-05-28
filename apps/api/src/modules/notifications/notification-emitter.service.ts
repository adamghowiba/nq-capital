export abstract class BaseNotificationCommand {
  abstract commandName: string;

  constructor() {
    // constructor
  }

  getCommandName() {
    return this.commandName;
  }
}

export class SendTicketMessageCommand extends BaseNotificationCommand {
  commandName = 'SendTicketMessageCommand';

  constructor(data: { recipient: string; message: string }) {
    super();

    Object.assign(this, data);
  }
}

export class NotificationEmitter {
  constructor() {
    // constructor
  }

  async emit(event: BaseNotificationCommand) {
    console.log('Emitting', event.commandName, event);
  }
}

const emitter = new NotificationEmitter();

emitter.emit(
  new SendTicketMessageCommand({
    message: 'Adam',
    recipient: 'adam@webrevived.com',
  })
);
