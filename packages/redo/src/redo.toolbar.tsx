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
    let status = (this.container.editor.history as any).redos.length > 0 ? 'normal' : 'disabled';
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      this.container.cast('editor:' + RedoFunction.namespace);
    }, []);
    return <span onMouseDown={onClick} className={classnames(status, props.className)}>{RedoToolBar.icon || 'R'}</span>;
  }

  componentTerminate() {
    this.unRegister(RedoFunction);
  }
}