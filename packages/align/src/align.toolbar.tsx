import React from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ParagraphFunction, H1Function, H2Function, H3Function, H4Function, H5Function, H6Function } from '@slatable/paragraph';
import { AlignFunction } from './align.function';
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

export type TAlignValue = 'left' | 'right' | 'center';

export interface TAlignToolBarComponentProps {
  items: TAlignValue[],
  click: (value: TAlignValue) => void,
  selectedValue: TAlignValue,
  status: 'actived' | 'normal' | 'disabled',
}
export type TAlignToolBarComponent = React.FunctionComponent<TAlignToolBarComponentProps>;

export class AlignToolBar extends SlateTool implements TSlateTool {
  static namespace = 'AlignToolbar';
  static icon: JSX.Element;
  static component: TAlignToolBarComponent;
  constructor(container: SlateContainer) {
    super(container);
    this.register(AlignFunction);
  }

  render(props: TToolProps<TAlignToolBarComponentProps['items']>) {
    let value: TAlignValue = 'left';
    const [match] = Editor.nodes(this.container.editor, {
      match: (node: any) => namspaces.indexOf(node.type) > -1
    });
    if(match) {
      const styles = (match[0].style || []) as [string, TAlignValue][];
      styles.forEach((style) => {
        if(style[0] === AlignFunction.namespace) {
          value = style[1];
        }
      })
    }

    const click = (value: string) => {
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + AlignFunction.namespace, { align: value });
      }
    };
    const Component = AlignToolBar.component

    return !Component ? null : <div onMouseDown={e => e.preventDefault()} className={classnames('align', props.status)}>
      <Component items={props.data} click={click} selectedValue={value} status={props.status} />
    </div>
  }

  componentTerminate() {
    this.unRegister(AlignFunction);
  }
}