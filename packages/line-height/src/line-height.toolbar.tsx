import React from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ParagraphFunction, H1Function, H2Function, H3Function, H4Function, H5Function, H6Function } from '@slatable/paragraph';
import { LineHeightFunction } from './line-height.function';
import classnames from 'classnames';
import { Editor } from 'slate';

const namspaces = [
  ParagraphFunction.namespace, 
  H1Function.namespace, 
  H2Function.namespace, 
  H3Function.namespace, 
  H4Function.namespace, 
  H5Function.namespace, 
  H6Function.namespace
];

export interface TLineHeightToolBarComponentProps {
  items: string[],
  click: (value: string) => void,
  selectedValue: string,
  status: 'actived' | 'normal' | 'disabled',
}
export type TLineHeightToolBarComponent = React.FunctionComponent<TLineHeightToolBarComponentProps>;

export class LineHeightToolBar extends SlateTool implements TSlateTool {
  static namespace = 'LineHeightToolbar';
  static icon: JSX.Element;
  static component: TLineHeightToolBarComponent;
  constructor(container: SlateContainer) {
    super(container);
    this.register(LineHeightFunction);
  }

  render(props: TToolProps<TLineHeightToolBarComponentProps['items']>) {
    let value = '1.75'
    const [match] = Editor.nodes(this.container.editor, {
      match: (node: any) => namspaces.indexOf(node.type) > -1
    });
    if(match) {
      const styles: any = match[0].style || []
      styles.forEach((style: string[]) => {
        if(style[0] === LineHeightFunction.namespace) {
          value = style[1];
        }
      })
    }

    const click = (value: string) => {
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + LineHeightFunction.namespace, { lineHeight: value });
      }
    };
    const Component = LineHeightToolBar.component

    return !Component ? null : <div onMouseDown={e => e.preventDefault()} className={classnames('line-height', props.status)}>
      <Component items={props.data} click={click} selectedValue={value} status={props.status} />
    </div>
  }

  componentTerminate() {
    this.unRegister(LineHeightFunction);
  }
}