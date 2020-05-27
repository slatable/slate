import React from 'react';
import { ImgEditorToolBar } from '@slatable/img-editor';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { FileImageOutlined } from '@ant-design/icons';

export function useImageEditor(container: SlateContainer) {
  ImgEditorToolBar.icon = <Tooltip title="上传图片" placement="bottom"><FileImageOutlined /></Tooltip>
  container.toolbar.register(ImgEditorToolBar);
  return ImgEditorToolBar.namespace;
}