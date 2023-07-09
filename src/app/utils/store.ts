export class Store<T> {
  private key: string;

  constructor(key: string) {
    this.key = key;
  }

  getItem = (): T | undefined => {
    const item = localStorage.getItem(this.key);
    if (item) {
      return JSON.parse(item) as T;
    }
    return undefined;
  };

  setItem = (item: T) => {
    localStorage.setItem(this.key, JSON.stringify(item));
  };

  removeItem = () => {
    localStorage.removeItem(this.key);
  };
}
