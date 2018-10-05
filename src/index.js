import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import { decode, createRule, parseDictionary } from './utils'

const Context = React.createContext('rich-content')

const createContent = ({ decoder, dictionary }) => ({
  path = '',
  options = {}
} = {}) => decoder(get(dictionary, path, options.defaultValue), options)

let parser

const ContentProvider = ({ rules, dictionary: d, ...props }) => {
  const dictionary = parseDictionary(d)
  const decoder = decode(rules)
  parser = createContent({ dictionary, decoder })
  return <Context.Provider {...props} value={{ parser }} />
}

ContentProvider.propTypes = {
  rules: PropTypes.func.isRequired,
  dictionary: PropTypes.oneOfType([PropTypes.shape({}), PropTypes.string])
    .isRequired
}
const Content = ({ tag: Tag = 'div', path, options = {}, ...props }) => (
  <Context.Consumer>
    {({ parser }) => (
      <Tag
        {...props}
        dangerouslySetInnerHTML={{
          __html: parser({ path, options })
        }}
      />
    )}
  </Context.Consumer>
)
Content.propTypes = {
  path: PropTypes.string.isRequired,
  tag: PropTypes.string,
  options: PropTypes.shape({})
}

export { parser as content, Content, ContentProvider, createRule }
