import currency from 'currency.js'

const CNY = (value: currency.Any) =>
  currency(value, { symbol: '¥', precision: 2, separator: ',' })

function currencyFormat(value: currency.Any) {
  return CNY(value).format()
}

export { currencyFormat }
export default CNY
