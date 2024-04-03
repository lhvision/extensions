enum BaseUsageUnitEnum {
  BYTES = 'Bytes',
  KB = 'KB',
  MB = 'MB',
  GB = 'GB',
  TB = 'TB',
  PB = 'PB',
  EB = 'EB',
  ZB = 'ZB',
  YB = 'YB',
  CORE = 'Core',
}

const BaseUsageUnitValues = Object.values(BaseUsageUnitEnum)

const baseByteNum = 1024

export function processBytes(
  num: number,
): string {
  let byteDecimal = 0
  let currentNum = num
  while (currentNum >= baseByteNum) {
    currentNum /= baseByteNum
    byteDecimal++
  }
  const byteBase = 1024 ** byteDecimal
  const base = 10 ** 2
  return `${Math.round((num / byteBase) * base) / base} ${BaseUsageUnitValues[byteDecimal]}`
}
