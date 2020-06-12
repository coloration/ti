// 没有导出
export function forEach (fn, object) {
    
  // null or undefined
if (object == null) return

// other
if (typeof object != 'object') {
  fn(object, 0, object)
}

// array
else if (Array.isArray(object)) {
  object.forEach(function (value, index) {
    fn.call(null, value, index, object)
  })
}

// object
else {
  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      fn.call(null, object[key], key, object)
    }
  }
}
}