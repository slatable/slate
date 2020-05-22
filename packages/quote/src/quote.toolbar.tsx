import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { QuoteFunction } from './quote.function';
import classnames from 'classnames';
export class QuoteToolBar extends SlateTool implements TSlateTool {
  static namespace = 'QuoteToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(QuoteFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + QuoteFunction.namespace);
      }
    }, []);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{QuoteToolBar.icon || 'Q'}</span>;
  }

  componentTerminate() {
    this.unRegister(QuoteFunction);
  }
}