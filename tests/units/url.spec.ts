import * as url from "../../src/url"

describe("url", () => {
  it("parseQuery", () => {
    expect(url.parseQuery("http://www.baidu.com")).toStrictEqual(["http://www.baidu.com", {}])
    expect(url.parseQuery("http://www.baidu.com?#/sdfs")).toStrictEqual(["http://www.baidu.com", {}])
    expect(url.parseQuery("http://www.baidu.com?a=b")).toStrictEqual(["http://www.baidu.com", {a:"b"}])
    expect(url.parseQuery("http://www.baidu.com?a=b&a=c")).toStrictEqual(["http://www.baidu.com", {a:["b","c"]}])
    expect(url.parseQuery("http://www.baidu.com?=b&a=c")).toStrictEqual(["http://www.baidu.com", {a:"c"}])
    expect(url.parseQuery("http://www.baidu.com?a=b&a=c&a=e")).toStrictEqual(["http://www.baidu.com", {a:["b","c","e"]}])
  })
})