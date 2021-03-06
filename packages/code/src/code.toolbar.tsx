import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { CodeFunction } from './code.function';
import classnames from 'classnames';
export class CodeToolBar extends SlateTool implements TSlateTool {
  static namespace = 'CodeToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(CodeFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + CodeFunction.namespace);
      }
    }, []);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{CodeToolBar.icon || 'C'}</span>;
  }

  componentTerminate() {
    this.unRegister(CodeFunction);
  }
}