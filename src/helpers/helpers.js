export const getArray = (from, to) => {
  const arr = []
  for (let i = from; i <= to; i++) {
    arr.push(i)
  }
  return arr
}

export const getMonth = (num) => {
  return num > 12 ? 1 : num < 1 ? 12 : num
}
