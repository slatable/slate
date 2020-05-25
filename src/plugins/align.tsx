import React, { memo } from 'react';
import { AlignToolBar, TAlignValue } from '@slatable/align';
import { Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import { SlateContainer } from '@slatable/slate';

enum ALIGN_TEXT {
  left = '左对齐',
  center = '中对齐',
  right = '右对齐',
}

export function useAlign(container: SlateContainer) {
  container.toolbar.register(AlignToolBar);
  AlignToolBar.component = memo(props => {
    const items: any[] = [];
    for (let i = 0; i < props.items.length; i++) {
      items.push(
        <Menu.Item 
          key={props.items[i]}
        >{ALIGN_TEXT[props.items[i]]}</Menu.Item>
      )
    }
    if (props.items.indexOf('left') === -1) {
      items.push(
        <Menu.Item 
          key={'left'}
        >{ALIGN_TEXT.left}</Menu.Item>
      )
    }
    const menu = <Menu 
      selectedKeys={[props.selectedValue]} 
      onClick={(e: ClickParam) => props.click(e.key as TAlignValue)}
    >{items}</Menu>;
    return <Dropdown overlay={menu} disabled={props.status === 'disabled'}>
      <div>
        <span>{ALIGN_TEXT[props.selectedValue]}</span>
        <CaretDownOutlined style={{
          fontSize: '12px'
        }} />
      </div>
    </Dropdown>
  })
  return AlignToolBar.namespace;
}