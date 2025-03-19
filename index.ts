type Constructor<T> = new (...args: any[]) => T;

type Factory<T> = () => T;

export class DependencyInjector {
  private factories: Map<Constructor<any> | string, Factory<any>> = new Map();
  private instances: Map<Constructor<any> | string, any> = new Map();

  set<T>(key: Constructor<T> | string, factory: Factory<T>): void {
    if (!this.factories.has(key)) {
      this.factories.set(key, factory);
    }
  }

  get<T>(key: Constructor<T> | string): T {
    if (!this.instances.has(key)) {
      const factory = this.factories.get(key);
      if (!factory) {
        throw new Error(
          `No factory found for key: ${
            typeof key === "string" ? key : key.name
          }`
        );
      }
      const instance = factory();
      this.instances.set(key, instance);
    }
    return this.instances.get(key) as T;
  }
}

export const injector = new DependencyInjector();
