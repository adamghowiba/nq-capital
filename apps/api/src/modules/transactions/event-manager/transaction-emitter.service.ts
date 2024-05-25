import { Injectable, Type } from '@nestjs/common';
import { EventMappings, createEventHelper } from './transaction-event.helper';
import { InvestmentEvent } from '../events/investment.event';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { FundAdjustmentEvent } from '../events/fund-adjustment.event';

const helper = createEventHelper();

const events = [
  helper.addEvent('new_investment', InvestmentEvent),
  helper.addEvent('fund_adjustment', FundAdjustmentEvent),
];

export const TRANSACTION_EVENTS = helper.getEventKeys(events);

type EventMap = EventMappings<typeof events>;

@Injectable()
export class TransactionEmitter {
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor(private readonly eventEmitter: EventEmitter2) {}

  async emit<TKey extends keyof EventMap>(event: TKey, data: EventMap[TKey]) {
    this.eventEmitter.emit(event, data);
  }
}
