import PropTypes from 'prop-types'
import React from 'react'
import get from 'lodash/get'
import { decode, createRule } from './utils'

const Context = React.createContext('rich-content')

const ContentProvider = ({ rules, dictionary, ...props }) => (
  <Context.Provider {...props} value={{ decoder: decode(rules), dictionary }} />
)
ContentProvider.propTypes = {
  rules: PropTypes.func.isRequired,
  dictionary: PropTypes.shape({}).isRequired
}
const Content = ({
  tag: Tag = 'div',
  path,
  defaultValue = '',
  options = {},
  ...props
}) => (
  <Context.Consumer>
    {({ decoder, dictionary }) => (
      <Tag
        {...props}
        dangerouslySetInnerHTML={{
          __html: decoder(get(dictionary, path, defaultValue), options)
        }}
      />
    )}
  </Context.Consumer>
)
Content.propTypes = {
  path: PropTypes.string.isRequired,
  tag: PropTypes.string,
  defaultValue: PropTypes.string,
  options: PropTypes.shape({})
}

export { Content, ContentProvider, createRule }
