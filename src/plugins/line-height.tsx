import React, { memo } from 'react';
import { LineHeightToolBar } from '@slatable/line-height';
import { Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import { ClickParam } from 'antd/lib/menu';
import { SlateContainer } from '@slatable/slate';

export function useLineHeight(container: SlateContainer) {
  container.toolbar.register(LineHeightToolBar);
  LineHeightToolBar.component = memo(props => {
    const items: any[] = [];
    for (let i = 0; i < props.items.length; i++) {
      items.push(
        <Menu.Item 
          key={props.items[i]}
        >{props.items[i]}</Menu.Item>
      )
    }
    if (props.items.indexOf('1.75') === -1) {
      items.push(
        <Menu.Item 
          key={'1.75'}
        >1.75</Menu.Item>
      )
    }
    const menu = <Menu 
      selectedKeys={[props.selectedValue]} 
      onClick={(e: ClickParam) => props.click(e.key)}
    >{items}</Menu>;
    return <Dropdown overlay={menu} disabled={props.status === 'disabled'}>
      <div>
        <span>{props.selectedValue}</span>
        <CaretDownOutlined style={{
          fontSize: '12px'
        }} />
      </div>
    </Dropdown>
  })
  return LineHeightToolBar.namespace;
}