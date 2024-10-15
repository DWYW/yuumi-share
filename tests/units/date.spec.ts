import * as date from "../../src/date"

describe("date", () => {
  it("dateFormatter", () => {
    expect(date.dateFormatter(new Date("adfasf"))).toBe("")
    expect(date.dateFormatter(new Date("2024-07-01 00:00:00"))).toBe("2024-07-01 00:00:00")
    expect(date.dateFormatter(new Date("2024-07-01 18:01:00"), "yyyy-MM-dd hh:mm:ss")).toBe("2024-07-01 06:01:00")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "yyyy-MM-dd HH:mm")).toBe("2024-07-01 08:01")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "yyyy-M-d H:m")).toBe("2024-7-1 8:1")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "yyyy-MM-dd HH")).toBe("2024-07-01 08")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "yyyy-M-d H")).toBe("2024-7-1 8")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "yyyy-MM-dd")).toBe("2024-07-01")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "yyyy-M-d")).toBe("2024-7-1")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "MM-dd")).toBe("07-01")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "M-d")).toBe("7-1")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "dd/MM")).toBe("01/07")
    expect(date.dateFormatter(new Date("2024-07-01 08:01:00"), "d/M")).toBe("1/7")
  })

  it("string2date", () => {
    expect(date.string2date("")).toBe(null)
    expect(date.string2date("sdfsdasss")).toBe(null)
    expect(date.string2date("Thu Jul 11 2024 00:00:00 GMT+0800 (中国标准时间)")).toStrictEqual(new Date("Thu Jul 11 2024 00:00:00 GMT+0800 (中国标准时间)"))
    expect(date.string2date("Thu Jul 11 2024 00:00:00 GMT+0800 asss")).toStrictEqual(new Date("Thu Jul 11 2024 00:00:00 GMT+0800 (中国标准时间)"))
  })

  it("dateStringFormatter", () => {
    expect(date.dateStringFormatter("")).toBe("")
    expect(date.dateStringFormatter("sdfsdasss")).toBe("")
    expect(date.dateStringFormatter("Thu Jul 11 2024 00:00:00 GMT+0800 (中国标准时间)")).toBe("2024-07-11 00:00:00")
    expect(date.dateStringFormatter("Thu Jul 11 2024 00:00:00 GMT+0800 asss")).toBe("2024-07-11 00:00:00")
  })

  it("stampFormatter", () => {
    expect(date.stampFormatter("")).toBe("")
    expect(date.stampFormatter("sdfsd22asss")).toBe("")
    expect(date.stampFormatter(1720627200000)).toBe("2024-07-11 00:00:00")
    expect(date.stampFormatter(1720627200)).toBe("2024-07-11 00:00:00")
    expect(date.stampFormatter("17206272")).toBe("2024-07-11 00:00:00")
  })

  it("isToday", () => {
    expect(date.isToday("")).toBe(false)
    expect(date.isToday(0)).toBe(false)
    expect(date.isToday(new Date(""))).toBe(false)
    expect(date.isToday(new Date(1720627200000))).toBe(false)

    const today = new Date()
    expect(date.isToday(today)).toBe(true)
    expect(date.isToday(today.toString())).toBe(true)
    expect(date.isToday(today.getTime())).toBe(true)
  })
})