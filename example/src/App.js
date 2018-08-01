import React, { Component } from 'react';
import axios from 'axios';

import { Content, ContentProvider } from 'rich-content';
import rules from './rules';

export default class App extends Component {
  state = { dictionary: {} };

  async componentDidMount() {
    const { data } = await axios.get('./dictionary.yml');
    this.setState({ dictionary: data });
  }
  render() {
    return (
      <ContentProvider rules={rules} dictionary={this.state.dictionary}>
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
