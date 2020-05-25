import React from 'react';
import { NumberedListToolBar } from '@slatable/numbered-list';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { OrderedListOutlined } from '@ant-design/icons';

export function useNumberedList(container: SlateContainer) {
  NumberedListToolBar.icon = <Tooltip title="有序列表" placement="bottom"><OrderedListOutlined /></Tooltip>;
  container.toolbar.register(NumberedListToolBar);
  return NumberedListToolBar.namespace;
}