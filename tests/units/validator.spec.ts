import * as validator from "../../src/validator"

describe("validator", () => {
  it("isUndefine", () => {
    expect(validator.isUndefine(undefined)).toBe(true)
    expect(validator.isUndefine(null)).toBe(false)
    expect(validator.isUndefine("")).toBe(false)
    expect(validator.isUndefine({})).toBe(false)
  })

  it("isNull", () => {
    expect(validator.isNull(null)).toBe(true)
    expect(validator.isNull(undefined)).toBe(false)
    expect(validator.isNull("")).toBe(false)
    expect(validator.isNull({})).toBe(false)
  })

  it("isDefine", () => {
    expect(validator.isDefine(null)).toBe(false)
    expect(validator.isDefine(undefined)).toBe(false)
    expect(validator.isDefine("")).toBe(true)
    expect(validator.isDefine({})).toBe(true)
  })

  it("isString", () => {
    expect(validator.isString("")).toBe(true)
    expect(validator.isString({})).toBe(false)
  })

  it("isBoolean", () => {
    expect(validator.isBoolean(true)).toBe(true)
    expect(validator.isBoolean(false)).toBe(true)
    expect(validator.isBoolean({})).toBe(false)
  })

  it("isNumber", () => {
    expect(validator.isNumber(1)).toBe(true)
    expect(validator.isNumber(NaN)).toBe(true)
    expect(validator.isNumber({})).toBe(false)
  })

  it("isNaN", () => {
    expect(validator.isNaN(1)).toBe(false)
    expect(validator.isNaN(NaN)).toBe(true)
    expect(validator.isNaN({})).toBe(false)
  })

  it("isBigint", () => {
    expect(validator.isBigint(BigInt(1))).toBe(true)
    expect(validator.isBigint(NaN)).toBe(false)
    expect(validator.isBigint(-1)).toBe(false)
  })

  it("isSymbol", () => {
    expect(validator.isSymbol(Symbol(1))).toBe(true)
  })

  it("isFunction", () => {
    expect(validator.isFunction(() => {})).toBe(true)
    expect(validator.isFunction(new Function())).toBe(true)
    expect(validator.isFunction(function() {})).toBe(true)
  })

  it("isObject", () => {
    expect(validator.isObject({})).toBe(true)
    expect(validator.isObject([])).toBe(false)
    expect(validator.isObject(class A {})).toBe(false)
  })

  it("isArray", () => {
    expect(validator.isArray({})).toBe(false)
    expect(validator.isArray([])).toBe(true)
    expect(validator.isArray(new Array())).toBe(true)
  })

  it("isRegExp", () => {
    expect(validator.isRegExp(new RegExp(""))).toBe(true)
    expect(validator.isRegExp(/\./)).toBe(true)
    expect(validator.isRegExp([])).toBe(false)
  })

  it("isPromise", () => {
    expect(validator.isPromise({ then: () => {} })).toBe(true)
    expect(validator.isPromise(new Promise(() => {}))).toBe(true)
    expect(validator.isPromise(Promise.resolve(void 0))).toBe(true)
    expect(validator.isPromise(Promise.reject("").catch(() => void 0))).toBe(true)
  })

  it("isNativePromise", () => {
    expect(validator.isNativePromise({ then: () => {} })).toBe(false)
    expect(validator.isNativePromise(new Promise(() => {}))).toBe(true)
    expect(validator.isNativePromise(Promise.resolve(void 0))).toBe(true)
    expect(validator.isNativePromise(Promise.reject("").catch(() => void 0))).toBe(true)
  })

  it("isFormData", () => {
    expect(validator.isFormData(new FormData())).toBe(true)
    expect(validator.isFormData({})).toBe(false)
  })

  it("isDate", () => {
    expect(validator.isDate(new Date(""))).toBe(true)
    expect(validator.isDate(new Date())).toBe(true)
    expect(validator.isDate([])).toBe(false)
  })

  it("isInvalidDate", () => {
    expect(validator.isInvalidDate(new Date(""))).toBe(true)
    expect(validator.isInvalidDate(new Date())).toBe(false)
    expect(validator.isInvalidDate([])).toBe(true)
  })

  it("isEmpty", () => {
    expect(validator.isEmpty(undefined)).toBe(true)
    expect(validator.isEmpty(null)).toBe(true)
    expect(validator.isEmpty("")).toBe(true)
    expect(validator.isEmpty({})).toBe(true)
    expect(validator.isEmpty([])).toBe(true)
    expect(validator.isEmpty(NaN)).toBe(true)
    expect(validator.isEmpty(new Date("xxxx"))).toBe(true)
    expect(validator.isEmpty(111)).toBe(false)
    expect(validator.isEmpty({ a: 1 })).toBe(false)
  })

  it("isMobileNumber", () => {
    expect(validator.isMobileNumber("")).toBe(false)
    expect(validator.isMobileNumber("11900000000")).toBe(false)
    expect(validator.isMobileNumber("13900000000")).toBe(true)
  })
})