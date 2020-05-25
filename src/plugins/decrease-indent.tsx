import React from 'react';
import { DecreaseIndentToolBar } from '@slatable/text-indent';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { MenuFoldOutlined } from '@ant-design/icons';

export function useDecreaseIndent(container: SlateContainer) {
  DecreaseIndentToolBar.icon = <Tooltip title="左缩进" placement="bottom"><MenuFoldOutlined /></Tooltip>;
  container.toolbar.register(DecreaseIndentToolBar);
  return DecreaseIndentToolBar.namespace;
}