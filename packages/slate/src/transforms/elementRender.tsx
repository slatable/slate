import React, { memo } from 'react';
import { SlateContainer } from '../container';
import { Node } from 'slate';
import { TLeafNode } from './leafElement';

export type TElementNode = Node & {
  id: string,
  style?: [string, any][],
  type: string,
  children: (TLeafNode | TElementNode)[],
}

export interface TElementRenderProps {
  attributes: { [key: string]: string },
  children: React.ReactElement,
  element: TElementNode,
}

export function ElementRender(container: SlateContainer): React.FunctionComponent<TElementRenderProps> {
  return memo(props => {
    if (container.functions.has(props.element.type)) return <p id={props.element.id} key={props.element.id} {...props.attributes}>{props.children}</p>;
    const object = container.functions.get(props.element.type);
    if (!object || !object.componentRenderNodes) return <p id={props.element.id} key={props.element.id} {...props.attributes}>{props.children}</p>;
    const styles = (props.element.style || [])
      .filter(style => container.functions.has(style[0]) && container.functions.get(style[0]).type === 'attr')
      .map(style => container.functions.get(style[0]).componentRenderStyle(style[1]))
      .reduce((value, style) => Object.assign(value, style), {});
    const data = object.componentRenderInterceptor ? object.componentRenderInterceptor(container, props) : null;
    return object.componentRenderNodes(styles, props, data) || null;
  });
}