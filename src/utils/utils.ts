/**
 * 计算时间戳之间的秒数（10位时间戳，单位秒、s)
 * @param timestampStart 开始时间戳
 * @param timestampEnd 结束时间戳
 */
export function getSeconds(timestampStart: number, timestampEnd: number) {
  return timestampEnd - timestampStart;
}
