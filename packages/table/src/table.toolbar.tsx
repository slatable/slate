import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { TableFunction } from './table.function';
import { TableRowFunction } from './table-row.function';
import { TableCellFunction } from './table-cell.function';
import classnames from 'classnames';

export class TableToolBar extends SlateTool implements TSlateTool {
  static namespace = 'TableToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(TableFunction);
    this.register(TableRowFunction)
    this.register(TableCellFunction)
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + TableFunction.namespace);
      }
    }, [props.status]);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{TableToolBar.icon || 'T'}</span>;
  }

  componentTerminate() {
    this.unRegister(TableFunction);
  }


  componentCanActive(namespace: string) {
    return TableFunction.namespace === namespace
  }
}