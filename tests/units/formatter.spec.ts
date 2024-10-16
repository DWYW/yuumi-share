import * as formatter from "../../src/formatter"

describe("formatter", () => {
  it("numberFormater", () => {
    expect(formatter.numberFormater(234)).toBe("234")
    expect(formatter.numberFormater(1234)).toBe("1,234")
    expect(formatter.numberFormater(1234.0023)).toBe("1,234.0023")
    expect(formatter.numberFormater(1234.0023)).toBe("1,234.0023")
    expect(formatter.numberFormater(NaN)).toBe("NaN")
    expect(formatter.numberFormater("")).toBe("")

  })

  it("numberUpperCase", () => {
    expect(formatter.numberUpperCase("ada")).toBe("")
    expect(formatter.numberUpperCase(10)).toBe("壹拾元")
    expect(formatter.numberUpperCase(100)).toBe("壹佰元")
    expect(formatter.numberUpperCase(1000)).toBe("壹仟元")
    expect(formatter.numberUpperCase(10000)).toBe("壹万元")
    expect(formatter.numberUpperCase(10001)).toBe("壹万零壹元")
    expect(formatter.numberUpperCase(100001)).toBe("壹拾万零壹元")
    expect(formatter.numberUpperCase(100001.100)).toBe("壹拾万零壹元壹角")
    expect(formatter.numberUpperCase(100001.110)).toBe("壹拾万零壹元壹角壹分")
    expect(formatter.numberUpperCase(100001.111)).toBe("壹拾万零壹元壹角壹分壹厘")
    expect(formatter.numberUpperCase(600001.001)).toBe("陆拾万零壹元零壹厘")
    expect(formatter.numberUpperCase(-600001.001)).toBe("负陆拾万零壹元零壹厘")
  })

  it("numberFiexed", () => {
    expect(formatter.numberFixed(2.555555555)).toBe(2.56)
    expect(formatter.numberFixed(2.555555555, 3)).toBe(2.556)
    const v1 = Number.MAX_SAFE_INTEGER + 1
    expect(formatter.numberFixed(v1)).toBe(v1)
    const v2 = Number.MIN_SAFE_INTEGER - 1
    expect(formatter.numberFixed(v2)).toBe(v2)
    const v3 = Number.MAX_SAFE_INTEGER / 100 + 1
    expect(formatter.numberFixed(v3)).toBe(v3)
    const v4 = Number.MIN_SAFE_INTEGER / 100 - 1
    expect(formatter.numberFixed(v4)).toBe(v4)
  })
})
