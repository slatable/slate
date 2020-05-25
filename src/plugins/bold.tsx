import React from 'react';
import { BoldToolBar } from '@slatable/bold';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { BoldOutlined } from '@ant-design/icons';

export function useBold(container: SlateContainer) {
  BoldToolBar.icon = <Tooltip title="加粗" placement="bottom"><BoldOutlined /></Tooltip>;
  container.toolbar.register(BoldToolBar);
  return BoldToolBar.namespace;
}