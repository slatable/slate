import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { UnderlineFunction } from './underline.function';
import classnames from 'classnames';
export class UnderlineToolBar extends SlateTool implements TSlateTool {
  static namespace = 'UnderlineToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(UnderlineFunction);
  }

  render(props: TToolProps) {
    const onClick = useCallback((e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
      e.preventDefault();
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + UnderlineFunction.namespace);
      }
    }, [props.status]);
    return <span onMouseDown={onClick} className={classnames(props.status, props.className)}>{UnderlineToolBar.icon || 'U'}</span>;
  }

  componentTerminate() {
    this.unRegister(UnderlineFunction);
  }
}