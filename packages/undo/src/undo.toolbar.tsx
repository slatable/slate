import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { UndoFunction } from './undo.function';
import classnames from 'classnames';
export class UndoToolBar extends SlateTool implements TSlateTool {
  static namespace = 'UndoToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(UndoFunction);
  }

  render(props: TToolProps) {
    let status = (this.container.editor.history as any).undos.length > 0 ? 'normal' : 'disabled';
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      this.container.cast('editor:' + UndoFunction.namespace);
    }, []);
    return <span onMouseDown={onClick} className={classnames(status, props.className)}>{UndoToolBar.icon || 'U'}</span>;
  }

  componentTerminate() {
    this.unRegister(UndoFunction);
  }
}