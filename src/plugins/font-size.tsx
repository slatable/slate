import React, { memo } from 'react';
import { FontSizeToolBar } from '@slatable/font-size';
import { SlateContainer } from '@slatable/slate';
import {  Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { CaretDownOutlined } from '@ant-design/icons';

export function useFontSize(container: SlateContainer) {
  FontSizeToolBar.component = memo(props => {
    const items: any[] = [];
    for (let i = 0; i < props.items.length; i++) {
      items.push(
        <Menu.Item 
          key={props.items[i]}
        >{props.items[i]}</Menu.Item>
      )
    }
    const menu = <Menu 
      selectedKeys={[props.selectedValue]} 
      onClick={(e: ClickParam) => props.click(e.key)}
    >{items}</Menu>;
    return <Dropdown overlay={menu} disabled={props.status === 'disabled'}>
      <div>
        <span>字号</span>
        <CaretDownOutlined style={{
          fontSize: '12px'
        }} />
      </div>
    </Dropdown>
  })
  container.toolbar.register(FontSizeToolBar);
  return FontSizeToolBar.namespace;
}