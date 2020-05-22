import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { HrFunction } from './hr.function';
import classnames from 'classnames';
export class HrToolBar extends SlateTool implements TSlateTool {
  static namespace = 'HrToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(HrFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + HrFunction.namespace);
      }
    }, []);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{HrToolBar.icon || 'H'}</span>;
  }

  componentTerminate() {
    this.unRegister(HrFunction);
  }
}