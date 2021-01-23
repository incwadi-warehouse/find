const formatPrice = function (price) {
  return Number.parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
const formatAuthor = function (firstname, surname) {
  if (firstname === '') {
    return surname
  }
  return surname + ', ' + firstname
}

export { formatPrice, formatAuthor }
