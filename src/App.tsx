import './App.css';
import 'antd/dist/antd.css';
import React, { memo } from 'react';

import { BoldToolBar } from '@slatable/bold';
import { ItalicToolBar } from '@slatable/italic';
import { ParagraphToolbar } from '@slatable/paragraph';
import { TitleFunction } from '@slatable/title';
import { QuoteToolBar } from '@slatable/quote';
import { CodeToolBar } from '@slatable/code';
import { HrToolBar } from '@slatable/hr';
import classnames from 'classnames';

import { SlateContainer, CreateNewProvider, Editor, CreateNewToolbar, TToolbarFormatProps } from '@slatable/slate';
import { initContent } from './data';
import { Divider, Tooltip, Menu, Dropdown } from 'antd';
import { BoldOutlined, ItalicOutlined, NodeIndexOutlined, CodeOutlined, MinusOutlined, CaretDownOutlined, CheckOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';

const TitleText = [
  '普通文本',
  '一级标题',
  '二级标题',
  '三级标题',
  '四级标题',
  '五级标题',
  '六级标题'
];

const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container, <Divider type="vertical" />);
const [state, titleFunc] = TitleFunction.useTitle(container, initContent, '朱自清 - 荷塘月色')
const Provider = CreateNewProvider(container, state);

ParagraphToolbar.component = memo(props => {
  const items: any[] = [];
  for (let i = 0; i < props.items.length; i++) {
    items.push(
      <Menu.Item 
        className={classnames('paragraph_item', 'paragraph_item_' + props.items[i])} 
        key={props.items[i]}
      >{TitleText[props.items[i]]}</Menu.Item>
    )
  }
  if (props.items.indexOf(0) === -1) {
    items.push(
      <Menu.Item 
        className={classnames('paragraph_item', 'paragraph_item_0')} 
        key={0}
      >{TitleText[0]}</Menu.Item>
    )
  }
  const menu = <Menu 
    selectedKeys={[props.selectedIndex + '']} 
    onClick={(e: ClickParam) => props.click(Number(e.key))}
  >{items}</Menu>;
  return <Dropdown overlay={menu} disabled={props.status === 'disabled'}>
    <div className="paragraph_placehoder">
      <span>{TitleText[props.selectedIndex]}</span>
      <CaretDownOutlined style={{
        fontSize: '12px'
      }} />
    </div>
  </Dropdown>
})

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
    [CodeToolBar.namespace],
    [HrToolBar.namespace],
    [ParagraphToolbar.namespace, [1, 3, 5, 6]]
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
