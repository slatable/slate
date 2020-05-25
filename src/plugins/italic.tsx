import React from 'react';
import { ItalicToolBar } from '@slatable/italic';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { ItalicOutlined } from '@ant-design/icons';

export function useItalic(container: SlateContainer) {
  ItalicToolBar.icon = <Tooltip title="斜体" placement="bottom"><ItalicOutlined /></Tooltip>;
  container.toolbar.register(ItalicToolBar);
  return ItalicToolBar.namespace;
}