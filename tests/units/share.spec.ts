import * as share from "../../src/share"

describe("share",() => {
  it("delay", async () => {
    let index = 0
    const promise = share.delay(300).then(() => {
      index ++
    })

    expect(index).toBe(0)
    await promise
    expect(index).toBe(1)
  })

  it("getValueByPath", async () => {
    const data = {
      a: 1,
      b:  {
        c: 2
      },
      c: [1, 2]
    }

    expect(share.getValueByPath(data, "")).toBe(void 0)
    expect(share.getValueByPath(data, "@#$@#$")).toBe(void 0)
    expect(share.getValueByPath(data, "", "")).toBe("")
    expect(share.getValueByPath(data, "a")).toBe(1)
    expect(share.getValueByPath(data, "b")).toStrictEqual({c: 2})
    expect(share.getValueByPath(data, "b.c")).toBe(2)
    expect(share.getValueByPath(data, "c")).toStrictEqual([1, 2])
    expect(share.getValueByPath(data, "c[1]")).toBe(2)
    expect(share.getValueByPath(data, "d.c.b")).toBe(void 0)
    expect(share.getValueByPath(data, "b.c.d.e")).toBe(void 0)
    expect(share.getValueByPath(data, "d", "1")).toBe("1")
  })

  it("setValueByPath", async () => {
    const data: Record<string, any> = {
      a: 1
    }

    share.setValueByPath(data, "a", 2)
    expect(data.a).toBe(2)

    share.setValueByPath(data, "", 2)
    share.setValueByPath(data, "@#$@!#$", 2)
    expect(data.b).toBe(void 0)
    share.setValueByPath(data, "b", "b")
    expect(data.b).toBe("b")

    share.setValueByPath(data, "c.e", "e")
    expect(data.c).toStrictEqual({e: "e"})
    expect(data.c.e).toBe("e")
  })

  it("shortLoop", async () => {
    let index = 0
    const promise = share.shortLoop<number>(
      () => Promise.resolve(++index),
      (v) => v === 3,
      100
    )

    expect(index).toBe(1)
    const res = await promise
    expect(index).toBe(3)
    expect(res).toBe(3)
  })

  it("shortLoop over max", async () => {
    let index = 0
    let res
    const promise = share.shortLoop<number>(
      () => Promise.resolve(++index),
      (v) => v === 5,
      50,
      3
    )

    expect(index).toBe(1)
    try {
      res = await promise
    } catch(_) {}

    expect(index).toBe(4)
    expect(res).toBe(void 0)
  })

  it("deepCopy", async () => {
    const data: any = {
      a: 1,
      b:  {
        c: 2
      },
      c: [1, 2],
      f: function(){ return 1}
    }

    data.test = data

    const current = share.deepCopy(data)
    expect(current).toStrictEqual(data)

    expect(current.f()).toBe(1)
    current.f = function(){ return 2}
    expect(current.f()).toBe(2)

    current.a = 4
    expect(data.a).toBe(1)

    expect(data.test.a).toBe(1)
    expect(current.test.a).toBe(4)
  })

  it("debounce", async () => {
    let index = 0
    const fn = share.debounce(() => ++index, 50)

    fn()
    await share.delay(25)
    fn()
    await share.delay(25)
    expect(index).toBe(0)
    await share.delay(50)
    expect(index).toBe(1)
  })

  it("throttle", async () => {
    let index = 0
    const fn = share.throttle(() => ++index, 50)

    fn()
    await share.delay(25)
    expect(index).toBe(0)
    fn()
    await share.delay(25)
    expect(index).toBe(1)
    await share.delay(50)
    expect(index).toBe(1)
  })
})