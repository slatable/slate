import React, { memo } from 'react';
import { FontFamilyToolBar } from '@slatable/font-family';
import { SlateContainer } from '@slatable/slate';
import {  Menu, Dropdown } from 'antd';
import { ClickParam } from 'antd/lib/menu';
import { CaretDownOutlined } from '@ant-design/icons';

export function useFontFamily(container: SlateContainer) {
  FontFamilyToolBar.component = memo(props => {
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
        <span>字体</span>
        <CaretDownOutlined style={{
          fontSize: '12px'
        }} />
      </div>
    </Dropdown>
  })
  container.toolbar.register(FontFamilyToolBar);
  return FontFamilyToolBar.namespace;
}