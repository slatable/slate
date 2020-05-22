import React, { useCallback, Fragment } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { LinkFunction } from './link.function';
import classnames from 'classnames';
export class LinkToolBar extends SlateTool implements TSlateTool {
  static namespace = 'LinkToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(LinkFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + LinkFunction.namespace);
      }
    }, [props.status]);
    return <Fragment>
      <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{LinkToolBar.icon || 'L'}</span>
    </Fragment>;
  }

  componentTerminate() {
    this.unRegister(LinkFunction);
  }
}