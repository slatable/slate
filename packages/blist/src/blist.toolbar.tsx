import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ListFunction } from '@slatable/list'
import { BlistFunction } from './blist.function';
import classnames from 'classnames';
export class BlistToolBar extends SlateTool implements TSlateTool {
  static namespace = 'BlistToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(BlistFunction);
    this.register(ListFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + BlistFunction.namespace);
      }
    }, []);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{BlistToolBar.icon || 'UL'}</span>;
  }

  componentTerminate() {
    this.unRegister(BlistFunction);
    this.unRegister(ListFunction);
  }
}