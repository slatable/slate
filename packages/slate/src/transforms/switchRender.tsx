import React, { memo } from 'react';
import { SlateContainer } from '../container';
import { TLeafRenderProps } from './leafElement';
import { TElementRenderProps, ElementRender } from './elementRender';

export interface SwitchRenderProps extends TLeafRenderProps,TElementRenderProps {}

export function SwtichRender(container: SlateContainer): React.FunctionComponent<SwitchRenderProps> {
  const ElementRenderer = ElementRender(container);
  return memo(props => {
    if (props.element) return <ElementRenderer {...props} />;
    let children = props.children;
    if (props.leaf) {
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
    }
    return <span {...props.attributes}>{children}</span>;
  });
}