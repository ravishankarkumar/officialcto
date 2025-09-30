# Builder Pattern in Java – A Delicious Pizza Example

*By Ravi Shankar · officialcto.com*

---

## Introduction

Some objects are simple to construct — you pass two or three arguments, and you’re done.  

But what happens when an object has **many optional fields**?  

Consider building a **Pizza**:
- Base: thin crust, regular, deep-dish  
- Sauce: tomato, pesto, barbecue  
- Topping: cheese, chicken, veggies, or combinations  

If we try to handle this with constructors, we quickly fall into the **telescoping constructor anti-pattern**.

---

## The Telescoping Constructor Problem

```java
Pizza pizza = new Pizza("thin crust", "pesto", "chicken");
```

Looks fine. But what if tomorrow we add:
- Extra cheese (boolean)  
- Size (enum: SMALL, MEDIUM, LARGE)  
- Gluten-free (boolean)  

Now we need multiple overloaded constructors — messy, hard to read, and error-prone.

---

## The Builder Pattern

**Intent:**  
The Builder pattern provides a **step-by-step** way to construct complex objects.  

- Keeps the object **immutable** (fields are `final`).  
- Provides a **fluent API** (`.sauce("pesto").topping("chicken")`).  
- Handles **defaults** for optional fields.  
- Allows **validation** before building.  

---

## UML Sketch

```
       +----------------+
       |    Pizza       |  (Product)
       |----------------|
       | - base         |
       | - sauce        |
       | - topping      |
       +----------------+
               ^
               |
        builds from
               |
       +----------------+
       | Pizza.Builder  |  (Builder)
       |----------------|
       | + base(...)    |
       | + sauce(...)   |
       | + topping(...) |
       | + build()      |
       +----------------+
```

---

## The Pizza Class with Builder

```java
public class Pizza {
  private final String base;
  private final String sauce;
  private final String topping;

  private Pizza(String base, String sauce, String topping) {
    this.base = base;
    this.sauce = sauce;
    this.topping = topping;
  }

  public String getBase() { return base; }
  public String getSauce() { return sauce; }
  public String getTopping() { return topping; }

  public static class Builder {
    private String base = "regular";
    private String sauce = "tomato";
    private String topping = "cheese";

    public Builder base(String base) {
      this.base = base;
      return this;
    }

    public Builder sauce(String sauce) {
      this.sauce = sauce;
      return this;
    }

    public Builder topping(String topping) {
      this.topping = topping;
      return this;
    }

    public Pizza build() {
      if (base == null || base.isBlank()) {
        throw new IllegalStateException("Pizza base is required");
      }
      return new Pizza(base, sauce, topping);
    }
  }
}
```

---

## Usage Example

```java
public class Main {
  public static void main(String[] args) {
    Pizza pizza = new Pizza.Builder()
        .base("thin crust")
        .sauce("pesto")
        .topping("chicken")
        .build();

    System.out.println("Pizza with " 
        + pizza.getBase() + " base, " 
        + pizza.getSauce() + " sauce, and " 
        + pizza.getTopping() + " topping created.");
  }
}
```

### Output
```
Pizza with thin crust base, pesto sauce, and chicken topping created.
```

---

## Why is this the Builder Pattern?

1. **Readable**: Method chaining makes the construction expressive.  
2. **Immutable**: Once built, `Pizza` fields cannot be changed.  
3. **Defaults**: If you don’t specify sauce, it defaults to tomato.  
4. **Validation**: Builder can enforce rules (e.g., base cannot be empty).  
5. **Extensible**: Adding new options (size, extra cheese) is easy — just add more builder methods.  

---

## Advantages

- Cleaner construction of complex objects.  
- No explosion of constructors.  
- Easy to add optional fields.  
- Supports immutability.  
- Improves readability with fluent API.  

---

## Limitations

- More boilerplate code compared to simple constructors.  
- For trivial objects, Builder may be overkill.  
- Without tools like **Lombok**, you must manually maintain the Builder.  

---

## TODOs and Suggested Improvements

1. **Add more fields**: Extend Pizza with `size`, `extraCheese`, `glutenFree`.  
2. **Required fields**: Enforce mandatory options (e.g., `base`) via the Builder’s constructor.  
3. **Validation logic**: Prevent invalid pizzas (e.g., gluten-free + deep-dish not allowed).  
4. **Factory integration**: Combine with Abstract Factory — `ItalianPizzaFactory` could return pre-seeded builders with defaults.  
5. **Testing**: Add JUnit tests to verify default values and validation rules.  
6. **Lombok**: Use `@Builder` annotation to generate the builder automatically and compare.  

---

## Conclusion

The **Builder pattern** is an elegant solution when object construction gets messy.  
In our example, instead of juggling overloaded constructors, we used a fluent, immutable builder for **Pizza**.  

This pattern is widely applicable — from **configuring pizzas** to **building HTTP requests** or **complex UI components**.  

Once you get comfortable with Builder, you’ll start noticing where it can simplify code and improve readability.  

---

✍️ *Written by Ravi Shankar for officialcto.com*
