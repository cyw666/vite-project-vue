import currency from 'currency.js'

const CNY = (value) =>
  currency(value, { symbol: '¥', precision: 2, separator: ',' })

function currencyFormat(value) {
  return CNY(value).format()
}

export { currencyFormat }
export default CNY
