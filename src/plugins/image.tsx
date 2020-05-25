import React from 'react';
import { ImgToolBar } from '@slatable/img';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

export function useImage(container: SlateContainer) {
  ImgToolBar.icon = <Tooltip title="上传图片" placement="bottom"><FileImageOutlined /></Tooltip>
  container.toolbar.register(ImgToolBar);
  return ImgToolBar.namespace;
}