import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ColorFunction } from './color.function';
import classnames from 'classnames';

export interface TColorToolBarComponentProps {
  click: (value: string) => void,
  selectedValue: string,
  status: 'actived' | 'normal' | 'disabled',
}
export type TColorToolBarComponent = React.FunctionComponent<TColorToolBarComponentProps>;

export class ColorToolBar extends SlateTool implements TSlateTool {
  static namespace = 'ColorToolbar';
  static icon: JSX.Element;
  static component: TColorToolBarComponent;
  constructor(container: SlateContainer) {
    super(container);
    this.register(ColorFunction);
  }

  render(props: TToolProps) {
    const [, color] = this.container.useRangeLeaf(ColorFunction.namespace)
    const click = useCallback((color: string) => {
      this.container.cast('editor:' + ColorFunction.namespace, { color });
    }, [])

    const Component = ColorToolBar.component

    return !Component ? null : <div onMouseDown={e => e.preventDefault()} className={classnames(props.status)}>
      <Component click={click} selectedValue={color} status={props.status} />
    </div>
  }

  componentTerminate() {
    this.unRegister(ColorFunction);
  }
}