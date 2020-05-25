import React, { useCallback } from 'react';
import { Editor } from 'slate';
import { SlateContainer, TSlateTool, SlateTool, TToolProps } from '@slatable/slate';
import { ParagraphFunction } from './paragraph.function';
import { H1Function } from './h1.function';
import { H2Function } from './h2.function';
import { H3Function } from './h3.function';
import { H4Function } from './h4.function';
import { H5Function } from './h5.function';
import { H6Function } from './h6.function';
import classnames from 'classnames'

const namspaces = [
  ParagraphFunction.namespace, 
  H1Function.namespace, 
  H2Function.namespace, 
  H3Function.namespace, 
  H4Function.namespace, 
  H5Function.namespace, 
  H6Function.namespace
];

export interface TParagraphToolbarComponentProps {
  items: number[],
  click: (idx: number) => void,
  selectedIndex: number,
  status: 'actived' | 'normal' | 'disabled',
}
export type TParagraphToolbarComponent = React.FunctionComponent<TParagraphToolbarComponentProps>;

export class ParagraphToolbar extends SlateTool implements TSlateTool {
  static readonly namespace = 'ParagraphToolbar';
  static component: TParagraphToolbarComponent;
  constructor(container: SlateContainer) {
    super(container);
    this.register(H1Function);
    this.register(H2Function);
    this.register(H3Function);
    this.register(H4Function);
    this.register(H5Function);
    this.register(H6Function);
    this.register(ParagraphFunction);
  }

  render(props: TToolProps<TParagraphToolbarComponentProps['items']>): JSX.Element {
    let index = 0;
    const Component = ParagraphToolbar.component;
    // const click = useCallback((which: number) => {
    //   if (props.status !== 'disabled') {
    //     this.container.cast('editor:' + namspaces[which]);
    //   }
    // }, []);

    const click = (which: number) => {
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + namspaces[which]);
      }
    }

    const [match] = Editor.nodes(this.container.editor, {
      match: (node: any) => namspaces.indexOf(node.type) > -1
    });
    if (match) index = namspaces.indexOf(match[0].type as string);
    if (index === -1) index = 0;
    return !Component ? null : <div onMouseDown={e => e.preventDefault()} className={classnames('paragraph', props.status)}>
      <Component items={props.data} click={click} selectedIndex={index} status={props.status} />
    </div>;
  }

  componentTerminate() {
    this.unRegister(ParagraphFunction);
    this.unRegister(H6Function);
    this.unRegister(H5Function);
    this.unRegister(H4Function);
    this.unRegister(H3Function);
    this.unRegister(H2Function);
    this.unRegister(H1Function);
  }
}