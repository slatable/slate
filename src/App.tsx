import './App.css';
import 'antd/dist/antd.css';
import React from 'react';

import { BoldToolBar } from '@slatable/bold';
import { ItalicToolBar, ItalicFunction } from '@slatable/italic';
<<<<<<< HEAD
import { ParagraphToolbar } from '@slatable/paragraph'
=======
import { ParagraphFunction, TitleToolbar } from '@slatable/paragraph';
>>>>>>> 75156cb37cc8bf54eda25b6d347fce2bb928ab09
import { TitleFunction } from '@slatable/title';
import { QuoteToolBar } from '@slatable/quote';
import { CodeToolBar } from '@slatable/code';
import { HrToolBar } from '@slatable/hr'

import { SlateContainer, CreateNewProvider, Editor, CreateNewToolbar, TToolbarFormatProps } from '@slatable/slate';
import { initContent } from './data';
import { Divider, Tooltip } from 'antd';
import { BoldOutlined, ItalicOutlined, NodeIndexOutlined, CodeOutlined, MinusOutlined } from '@ant-design/icons';

const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container, <Divider type="vertical" />);
const [state, titleFunc] = TitleFunction.useTitle(container, initContent, '朱自清 - 荷塘月色')
const Provider = CreateNewProvider(container, state);

container.on('content').subscribe(value => console.log('Editor Value:', value));

BoldToolBar.icon = <Tooltip title="加粗" placement="bottom"><BoldOutlined /></Tooltip>;
ItalicToolBar.icon = <Tooltip title="斜体" placement="bottom"><ItalicOutlined /></Tooltip>;
QuoteToolBar.icon = <Tooltip title="引用" placement="bottom"><NodeIndexOutlined /></Tooltip>;
CodeToolBar.icon = <Tooltip title="代码" placement="bottom"><CodeOutlined /></Tooltip>;
HrToolBar.icon = <Tooltip title="分割线" placement="bottom"><MinusOutlined /></Tooltip>;

container.toolbar.register(BoldToolBar);
container.toolbar.register(ItalicToolBar);
container.toolbar.register(ParagraphToolbar)
container.toolbar.register(QuoteToolBar);
container.toolbar.register(CodeToolBar);
container.toolbar.register(HrToolBar);

titleFunc.allow();
const formater: TToolbarFormatProps = [
  [
    [BoldToolBar.namespace],
    [ItalicToolBar.namespace]
  ],
  [
    [QuoteToolBar.namespace],
    [ParagraphToolbar.namespace]
  ]
];
function App() {
  return (
    <Provider>
      <div className="editor-header">
        <ToolBar format={formater} />
      </div>
      <div className="editor-content">
        <Editor spellCheck autoFocus container={container} placeholder="请输入文章内容..." className="article" />
      </div>
    </Provider>
  );
}

export default App;
