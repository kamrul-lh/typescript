# The core differences between type aliases and interface in TypeScript : When should you choose one over the other?

## Introduction
Typescript provides type aliases & interface which describes data shape. An interface is an object contract. An interface can extend & merge. Type aliases can also describe object shape too but it can also describe unions, intersections, primitives, tuples and function signatures

## Description

Interface defined in object shape. An interface can extend other interfaces to implement their data shape. An interface can be reopened by declaration merging, but Type aliases can not be reopened by declaration merging.

To implement a core interface into another, you need to use `extend,` while a type alias needs to use intersections (&)

An interface can extend known an object but can not extend union types.

## Interface vs Type alias comparison at a glance

| Feature              | Type alias                                                         | Interface                                                                      |
| -------------------- | ------------------------------------------------------------------ | ------------------------------------------------------------------------------ |
| Declaration          | By `type`                                                          | By `interface`                                                                 |
| Declaration merging  | No, duplicate naming throws an error                               | Yes, allowed and merged                                                        |
| Support              | Objects, unions, tuples, string literals, intersections, primitives | Object structure; does not support tuples, string literals, or unions directly |
| Extension            | Via the intersection (`&`) operator                                | Via the `extends` keyword    

## Examples

```ts
type Gender = "Male" | "Female" | "Other";

interface IAddress {
    city: string
    region: string
    postalCode: string
    addressLine1: string
    addressLine2?:string
}

interface IPerson {
    id: string
    name: string
    gender: Gender
    email: string
    birthDate?: string
}

//  Merging by re declaration
interface IPerson {
    address: IAddress
}

interface IStudent extends IPerson {
    class: string
    section: string
    roll: number
}

interface ITeacher extends IPerson {
    department: string
    subject: string
    experience?: number
}
```

### Object contract

```ts
interface IUser {
  id: number;
  name: string;
}

```

### Union Types
```ts
type Status = "active" | "suspended" | "pending";
type Role = 'user'| 'member' | 'editor' | 'admin' | 'super-admin'
```

### Intersection (`&`)

```ts
type Admin = IUser & {
  permissions: string[];
  status: Status
  role: Role
};
```

### Tuple

```ts
type Coordinates = [latitude: number, longitude: number];
const dhaka: Coordinates = [23.8103, 90.4125];
```

### Primitive alias and function type

```ts
type Email = string;
type Greet = (name: string) => string;

```

## When should you choose one over the other?

- Choose an interface when a contract might need to be extended or merged.

```ts
interface User {
    id: number
    name: string
}

interface User {
    email: string
}
```

- Choose an interface when a class needs to strictly follow a contract using `implements`.

```ts
interface Animal {
    speak(): string
}

class Dog implements Animal {
    speak() {
        return "woof"
    }
}
```

- We need to choose a type alias when we are creating unions, intersections, tuples, or other complex type combinations.

```ts
type Status = "active" | "pending"
type Admin = User & { permissions: string[] }
type Coordinates = [number, number]
```

- We need to pick a type alias for function types, primitive aliases, and string literals that need to be used and implemented.

```ts
type Email = string
type Greet = (name: string) => string
type Role = "user" | "admin"
```


## Conclusion

My opinion is to try to use interfaces mostly. The TypeScript documentation also prefers interfaces. Use type aliases where unions, string literals, or tuples are needed to bind the program to strict keys, a fixed number of keys, or required string literals.
