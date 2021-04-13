export const price = function (price) {
  return Number.parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}

export const author = function (firstname, surname) {
  if ('' === firstname) {
    return surname
  }
  return surname + ', ' + firstname
}
