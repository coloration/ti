export function copy<T = any> (o: T) { 
  return Object.assign(Object.create(null), o) as T 
}

function clone <T = any> (o: T) {
  
}