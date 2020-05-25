import React from 'react';
import { QuoteToolBar } from '@slatable/quote';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { NodeIndexOutlined } from '@ant-design/icons';

export function useQuote(container: SlateContainer) {
  QuoteToolBar.icon = <Tooltip title="引用" placement="bottom"><NodeIndexOutlined /></Tooltip>;
  container.toolbar.register(QuoteToolBar);
  return QuoteToolBar.namespace;
}