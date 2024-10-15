/**
 * 将 Date 转为格式化字日期
 * @param value 要格式化的日期
 * @param rule 格式化规则（默认YYYY-MM-DD HH:mm:ss）
 */
export function dateFormatter(value: Date, rule = "YYYY-MM-DD HH:mm:ss"): string {
  // 如果不是合法的日期对象，返回空字符串
  if (value.toString() === "Invalid Date") return ""

  const info = {
    year: value.getFullYear(),
    month: value.getMonth() + 1,
    date: value.getDate(),
    hours: value.getHours(),
    minutes: value.getMinutes(),
    seconds: value.getSeconds()
  }

  const stringify = (value: number) => `0${value}`.slice(-2)

  let rules: [RegExp, number|string][] = [
    [/Y{4,}/i, info.year],
    [/Y{2,}/i, info.year.toString().slice(2)],
    [/M{2,}/, stringify(info.month)],
    [/M/, info.month],
    [/d{2,}/i, stringify(info.date)],
    [/d/i, info.date],
    [/H{2,}/, stringify(info.hours)],
    [/H/, info.hours],
    [/h{2,}/, stringify(info.hours % 12)],
    [/h/, info.hours % 12],
    [/m{2,}/, stringify(info.minutes)],
    [/m/, info.minutes],
    [/s{2,}/i, stringify(info.seconds)],
    [/s/i, info.seconds]
  ]

  let res = rule.trim()

  rules.forEach(([reg, value]) => {
    res = res.replace(reg, value.toString())
  })

  return res
}

/**
 * 将日期字符串转为 Date
 * @param value 要转换的日期字符串
 */
export function string2date(value: string): Date|null {
  if (!value) return null

  let date = new Date(value)

  // new Date("Thu Jul 11 2024 00:00:00 GMT+0800 (中国标准时间)") 在部分 iOS 下无法正常使用，
  // iOS 只支持 "yyyy/MM/dd"、"yyyy/MM/dd HH:mm:ss"、"yyyy-MM-dd"、"yyyy-MM-ddTHH:mm:ss"、"yyyy-MM-ddTHH:mm:ss+HH:mm" 的格式
  if (date.toString() === "Invalid Date") {
    // 正则表达式解析日期字符串
    const regex = /(\w{3}) (\w{3}) (\d{2}) (\d{4}) (\d{2}):(\d{2}):(\d{2}) GMT([+-]\d{4})/
    const match = value.match(regex)
    if (!match) {
      return null
    }

    // 提取日期各个部分
    const [month, day, year, hours, minutes, seconds] = match.slice(2)
    // 将月份缩写转换为数字
    const monthMap: Record<string, number> = {
      Jan: 0, Feb: 1, Mar: 2, Apr: 3,
      May: 4, Jun: 5, Jul: 6, Aug: 7,
      Sep: 8, Oct: 9, Nov: 10, Dec: 11
    }
    date = new Date(Number(year), monthMap[month], Number(day), Number(hours), Number(minutes), Number(seconds))
  }

  return date
}

/**
 * 将日期字符串转为格式化字日期
 * @param value 要格式化的日期字符串
 * @param rule 格式化规则（默认YYYY-MM-DD HH:mm:ss）
 */
export function dateStringFormatter(value: string, rule?: string): string {
  const date = string2date(value)
  if (!date || date.toString() === "Invalid Date") {
    return ""
  }
  return dateFormatter(date, rule)
}

/**
 * 将时间戳或者时间戳字符串的子串转为格式化字日期
 * @param value 要格式化的时间戳或者时间戳字符串的子串
 * @param rule 格式化规则（默认YYYY-MM-DD HH:mm:ss）
 */
export function stampFormatter(value: number|string, rule?: string) {
  if (!value) return ""

  const str = String(value).slice(0, 13).padEnd(13, "0")
  if (!/^\d+$/.test(str)) {
    return ""
  }

  return dateFormatter(new Date(Number(str)), rule)
}

/**
 * 判断一个日期是否是今天
 */
export function isToday (value: Date|number|string): boolean {
  let dateValue: Date|null = null

  if (typeof value === "number") {
    const str = String(value).slice(0, 13).padEnd(13, "0")
    dateValue = new Date(Number(str))
  } else if (typeof value === "string") {
    dateValue = string2date(value)
  } else if (Object.prototype.toString.call(value) === "[object Date]") {
    dateValue = value
  }

  if (!dateValue || dateValue.toString() === "Invalid Date") {
    return false
  }

  const today = new Date()
  return dateValue.getFullYear() === today.getFullYear() &&
    dateValue.getMonth() === today.getMonth() &&
    dateValue.getDate() === today.getDate()
}
