import React from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { LineHeightFunction } from './line-height.function';
import classnames from 'classnames';
import { Dropdown, Menu } from 'antd';
import { ClickParam } from 'antd/lib/menu';

const alignData: {
  [key: string]: string
} = {
  'left': '左对齐',
  'center': '中对齐',
  'right': '右对齐'
}


export class LineHeightToolBar extends SlateTool implements TSlateTool {
  static namespace = 'LineHeightToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(LineHeightFunction);
  }

  render(props: TToolProps) {
    const onClick = (e: ClickParam) => {
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + LineHeightFunction.namespace, { align: e.key });
      }
    };

    const items = Object.keys(alignData).map(i => (<Menu.Item key={i}>{alignData[i]}</Menu.Item>));
    const menu = <Menu onClick={onClick}>{items}</Menu>;

    if (props.status !== 'disabled') { 
      return <div onMouseDown={e => e.preventDefault()}>
        <Dropdown overlay={menu}><span onMouseDown={e => e.preventDefault()} className={classnames(props.status, props.className)}>N</span></Dropdown>
      </div>
    }
    return <span className={classnames(props.status, props.className)}>{LineHeightToolBar.icon || 'N'}</span>;
  }

  componentTerminate() {
    this.unRegister(LineHeightFunction);
  }
}