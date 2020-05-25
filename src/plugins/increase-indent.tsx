import React from 'react';
import { IncreaseIndentToolBar } from '@slatable/text-indent';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { MenuUnfoldOutlined } from '@ant-design/icons';

export function useIncreaseIndent(container: SlateContainer) {
  IncreaseIndentToolBar.icon = <Tooltip title="右缩进" placement="bottom"><MenuUnfoldOutlined /></Tooltip>;
  container.toolbar.register(IncreaseIndentToolBar);
  return IncreaseIndentToolBar.namespace;
}