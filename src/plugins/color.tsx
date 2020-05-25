import React from 'react';
import { ColorToolBar } from '@slatable/color';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { FontColorsOutlined } from '@ant-design/icons';

export function useColor(container: SlateContainer) {
  ColorToolBar.icon = <Tooltip title="字体颜色" placement="bottom"><FontColorsOutlined /></Tooltip>;
  container.toolbar.register(ColorToolBar);
  return ColorToolBar.namespace;
}