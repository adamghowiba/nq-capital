import { Type } from "@nestjs/common";

export type GetEventKeys<T extends Array<EventDef<string, Type<any>>>> =
  T[number]['key'];

export type EventMappings<TEvents extends EventDef<string, Type>[]> = {
  [P in TEvents[number] as P['key']]: InstanceType<P['data']>;
};

export interface EventDef<TKey extends string, TData extends Type<any>> {
  key: TKey;
  data: TData;
}

export const createEventHelper = () => {
  const addEvent = <TKey extends string, TData extends Type<any>>(
    key: TKey,
    classDef: TData
  ): EventDef<TKey, TData> => {
    return {
      key,
      data: classDef,
    };
  };

  const getEventKeys = <TEvents extends EventDef<string, Type<any>>[]>(
    events: TEvents
  ) => {
    const eventKeys = events.reduce(
      (acc: Record<GetEventKeys<TEvents>, string>, event) => {
        acc[event.key as GetEventKeys<TEvents>] = event.key;

        return acc;
      },
      {} as Record<GetEventKeys<TEvents>, string>
    );

    return eventKeys;
  };

  return {
    getEventKeys,
    addEvent,
  };
};
