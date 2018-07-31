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
          <Content path="text" />
          <Content path="params" options={{ params: { parameter: 'Hi!' } }} />
          <Content path="links" />
          <Content className="v-pad" path="image" />
          <Content path="classes" />
        </div>
      </ContentProvider>
    );
  }
}
