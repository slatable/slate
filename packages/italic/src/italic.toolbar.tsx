import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ItalicFunction } from './italic.function';
import classnames from 'classnames';
export class ItalicToolBar extends SlateTool implements TSlateTool {
  static namespace = 'ItalicToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(ItalicFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + ItalicFunction.namespace);
      }
    }, []);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{ItalicToolBar.icon || 'I'}</span>;
  }

  componentTerminate() {
    this.unRegister(ItalicFunction);
  }
}