/**
 * 比较版本号
 * @param version1 版本号1
 * @param version2 版本号2
 */
export function compareVersion(version1: string, version2: string): 1|0|-1 {
  const v1 = version1.split('.')
  const v2 = version2.split('.')
  const len = Math.max(v1.length, v2.length)

  while (v1.length < len) {
    v1.push('0')
  }

  while (v2.length < len) {
    v2.push('0')
  }

  for (let i = 0; i < len; i++) {
    const num1 = parseInt(v1[i])
    const num2 = parseInt(v2[i])

    if (num1 > num2) {
      return 1
    } else if (num1 < num2) {
      return -1
    }
  }

  return 0
}

/**
 * 比较INT64的字符串数字
 * @param a INT64 value
 * @param b INT64 value
 */
export function compareInt64(a:string, b:string): 1|0|-1 {
  const len = Math.max(a.length, b.length)
  a = a.padStart(len, '0')
  b = b.padStart(len, '0')

  let i = -1
  while(i++ < len) {
    if (a[i] > b[i]) return 1
    if (a[i] < b[i]) return -1
  }

  return 0
}
