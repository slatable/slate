import './App.css';
import 'antd/dist/antd.css';
import React from 'react';

import { BoldToolBar } from '@slatable/bold';
import { ItalicToolBar, ItalicFunction } from '@slatable/italic';
import { TitleFunction } from '@slatable/title';
import { QuoteToolBar } from '@slatable/quote';

import { SlateContainer, CreateNewProvider, Editor, CreateNewToolbar, TToolbarFormatProps } from '@slatable/slate';
import { initContent } from './data';
import { Divider } from 'antd';
import { BoldOutlined, ItalicOutlined, NodeIndexOutlined } from '@ant-design/icons';

const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container, <Divider type="vertical" />);
const [state, titleFunc] = TitleFunction.useTitle(container, initContent, '朱自清 - 荷塘月色')
const Provider = CreateNewProvider(container, state);

container.on('content').subscribe(value => console.log('Editor Value:', value));

BoldToolBar.icon = <BoldOutlined />;
ItalicToolBar.icon = <ItalicOutlined />;
QuoteToolBar.icon = <NodeIndexOutlined />;

container.toolbar.register(BoldToolBar);
container.toolbar.register(ItalicToolBar);
container.toolbar.register(QuoteToolBar);

titleFunc.allow(ItalicFunction);
const formater: TToolbarFormatProps = [
  [
    [BoldToolBar.namespace],
    [ItalicToolBar.namespace]
  ],
  [
    [QuoteToolBar.namespace]
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
