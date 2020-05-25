import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { RedoFunction } from './redo.function';
import classnames from 'classnames';
export class RedoToolBar extends SlateTool implements TSlateTool {
  static namespace = 'RedoToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(RedoFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + RedoFunction.namespace);
      }
    }, [props.status]);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{RedoToolBar.icon || 'B'}</span>;
  }

  componentTerminate() {
    this.unRegister(RedoFunction);
  }
}