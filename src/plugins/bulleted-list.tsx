import React from 'react';
import { BulletedListToolBar } from '@slatable/bulleted-list';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

export function useBulletedList(container: SlateContainer) {
  BulletedListToolBar.icon = <Tooltip title="无序列表" placement="bottom"><UnorderedListOutlined /></Tooltip>;
  container.toolbar.register(BulletedListToolBar);
  return BulletedListToolBar.namespace;
}