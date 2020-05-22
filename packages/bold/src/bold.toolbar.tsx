import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { BoldFunction } from './bold.function';
import classnames from 'classnames';
export class BoldToolBar extends SlateTool implements TSlateTool {
  static namespace = 'BoldToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(BoldFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + BoldFunction.namespace);
      }
    }, [props.status]);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{BoldToolBar.icon || 'B'}</span>;
  }

  componentTerminate() {
    this.unRegister(BoldFunction);
  }
}