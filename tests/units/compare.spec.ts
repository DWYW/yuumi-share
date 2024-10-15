import * as compare from "../../src/compare"

describe("compare", () => {
  it("compareVersion", () => {
    expect(compare.compareVersion("1.0", "1.0.0")).toBe(0)
    expect(compare.compareVersion("1.0.0", "1.0")).toBe(0)
    expect(compare.compareVersion("1.0", "1.1.0")).toBe(-1)
    expect(compare.compareVersion("1.0", "0.1.0")).toBe(1)
  })

  it("compareInt64", () => {
    expect(compare.compareInt64("1234223423", "001234223423")).toBe(0)
    expect(compare.compareInt64("001234223423", "01234223423")).toBe(0)
    expect(compare.compareInt64("123", "10")).toBe(1)
    expect(compare.compareInt64("20", "10")).toBe(1)
    expect(compare.compareInt64("123", "1230")).toBe(-1)
    expect(compare.compareInt64("123", "230")).toBe(-1)
  })
})