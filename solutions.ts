function multiplyValue (value: number, multiplier?:number):number{
   return value * (multiplier ?? 2)
}


function processInput (value: string | number | boolean) : string | number  {
   if(typeof value === 'string') {
      return value.trim().toLowerCase()
   }

   if(typeof value === 'number') {
      return value * 10
   }

   return value ? "Active" : "Inactive"
}

function formatCoordinate ([latitude, longitude, locationName]: readonly [number, number, string]) : string {
   return `Location: ${locationName} (${latitude}, ${longitude})`
}

function concatenateArrays <T> (...rest: T[][]) : T[] {
   return rest.flat()
}

interface Course {
   title:string
   students: number
   isPublished: boolean
}

function getPopularCourses (courses: Course[], minStudents: number) : Course[] {
   const popularCourses = courses.filter((course) => course.isPublished && course.students >= minStudents)

   return popularCourses
}

function pluckValues <T, K extends keyof T> (items: T[], key: K) : T[K][] {
   return items.map((item) => item[key])
}


class Employee {
   constructor (protected name: string, private baseSalary: number) {}

   public getDetails():string {
      return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`
   }

}

class Manager extends Employee {
   constructor (name: string,  baseSalary: number, private department: string) {
      super(name, baseSalary)
   }

   getRoleInfo():string {
      return `Manager of ${this.department}: ${this.name}`
   }
}