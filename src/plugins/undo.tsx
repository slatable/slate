import React from 'react';
import { UndoToolBar } from '@slatable/undo';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { UndoOutlined } from '@ant-design/icons';

export function useUndo(container: SlateContainer) {
  UndoToolBar.icon = <Tooltip title="撤销" placement="bottom"><UndoOutlined /></Tooltip>;
  container.toolbar.register(UndoToolBar);
  return UndoToolBar.namespace;
}