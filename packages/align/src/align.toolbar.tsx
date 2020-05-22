import React from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { AlignFunction } from './align.function';
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


export class AlignToolBar extends SlateTool implements TSlateTool {
  static namespace = 'AlignToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(AlignFunction);
  }

  render(props: TToolProps) {
    const onClick = (e: ClickParam) => {
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + AlignFunction.namespace, { align: e.key });
      }
    };

    const items = Object.keys(alignData).map(i => (<Menu.Item key={i}>{alignData[i]}</Menu.Item>));
    const menu = <Menu onClick={onClick}>{items}</Menu>;

    if (props.status !== 'disabled') { 
      return<Dropdown overlay={menu}><span onMouseDown={e => e.preventDefault()} className={classnames(props.status, props.className)}>N</span></Dropdown>
    }
    return <span className={classnames(props.status, props.className)}>{AlignToolBar.icon || 'N'}</span>;
  }

  componentTerminate() {
    this.unRegister(AlignFunction);
  }
}