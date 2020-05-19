import React, { memo } from 'react';
import { SlateContainer } from '../container';

export type TLeafNode = {
  text: string,
  [key: string]: any,
}

export interface TLeafRenderProps {
  attributes: { [key: string]: string },
  children: React.ReactElement,
  leaf: TLeafNode,
}

export function LeafRender(container: SlateContainer): React.FunctionComponent<TLeafRenderProps> {
  return memo(props => {
    let children = props.children;
    for (const key in props.leaf) {
      if (container.functions.has(key)) {
        const object = container.functions.get(key);
        const data = object.componentRenderInterceptor ? object.componentRenderInterceptor(container, props) : null;
        children = object.componentRenderNodes({}, {
          attributes: props.attributes,
          children,
          leaf: props.leaf
        }, data);
      }
    }
    return <React.Fragment>{children}</React.Fragment>;
  });
}