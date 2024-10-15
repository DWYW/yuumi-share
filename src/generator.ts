/**
 * 生成随机ID
 */
export function randomID() {
  const prefix = Date.now().toString(36)
  const suffix = Math.floor((Math.random() * 10000)).toString(36)
  return `${prefix}_${suffix}`
}

/**
 * 生成一个连续的数字数组
 * @param start 开始下标
 * @param end 结束下标
 */
export function rangeArray(start: number, end: number) {
  const res: number[] = []
  const _end = Math.max(start, end)
  let _start = Math.min(start, end)

  while (_start <= _end) {
    res.push(_start)
    _start++
  }

  return res
}