export const price = function (data) {
  return Number.parseFloat(data).toLocaleString(undefined, {
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
