# Strategy Pattern in Java: A Step-by-Step Tutorial with Example

Software systems often face the problem of **choosing between multiple algorithms** to perform the same task.  
For example:

- A navigation app may calculate the *fastest route* or the *shortest route*.  
- An e-commerce site may recommend products *by rating* or *by discount*.  
- A service platform may assign providers *based on lowest cost* or *highest customer rating*.  

Hard-coding these choices into the business logic leads to messy `if-else` or `switch` blocks, and every time you add a new rule, you must change existing code. This violates the **Open/Closed Principle** (classes should be open for extension, but closed for modification).

The **Strategy Pattern** solves this problem.

---

## What is the Strategy Pattern?

The **Strategy Pattern** is a behavioral design pattern that:

1. Defines a **family of algorithms**.
2. Encapsulates each algorithm into its own class.
3. Lets clients choose which algorithm to use at runtime.

This keeps the code clean and makes algorithms interchangeable without modifying the main logic.

---

## Strategy Pattern Structure

Here’s the UML skeleton:

```
                +---------------------+
                |    IStrategy        | <--- interface
                |---------------------|
                | + execute(): Result |
                +---------------------+
                          ^
                          |
        +-----------------+-----------------+
        |                                   |
+---------------------+            +---------------------+
| ConcreteStrategyA   |            | ConcreteStrategyB   |
|---------------------|            |---------------------|
| + execute(): Result |            | + execute(): Result |
+---------------------+            +---------------------+

                +---------------------+
                |     Context         |
                |---------------------|
                | - strategy:IStrategy|
                | + doWork()          |
                +---------------------+
```

- **IStrategy** → common interface for algorithms.  
- **ConcreteStrategyA/B** → different implementations.  
- **Context** → uses whichever strategy it is given.  

---

## Our Example: Assigning Service Providers

Let’s apply Strategy Pattern to a **service assignment system**.  
We have multiple providers, and a customer can request assignment based on:

- Lowest cost (`RateStrategy`)
- Highest rating (`RatingStrategy`)

The customer decides *which strategy to apply*.

---

## Step 1: Define the Strategy Interface

```java
package dp.strategy;

import dp.Provider;
import java.util.List;
import java.util.Optional;

@FunctionalInterface
public interface IProviderSelect {
    Optional<Provider> select(List<Provider> providers);
}
```

---

## Step 2: Implement Strategies

### Lowest-Charge Strategy
```java
public class RateStrategy implements IProviderSelect {
    @Override
    public Optional<Provider> select(List<Provider> providers) {
        if (providers == null || providers.isEmpty()) return Optional.empty();
        return providers.stream().min(Comparator.comparingDouble(Provider::getCharge));
    }
}
```

### Highest-Rating Strategy
```java
public class RatingStrategy implements IProviderSelect {
    @Override
    public Optional<Provider> select(List<Provider> providers) {
        if (providers == null || providers.isEmpty()) return Optional.empty();
        return providers.stream().max(Comparator.comparingDouble(Provider::getRating));
    }
}
```

---

## Step 3: Service Request Holds the User’s Choice

Instead of hard-coding, the user provides their chosen strategy along with the request.

```java
public class ServiceRequest {
    private final String customerName;
    private final IProviderSelect preferredStrategy;

    public ServiceRequest(String customerName, IProviderSelect preferredStrategy) {
        this.customerName = customerName;
        this.preferredStrategy = preferredStrategy;
    }

    public IProviderSelect getPreferredStrategy() {
        return preferredStrategy;
    }
}
```

---

## Step 4: Assignment Service Delegates to Strategy

```java
public class AssignmentService {
    public Optional<Provider> assignProvider(ServiceRequest sr, List<Provider> providers) {
        if (providers == null || providers.isEmpty()) return Optional.empty();

        IProviderSelect strategy = sr.getPreferredStrategy();
        if (strategy == null) {
            return Optional.of(providers.get(0)); // default fallback
        }
        return strategy.select(providers);
    }
}
```

Notice:  
- The service does **not know** which strategy it is using.  
- It simply delegates to whatever was provided.  

This is the essence of Strategy Pattern.

---

## Step 5: Putting It All Together

```java
public class Main {
    public static void main(String[] args) {
        ProviderRepository pr = new ProviderRepository();
        List<Provider> providers = pr.getProviders();

        // Customer 1 prefers cheapest provider
        ServiceRequest sr1 = new ServiceRequest("Customer 1", new RateStrategy());
        System.out.println("Selected: " +
            new AssignmentService().assignProvider(sr1, providers).get().getProviderName());

        // Customer 2 prefers highest-rated provider
        ServiceRequest sr2 = new ServiceRequest("Customer 2", new RatingStrategy());
        System.out.println("Selected: " +
            new AssignmentService().assignProvider(sr2, providers).get().getProviderName());
    }
}
```

Output might look like:

```
Selected: Manish
Selected: Baklol
```

---

## Benefits of Using Strategy Pattern Here

- **Flexibility at runtime**: The user decides which algorithm applies.  
- **Extensibility**: New strategies can be added without modifying existing code.  
- **Testability**: Each strategy can be unit-tested independently.  
- **Separation of concerns**: Business logic (`AssignmentService`) is free from selection rules.  

---

## When to Use Strategy Pattern

Use it when:

- You have multiple ways of doing the same thing.
- You need to switch algorithms at runtime.
- You want to avoid cluttered `if-else` or `switch` chains.
- You want new behaviors to be added easily.

Examples in the real world:

- Payment methods (credit card, UPI, PayPal).  
- Sorting algorithms (by name, by price, by rating).  
- Compression (zip, gzip, rar).  
- Game AI (aggressive vs defensive strategy).  

---

## Next Steps / Exercises

- Add a new strategy: *“Best Value Strategy”* (balances cost and rating).  
- Ask the user via CLI which strategy to apply.  
- Explore how Dependency Injection frameworks (like Spring) can auto-wire strategies.  

---

## Conclusion

The Strategy Pattern allows us to **decouple algorithms from the code that uses them**.  
In our service provider assignment example, customers can select whether they want the cheapest or the best-rated provider — all without changing the core service logic.  

Whenever you see branching logic to choose between multiple algorithms, consider replacing it with the Strategy Pattern for cleaner, extensible, and testable design.
