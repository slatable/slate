import React from 'react';
import { HrToolBar } from '@slatable/hr';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

export function useHr(container: SlateContainer) {
  HrToolBar.icon = <Tooltip title="分割线" placement="bottom"><MinusOutlined /></Tooltip>;
  container.toolbar.register(HrToolBar);
  return HrToolBar.namespace;
}