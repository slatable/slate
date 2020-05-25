import React from 'react';
import { CodeToolBar } from '@slatable/code';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { CodeOutlined } from '@ant-design/icons';

export function useCode(container: SlateContainer) {
  CodeToolBar.icon = <Tooltip title="代码" placement="bottom"><CodeOutlined /></Tooltip>;
  container.toolbar.register(CodeToolBar);
  return CodeToolBar.namespace;
}