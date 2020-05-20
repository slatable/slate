import React from 'react';

export type TLeafNode = {
  text: string,
  [key: string]: any,
}

export interface TLeafRenderProps {
  attributes: { [key: string]: string },
  children: React.ReactElement,
  leaf: TLeafNode,
}