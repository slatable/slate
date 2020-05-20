import React from 'react';
import { BoldToolBar } from '../packages/bold';
import { SlateContainer, CreateNewProvider, Editor, CreateNewToolbar } from '../packages/slate';

const initContent = [
  {
    type: 'P',
    children: [
      { text: 'some text ...' }
    ]
  }
];

const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container);
const [content, Provider, onChange] = CreateNewProvider(container, initContent);
onChange(() => console.log('editor onchanged:', content));

container.toolbar.register(BoldToolBar);

function App() {
  return (
    <Provider>
      <div className="editor-header"><ToolBar format={BoldToolBar.namespace} /></div>
      <div className="editor-content">
        <Editor spellCheck autoFocus container={container} errorComponent={<ErrorComponent />} placeholder="请输入文章内容..." />
      </div>
    </Provider>
  );
}

function ErrorComponent() {
  return <div>error</div>;
}

export default App;
