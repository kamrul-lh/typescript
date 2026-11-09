# What is Type Narrowing in Typescript?

## Introduction
When using union types like `string | number`, we run into an issue because TypeScript has no way to know which type the value actually is.

If you try to access a type-specific property like `value.toLowerCase()`, TypeScript will give an error such as Property `toLowerCase` does not exist on type `string | number `

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
        console.log("woof")
    }
}

class Cat {
    meow() {
        console.log("meow")
    }
}

function speak(animal: Dog | Cat) : string {
    if (animal instanceof Dog) {
        animal.bark()
    } else {
        animal.meow()
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

Most of the time in real life you’ll be using `typeof` for strings and numbers, `in` for object shapes from an API and `instanceof` not as much but it is the only way when working with classes.
