import './App.css';
import React from 'react';
import { BoldToolBar } from '@slatable/bold';
import { TitleFunction } from '@slatable/title';
import { SlateContainer, CreateNewProvider, Editor, CreateNewToolbar } from '@slatable/slate';
import { initContent } from './data';

const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container);
const Provider = CreateNewProvider(container, TitleFunction.useTitle('朱自清 - 荷塘月色', initContent));

container.on('content').subscribe(value => console.log('Editor Value:', value));

// BoldToolBar.icon = <div>贾村</div>
container.toolbar.register(BoldToolBar);

function App() {
  return (
    <Provider>
      <div className="editor-header"><ToolBar format={BoldToolBar.namespace} /></div>
      <div className="editor-content">
        <Editor spellCheck autoFocus container={container} placeholder="请输入文章内容..." className="article" />
      </div>
    </Provider>
  );
}

export default App;
