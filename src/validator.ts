export function isUndefine(input: any) {
  return input === undefined
}

export function isNull(input: any) {
  return input === null
}

export function isDefine(input: any) {
  return input !== null && input !== undefined
}

export function isString(input: any) {
  return typeof input === "string"
}

export function isBoolean(input: any) {
  return typeof input === "boolean"
}

export function isNumber(input: any) {
  return typeof input === "number"
}

export function isNaN(input: any) {
  return Number.isNaN ? Number.isNaN(input) : isNumber(input) && input.toString() === "NaN"
}

export function isBigint(input: any) {
  return typeof input === "bigint"
}

export function isSymbol(input: any) {
  return typeof input === "symbol"
}

export function isFunction(input: any) {
  return typeof input === "function"
}

export function isObject(input: any) {
  return Object.prototype.toString.call(input) === "[object Object]"
}

export function isArray(input: any) {
  if (Array.isArray) return Array.isArray(input)
  return Object.prototype.toString.call(input) === "[object Array]"
}

export function isDate(input: any) {
  return Object.prototype.toString.call(input) === "[object Date]"
}

export function isInvalidDate(input: any) {
  if (!isDate(input)) return true
  return input.toString() === "Invalid Date"
}

export function isRegExp(input: any) {
  return Object.prototype.toString.call(input) === "[object RegExp]"
}

export function isPromise(input: any) {
  return isFunction(input.then)
}

export function isNativePromise(input: any) {
  if (!isPromise(input)) return false
  return input instanceof Promise
}

export function isFormData(input: any) {
  return Object.prototype.toString.call(input) === "[object FormData]"
}

export function isEmpty(input: any) {
  if (isUndefine(input)) return true
  if (isNull(input)) return true
  if (isString(input)) return input === ""
  if (isNaN(input)) return true
  if (isArray(input) && input.length === 0) return true
  if (isDate(input) && isInvalidDate(input)) return true

  if (isObject(input)) {
    for (const key in input) return false
    return true
  }

  return false
}

export function isMobileNumber(input: any) {
  return /^1[3456789]\d{9}$/.test((input || "").toString())
}
