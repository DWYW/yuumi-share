import * as generator from "../../src/generator"

describe("generator", () => {
  it("randomID", () => {
    expect(generator.randomID()).toMatch(/^[a-zA-Z0-9]+_[a-zA-Z0-9]+$/)
  })

  it("rangeArray", () => {
    expect(generator.rangeArray(0, 9)).toStrictEqual([0,1,2,3,4,5,6,7,8,9])
    expect(generator.rangeArray(9, 0)).toStrictEqual([0,1,2,3,4,5,6,7,8,9])
  })
})