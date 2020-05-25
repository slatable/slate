import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ListItemFunction } from '@slatable/list-item';
import { BulletedListFunction } from './bulleted-list.function';
import classnames from 'classnames';

export class BulletedListToolBar extends SlateTool implements TSlateTool {
  static namespace = 'BulletedListToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(BulletedListFunction);
    this.register(ListItemFunction)
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + BulletedListFunction.namespace);
      }
    }, [props.status]);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{BulletedListToolBar.icon || 'U'}</span>;
  }

  componentTerminate() {
    this.unRegister(BulletedListFunction);
  }
}