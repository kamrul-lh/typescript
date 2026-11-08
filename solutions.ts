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