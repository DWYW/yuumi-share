/**
 * 延时: 默认1秒
 * @param duration 等待的时间
 */
export function delay(duration = 1000) {
  return new Promise<void>((resolve) => {
    setTimeout(resolve, duration)
  })
}

/**
 * 根据路径获取属性值
 * @param data 原始值
 * @param path 获取的路径
 * @param resolve 当获取的值为 undefined 时的替代值
 */
export function getValueByPath<T>(data: any, path: string, resolve?: T): T {
  const  resolveValue = resolve !== (void 0) ? resolve : (void 0) as T
  if (!path) {
    return resolveValue
  }

  const attrs = path.match(/\w+/g) || []
  if (attrs.length === 0) {
    return resolveValue
  }

  let index = 0
  let res = data

  while (index < attrs.length && res !== null && res !== (void 0)) {
    res = res[attrs[index++]]
  }

  if (index !== attrs.length) {
    return resolveValue
  }

  return res === (void 0) ? resolveValue : res
}

/**
 * 根据路径设置属性值
 * @param data 原始值
 * @param path 路径
 * @param value 要设置属性值
 */
export function setValueByPath(data: any[]|Record<string, any>, path: string, value: any) {
  if (!path) return

  const attrs = path.match(/\w+/g) || []
  if (attrs.length === 0) return

  const len = attrs.length - 1
  let index = 0
  let target: any = data

  while (index < len) {
    const key = attrs[index++]
    if (target[key] === null || target[key] === void 0) {
      target[key] = {}
    }

    target = target[key]
  }

  target[attrs[index]] = value
}

/**
 * 短轮询
 * @param fn 每次执行的函数
 * @param isDone 判断是否结束的函数
 * @param duration 间隔时间
 * @param max 最大次数
 */
export function shortLoop<T>(
  fn: () => Promise<any>,
  isDone: (value: any) => boolean,
  duration = 1000,
  max = 100
): Promise<T> {
  return new Promise((resolve, reject) => {
    let i = 0

    const run = () => {
      // 如果超过最大次数，触发 reject
      if (i > max) {
        return reject()
      }

      Promise.resolve(fn()).finally(() => {
        i++
      }).then((res) => {
        if (isDone(res)) {
          return resolve(res)
        }

        return delay(duration).then(run)
      })
    }

    run()
  })
}

/**
 * 深拷贝
 * @param data {object|array} 要拷贝的值
 */
export function deepCopy<T>(data: T): T {
  if (!data || !(data instanceof Object) || data instanceof Function) return data

  const copy: any = data instanceof Array ? [] : {}
  const copyed = [{
    origin: data,
    copy: copy
  }]

  const foreach = (stackItem: any) => {
    const { origin, copy } = stackItem

    // 依次访问本层属性
    for (const key in origin) {
      const item = origin[key]

      if (!(item instanceof Object) || item instanceof Function) {
        copy[key] = item
        continue
      }

      // 检测当前值是否被拷贝过
      const _copyed = copyed.find(t => t.origin === item)
      if (_copyed) {
        copy[key] = _copyed.copy
        continue
      }

      copy[key] = item instanceof Array ? [] : {}

      // 用于下一次判断，防止循环引用造成的溢出
      copyed.push({
        origin: item,
        copy: copy[key]
      })

      foreach({
        origin: item,
        copy: copy[key]
      })
    }
  }

  foreach({
    origin: data,
    copy: copy
  })

  return copy
}

/**
 * 防抖函数
 * @param fn 要执行的函数
 * @param delay 延迟的时间ms
 * @param context 上下文内容
 */
export function debounce (fn: (...rest: any[]) => any, delay: number, context: any = null): (...rest: any[]) => void {
  let timeout: any

  return function (...args) {
    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(() => {
      fn.apply(context, args)
    }, delay)
  }
}

/**
 * 节流函数
 * @param fn 要执行的函数
 * @param delay 延迟的时间ms
 * @param context 上下文内容
 */
export function throttle (fn: (...rest: any[]) => any, delay: number, context: any = null): (...rest: any[]) => any {
  let timeout: any

  return function (...args) {
    if (!timeout) {
      timeout = setTimeout(function () {
        fn.apply(context, args)
        timeout = null
      }, delay)
    }
  }
}