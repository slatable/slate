import React, { memo } from 'react';
import { ParagraphToolbar } from '@slatable/paragraph';
import { Menu, Dropdown } from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { ClickParam } from 'antd/lib/menu';
import { SlateContainer } from '@slatable/slate';

const TitleText = [
  '普通文本',
  '一级标题',
  '二级标题',
  '三级标题',
  '四级标题',
  '五级标题',
  '六级标题'
];

export function useParagraph(container: SlateContainer) {
  container.toolbar.register(ParagraphToolbar);
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
  });
  return ParagraphToolbar.namespace;
}