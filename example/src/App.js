import React, { Component } from 'react';
import axios from 'axios';

import { content, Content, ContentProvider } from 'rich-content';
import rules from './rules';

export default class App extends Component {
  state = { lang: 'en', dictionary: {}, error: undefined };

  componentDidMount() {
    this.loadDictionary(this.state.lang);
  }
  async loadDictionary(lang) {
    const { data } = await axios.get(`./${lang}.yml`);
    this.setState({ lang, dictionary: data });
  }

  showError = ev => {
    ev.preventDefault();
    this.setState({ error: content({ path: 'text.bold' }) });
  };
  render() {
    const { lang, dictionary, error } = this.state;
    return (
      <ContentProvider rules={rules} dictionary={dictionary}>
        <div style={{ width: 640, margin: '15px auto' }}>
          <h1>Testing Rich Content</h1>
          {error && (
            <p className="red" dangerouslySetInnerHTML={{ __html: error }} />
          )}
          <button
            onClick={() => this.loadDictionary(lang === 'en' ? 'es' : 'en')}
          >
            {lang === 'en' ? 'Cambiar a Español' : 'Change to English'}
          </button>
          <button onClick={this.showError}>
            {lang === 'es' ? 'Mostrar error' : 'Show error'}
          </button>
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
