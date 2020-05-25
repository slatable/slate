import React from 'react';
import { TableToolBar } from '@slatable/table';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { TableOutlined } from '@ant-design/icons';

export function useTable(container: SlateContainer) {
  TableToolBar.icon = <Tooltip title="表格" placement="bottom"><TableOutlined /></Tooltip>;
  container.toolbar.register(TableToolBar);
  return TableToolBar.namespace;
}