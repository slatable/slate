import React from 'react';
import { RedoToolBar } from '@slatable/redo';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { RedoOutlined } from '@ant-design/icons';

export function useRedo(container: SlateContainer) {
  RedoToolBar.icon = <Tooltip title="回退" placement="bottom"><RedoOutlined /></Tooltip>;
  container.toolbar.register(RedoToolBar);
  return RedoToolBar.namespace;
}