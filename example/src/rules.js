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
