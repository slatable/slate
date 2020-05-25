import React from 'react';
import { UnderlineToolBar } from '@slatable/underline';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { UnderlineOutlined } from '@ant-design/icons';

export function useUnderline(container: SlateContainer) {
  UnderlineToolBar.icon = <Tooltip title="下划线" placement="bottom"><UnderlineOutlined /></Tooltip>;
  container.toolbar.register(UnderlineToolBar);
  return UnderlineToolBar.namespace;
}