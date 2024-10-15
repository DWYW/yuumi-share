import * as formatter from "../../src/formatter"

describe("formatter", () => {
  it("numberFormater", () => {
    expect(formatter.numberFormater(234)).toBe("234")
    expect(formatter.numberFormater(1234)).toBe("1,234")
    expect(formatter.numberFormater(1234.0023)).toBe("1,234.0023")
    expect(formatter.numberFormater(1234.0023)).toBe("1,234.0023")
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
})