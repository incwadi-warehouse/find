const formatPrice = function (price) {
  return Number.parseFloat(price).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })
}
const formatAuthor = function (author) {
  if (author.firstname === '') {
    return author.surname
  }
  return author.surname + ', ' + author.firstname
}

export { formatPrice, formatAuthor }
