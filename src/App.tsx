import React from 'react';
import { BoldToolBar } from '@slatable/bold';
import { SlateContainer, CreateNewProvider, Editor, CreateNewToolbar } from '@slatable/slate';

const initContent = [
  {
    id: '5e53c7e4-323c-4dbf-af59-fe821c6d759a',
    type: 'P',
    children: [
      { text: 'some text ...' }
    ]
  }
];

const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container);
const Provider = CreateNewProvider(container, initContent);

container.on('content').subscribe(value => console.log('Editor Value:', value));

// BoldToolBar.icon = <div>贾村</div>
container.toolbar.register(BoldToolBar);

function App() {
  return (
    <Provider>
      <div className="editor-header"><ToolBar format={BoldToolBar.namespace} /></div>
      <div className="editor-content">
        <Editor spellCheck autoFocus container={container} placeholder="请输入文章内容..." />
      </div>
    </Provider>
  );
}

export default App;
