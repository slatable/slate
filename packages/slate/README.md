# `slate`

  > slate编辑器的封装
  
## Usage
  
```tsx
import React from 'react';
import ReactDOM from 'react-dom';
import { BoldFunction, BoldToolbar } from '@slatable/bold';
import { UnderlineFunction, UnderlineToolbar } from '@slatable/underline';
import {
  CreateNewProvider,
  Editor,
  CreateNewToolbar,
} from '@slatable/slate';
const formater = `${BoldToolbar.namespace}-${UnderlineToolbar.namespace}`;
const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container);
const [content, Provider, onChange] = CreateNewProvider(container, [
  type: 'P',
  children: [
    { text: 'some text ...' }
  ]
]);

// do some register for functions...
container.register(BoldFunction);
container.register(UnderlineFunction);

// do some register for toolbars...
container.toolbar.register(BoldToolbar);
container.toolbar.register(UnderlineToolbar);

// then render App
ReactDOM.redner(<APP />, document.getElementById('root'));

function App = () => {
  return (
    <Provider>
      <div className="editor-header"><ToolBar format={formater} /></div>
      <div className="editor-content">
        <Editor spellCheck autoFocus placeholder="请输入文章内容..." />
      </div>
    </Provider>
  );
}
```