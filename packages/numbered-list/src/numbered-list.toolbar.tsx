import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ListItemFunction } from '@slatable/list-item';
import { NumberedListFunction } from './numbered-list.function';
import classnames from 'classnames';

export class NumberedListToolBar extends SlateTool implements TSlateTool {
  static namespace = 'NumberedListToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(NumberedListFunction);
    this.register(ListItemFunction)
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + NumberedListFunction.namespace);
      }
    }, [props.status]);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{NumberedListToolBar.icon || 'O'}</span>;
  }

  componentTerminate() {
    this.unRegister(NumberedListFunction);
  }

  componentCanActive(namespace: string) {
    return NumberedListFunction.namespace === namespace
  }
}