/**
 * 数字千分位格式化
 * @param value 要格式化的数字
 */
export function numberFormater (value: number|string) {
  try {
    const str = value.toString()
    return str.replace(/(\d)(?<!\.\d*)(?=(\d{3})+(\.|$))/g, '$1,')
  } catch(_) {
    // 如果不支持正则
    const splits = value.toString().split('.')
    let str = splits[0]
    let index = str.length

    while (index > 3) {
      index -= 3
      str = str.slice(0, index) + ',' + str.slice(index)
    }

    splits[0] = str

    return splits.join('.')
  }
}

/**
 * 将小于1000亿大于-1000亿的数字转为财务数字
 * @param value 要格式化的数字
 */
export function numberUpperCase(value: number | string) {
  // 如果不是数字或数字字符串，返回空字符串
  let _value = String(value)
  if (!/^(-?)\d+(\.\d*)?$/.test(_value)) return ""

  const digits = [
    "零", "壹", "贰", "叁", "肆",
    "伍", "陆", "柒", "捌", "玖"
  ]
  const unit = [
    ["元", "", "", "", "万", "", "", "", "亿"],
    ["", "拾", "佰", "仟"],
    ["角", "分", "厘"]
  ]

  let head = ""
  // 负数转为正数
  if (_value.startsWith("-")) {
    head = "负"
    _value = _value.slice(1)
  }

  const [integer, decimal] = _value.split(".")
  const integerValue = integer.replace(/^0+/, "")
  const decimalValue = decimal ? Number("0." + decimal).toFixed(unit[2].length).slice(2).replace(/0+$/, "") : ""

  // 整数部分
  let integerStr = ""
  for (let i = integerValue.length - 1; i >= 0; i--) {
    const itemValue = digits[Number(integerValue[i])]
    const itemUnit = unit[1][(integerValue.length - 1 - i) % 4] || ""
    const itemGroupUnit = unit[0][integerValue.length - 1 - i] || ""
    integerStr = itemValue + itemUnit + itemGroupUnit + integerStr
  }

  // 小数部分
  let decimailStr = ""
  for (let i = 0; i < decimalValue.length; i++) {
    const itemValue = digits[Number(decimalValue[i])]
    const itemUnit = unit[2][i]
    decimailStr += (itemValue + itemUnit)
  }

  const filter = (str: string) => {
    return str.replace(/(零[仟佰拾角分厘])+/g, "零")
      .replace(/零零?(元|万|亿)/g, "$1")
  }

  return [head, filter(integerStr), filter(decimailStr)].join("")
}

