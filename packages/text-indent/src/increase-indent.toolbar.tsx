import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ParagraphFunction, H1Function, H2Function, H3Function, H4Function, H5Function, H6Function } from '@slatable/paragraph';
import { TextIndentFunction } from './text-indent.function';
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


export class IncreaseIndentToolBar extends SlateTool implements TSlateTool {
  static namespace = 'IncreaseIndentToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(TextIndentFunction);
  }

  render(props: TToolProps) {
    let value = '0'
    const [match] = Editor.nodes(this.container.editor, {
      match: (node: any) => namspaces.indexOf(node.type) > -1
    });
    if(match) {
      const styles: any = match[0].style || []
      styles.forEach((style: string[]) => {
        if(style[0] === TextIndentFunction.namespace) {
          value = style[1];
        }
      })
    }

    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + TextIndentFunction.namespace, { textIndent: Number(value) + 2 });
      }
    }, [props.status, value]);


    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{IncreaseIndentToolBar.icon || 'D'}</span>;
  }

  componentTerminate() {
    this.unRegister(TextIndentFunction);
  }
}