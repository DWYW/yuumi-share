/**
 * 解析url参数
 * @param url 要解析的url
 */
export function parseQuery(url: string) {
  const query: Record<string, any> = {}
  let [path, queryString] = url.split("?")  || []
  path = path || ""
  queryString = /#/.test(queryString || "") ? queryString.split("#")[0] : queryString

  if (!queryString) return [path, query]
  queryString.split("&").forEach((item) => {
    let [key, value] = item.split("=")
    key = decodeURIComponent(key)
    value = decodeURIComponent(value)
    if (key.length === 0) return

    if (query[key]) {
      if (Array.isArray(query[key])) {
        query[key].push(value)
      } else {
        query[key] = [query[key], value]
      }
    } else {
      query[key] = value
    }
  })

  return [path, query]
}