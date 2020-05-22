import './App.css';
import React from 'react';
import { BoldToolBar } from '@slatable/bold';
import { ItalicToolBar, ItalicFunction } from '@slatable/italic';
import { TitleFunction } from '@slatable/title';
import { SlateContainer, CreateNewProvider, Editor, CreateNewToolbar, TToolbarFormatProps } from '@slatable/slate';
import { initContent } from './data';

const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container);
const [state, titleFunc] = TitleFunction.useTitle(container, initContent, '朱自清 - 荷塘月色')
const Provider = CreateNewProvider(container, state);

container.on('content').subscribe(value => console.log('Editor Value:', value));

// BoldToolBar.icon = <div>贾村</div>
container.toolbar.register(BoldToolBar);
container.toolbar.register(ItalicToolBar);

titleFunc.allow(ItalicFunction);
const formater: TToolbarFormatProps = [
  [
    [BoldToolBar.namespace],
    [ItalicToolBar.namespace]
  ]
];
function App() {
  return (
    <Provider>
      <div className="editor-header"><ToolBar format={formater} /></div>
      <div className="editor-content">
        <Editor spellCheck autoFocus container={container} placeholder="请输入文章内容..." className="article" />
      </div>
    </Provider>
  );
}

export default App;
