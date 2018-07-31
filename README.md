# rich-content

> Controlled Rich text for React

[![NPM](https://img.shields.io/npm/v/rich-content.svg)](https://www.npmjs.com/package/rich-content) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save rich-content
```

or with Yarn

```bash
yarn add rich-content
```

## ContentProvider Params

`dictionary:` Content object. All the text with your special markup.

#### Example:

```js
export default {
  text: "**I'm Bold** ~I'm Italic~ **~I'm Both~**",
  params: 'This is a parameter: %{parameter}',
  links:
    'Links: [:http://www.google.com](Open in new Tab)  [http://www.google.com](Open in same Tab)',
  image: 'This is an image: [[https://placehold.it/300]](This is an image)',
  classes: '(:red I have the .red class)!'
};
```

`rules:` Function that returns a dictionary of regular expressions and transformations, that you want to match from your text.

__NOTE: You can use the helper `createRule` to define your markup.__

#### Example:

```js
import { createRule } from 'rich-content';

const replace = createRule('%{', '}');
const bold = createRule('**');
const italic = createRule('~');
const classes = createRule('(:', ' ') + createRule('', ')');
const link = createRule('[', ']') + createRule('(', ')');
const image = createRule('[[', ']]') + createRule('(', ')');

export default ({ params }) => ({
  [replace]: (_, key = '') => params[key],
  [bold]: (_, text = '') => `<strong>${text}</strong>`,
  [italic]: (_, text = '') => `<em>${text}</em>`,
  [classes]: (_, className = '', text = '') =>
    `<span class="${className}">${text}</span>`,
  [image]: (_, src = '', alt = '') => `<img src="${src}" alt="${alt}" />`,
  [link]: (_, link = '', label = '') =>
    link.indexOf(':') === 0
      ? `<a href=${link.slice(1)} target="_blank">${label}</a>`
      : `<a href=${link}>${label}</a>`
});
```

## Content Params

`tag:` *(default: div)* Container HTML tag.

`path:` Path of the value in the dictionary. Ex. `a`, `a.b`, `a.b.c[0]`, `a.b.c[0].d`.

`options:` *(Optional)* Extra options defined in your rules. Ex. `{ params: { parameter: 'Hi!' } }`.

## Usage

```jsx
import React, { Component } from 'react';

import { Content, ContentProvider } from 'rich-content';

import rules from './rules';
import dictionary from './dictionary';

export default class App extends Component {
  render() {
    return (
      <ContentProvider rules={rules} dictionary={dictionary}>
        <div style={{ width: 640, margin: '15px auto' }}>
          <h1>Testing Rich Content</h1>
          <div className="content">
            <div>
              <Content tag="span" path="text.bold" />
              <Content tag="span" path="text.italic" />
              <Content tag="span" path="text.both" />
            </div>
            <Content path="params" options={{ params: { parameter: 'Hi!' } }} />
            <Content path="links" />
            <Content className="v-pad" path="image" />
            <Content path="classes" />
          </div>
        </div>
      </ContentProvider>
    );
  }
}
```

## License

MIT © [Thram](https://github.com/Thram)
