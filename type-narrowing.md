# What is Type Narrowing in Typescript?

## Introduction

Type narrowing refers to filter the type of a variable inside a conditional block. Type narrowing help us to execute our code type safely and access correct property related to that type.

### Why Should we use type narrowing

Assuming I have a union type such `string | boolean` and assign to `value` params of a method

Let's try to access a type-specific property like `value.toLowerCase()`, TypeScript will give an error such as `Property `toLowerCase` does not exist on type `string | boolean `

In that scenario, type narrowing comes in. We can simply check the type of the value inside a `if` block by using `typeof`operator and then access its type-specific properties normally. 

## Description

We can implement type narrowing by using operators such as `typeof`, `instanceof`, `in`, equality checks (`===`), truthiness checks (`if (value)`), etc. For type safety, and to access type-specific properties, we need to use type narrowing.

- The `typeof` operator is useful for primitives such as string, number, and boolean.
- `instanceof` can be used only with classes.
- The `in` operator is useful for checking whether a key exists in an object.


## Examples

### typeof

```ts
function parse(value: string | number) {
    if (typeof value === "string") {
        return value.length
    }
    // here value is number
    return value.toFixed(2)
}
```

if we dont use type narrowing in above case , then accessing `value.length` or `value.toFixed()` will throw an error such as
`Property length does not exist on type number | Property toFixed does not exist on type string`  To avoid such scenario we have to carefully implement type narrowing and cover all types in union.

### instanceof

Every animal can speak in its own language, like a dog can bark or a cat can meow. We have a method `speak` that should return a string describing how that animal speaks.

For now, we have only a cat and a dog as animals. TypeScript cannot automatically infer which method should run when you pass in an animal, so we have to introduce type narrowing using `instanceof`. That way, we can run the correct method and return the correct string for that animal.

```ts
class Dog {
    bark() {
        return "woof"
    }
}

class Cat {
    meow() {
        return "meow"
    }
}

function speak(animal: Dog | Cat): string {
    if (animal instanceof Dog) {
        return animal.bark()
    } else {
        return animal.meow()
    }
}
```

### in operator

```ts
interface Engine {
    start: () => void
}

interface Battery {
    charge: () => void
}

function powerUp(vehicle: Engine | Battery) {
    if ("start" in vehicle) {
        vehicle.start()
    } else {
        vehicle.charge()
    }
}
```

This is the one I use most. When using objects from an API response the interfaces don’t exist after compiling so `instanceof` is useless. Using the `in` operator will just check the keys on the object and give you the correct type.

### truthiness

```ts
function showBio(bio: string | null) {
    if (bio) {
        console.log(bio.trim())
    } else {
        console.log("This user has not added a bio yet")
    }
}
```

Here `bio` can be string or null. Once it passes the `if (bio)` check, null is out of the way so `bio.trim()` is safe to use. In the else part we know the user never added a bio so we just print a fallback message.

### equality

```ts
function getTotal(price: number, coupon: string | undefined) {
    if (coupon === undefined) {
        return price
    }
    // here coupon is string
    return coupon === "SAVE10" ? price * 0.9 : price
}
```

Comparing with `===` narrows the same way. The undefined case is already handled in the first check, so after that block only string is left and we can compare it against the literal `"SAVE10"`. The same idea works with `!==` or when checking a value against a fixed value like `role === "admin"`.

# Conclusion

Most of the time in real life you’ll be using `typeof` for strings and numbers, `in` for object shapes from an API and `instanceof` not as much but it is the only way when working with classes.