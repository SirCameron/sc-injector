import { describe, it, expect } from "vitest";
import { injector, DependencyInjector } from "./index";

describe("DependencyInjector", () => {
  class TestService {
    getTestValue() {
      return "test";
    }
  }

  class ServiceWithConstructor {
    constructor(private value: string) {}
    getValue() {
      return this.value;
    }
  }

  it("should register and retrieve a class-based dependency", () => {
    const injector = new DependencyInjector();
    injector.set(TestService, () => new TestService());
    const instance = injector.get(TestService);
    expect(instance).toBeInstanceOf(TestService);
    expect(instance.getTestValue()).toBe("test");
  });

  it("should register and retrieve a string-based dependency", () => {
    const injector = new DependencyInjector();
    const value = { data: "test" };
    injector.set("config", () => value);
    const instance = injector.get("config");
    expect(instance).toEqual(value);
  });

  it("should return the same instance on multiple gets", () => {
    const injector = new DependencyInjector();
    injector.set(TestService, () => new TestService());
    const instance1 = injector.get(TestService);
    const instance2 = injector.get(TestService);
    expect(instance1).toBe(instance2);
  });

  it("should throw error when getting non-existent dependency with class key", () => {
    const injector = new DependencyInjector();
    expect(() => injector.get(TestService)).toThrow(
      "No factory found for key: TestService"
    );
  });

  it("should throw error when getting non-existent dependency with string key", () => {
    const injector = new DependencyInjector();
    expect(() => injector.get("missing")).toThrow(
      "No factory found for key: missing"
    );
  });

  it("should handle classes with constructor parameters", () => {
    const injector = new DependencyInjector();
    injector.set(
      ServiceWithConstructor,
      () => new ServiceWithConstructor("some param")
    );
    const instance = injector.get(ServiceWithConstructor);
    expect(instance.getValue()).toBe("some param");
  });

  it("should handle primitive values", () => {
    const injector = new DependencyInjector();
    injector.set("number", () => 42);
    injector.set("string", () => "hello");
    injector.set("boolean", () => true);

    expect(injector.get("number")).toBe(42);
    expect(injector.get("string")).toBe("hello");
    expect(injector.get("boolean")).toBe(true);
  });
});
