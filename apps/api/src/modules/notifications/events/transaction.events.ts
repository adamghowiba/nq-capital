export class DepositEvent {
  static readonly commandName = 'investment.created';

  constructor(data: DepositEvent) {
    Object.assign(this, data);
  }
}
