import React from 'react';
import { BackgroundColorToolBar } from '@slatable/background-color';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';

export function useBackgroundColor(container: SlateContainer) {
  BackgroundColorToolBar.icon = <Tooltip title="背景颜色" placement="bottom"><BgColorsOutlined /></Tooltip>;
  container.toolbar.register(BackgroundColorToolBar);
  return BackgroundColorToolBar.namespace;
}