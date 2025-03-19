## Why

Because I like it, really.
I know modules are essentially singletons in JS anyway, but instantiating them with config, sometimes with env vars, is often uncomfortable.
This is nice.

# Use

```
// Setting up the dependency injector
const di = new DependencyInjector();
di.set(Config, () => new Config());
di.set(HttpClient, () => new HttpClient(di.get(Config)));
di.set(UserService, () => new UserService(di.get(HttpClient)));
di.set(ProductService, () => new ProductService(di.get(HttpClient)));

// Usage examples
const config = di.get(Config);
const httpClient = di.get(HttpClient);
const userService = di.get(UserService);
const productService = di.get(ProductService);

// Setting and getting an object directly
const someObject = { name: "example" };
di.set("someObject", () => someObject);
const retrievedObject = di.get("someObject");
console.log(retrievedObject); // { name: 'example' }

// Example classes
class Config {
  apiUrl: string = "https://api.example.com";
}

class HttpClient {
  constructor(private config: Config) {}

  get(url: string): Promise<Response> {
    return fetch(`${this.config.apiUrl}${url}`);
  }
}

class UserService {
  constructor(private httpClient: HttpClient) {}

  getUser(id: number): Promise<Response> {
    return this.httpClient.get(`/users/${id}`);
  }
}

class ProductService {
  constructor(private httpClient: HttpClient) {}

  getProduct(id: number): Promise<Response> {
    return this.httpClient.get(`/products/${id}`);
  }
}
```
