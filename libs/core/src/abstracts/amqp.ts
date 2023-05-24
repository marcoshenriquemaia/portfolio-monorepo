export abstract class AMQPAbstract {
  abstract sendEvent(event: string, data: any): void;
}
