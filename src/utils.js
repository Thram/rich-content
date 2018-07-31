import escape from 'lodash/escape'
const normalize = text => text.replace(/[[\\^$.|?*+(){}]/gm, c => `\\${c}`)

const createRule = (start, end) =>
  `${normalize(start)}(.*?)${normalize(end || start)}`

const decode = rulesFactory => (text = '', options = {}) => {
  const rules = rulesFactory(options)
  return Object.keys(rules).reduce(
    (result, key) => result.replace(new RegExp(key, 'gm'), rules[key]),
    escape(text)
  )
}

export { decode, createRule }
