export type Class<T> = new (...args: any[]) => T;

export function create<T>(theClass: Class<T>, ...args: any[]): T {
  return new theClass(...args);
}
