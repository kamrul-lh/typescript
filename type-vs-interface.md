# Type aliases vs interfaces in TypeScript

## Introduction

`type` and `interface` both describe object shapes, so people mix them up. I did too. The difference only matters when you extend, merge, or describe something that is not an object.

## How they differ

An interface is a contract for an object. It can extend another interface, and it can be reopened later with the same name — the compiler merges both declarations.

A type alias is wider. It can describe an object, but also a union, an intersection, a tuple, a primitive, or a function signature. It cannot be reopened: a second `type` with the same name is an error.

Interfaces extend with `extends`, type aliases with `&`. An interface can extend an object type but not a union.

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

I use an interface when the shape is an object that other code will extend or merge. In this repo, `Course` is an interface for that reason. Merging helps when a library adds fields to an existing type, but it cuts both ways: two accidental `interface User` blocks merge silently instead of failing.

```ts
interface User {
    id: number
    name: string
}

interface User {
    email: string
}
```

`implements` is the other reason. If `class Dog implements Animal` is missing `speak()`, the compiler stops me at the class.

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

For anything that is not a plain object I use `type`. Unions, intersections, tuples, primitives, and function signatures have no interface version.

```ts
type Status = "active" | "pending"
type Admin = User & { permissions: string[] }
type Coordinates = [number, number]
```

```ts
type Email = string
type Greet = (name: string) => string
type Role = "user" | "admin"
```

## Conclusion

Most of my code uses interfaces, because most of what I describe is an object. I reach for `type` for unions, tuples, and function signatures, and when I want a duplicate name to fail.
