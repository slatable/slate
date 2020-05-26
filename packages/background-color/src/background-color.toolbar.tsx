import React from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { BackgroundColorFunction } from './background-color.function';
import classnames from 'classnames';

export interface TBackgroundColorToolBarComponentProps {
  click: (value: string) => void,
  selectedValue: string,
  status: 'actived' | 'normal' | 'disabled',
}
export type TBackgroundColorToolBarComponent = React.FunctionComponent<TBackgroundColorToolBarComponentProps>;

export class BackgroundColorToolBar extends SlateTool implements TSlateTool {
  static namespace = 'BackgroundColorToolbar';
  static icon: JSX.Element;
  static component: TBackgroundColorToolBarComponent;
  constructor(container: SlateContainer) {
    super(container);
    this.register(BackgroundColorFunction);
  }

  render(props: TToolProps) {
    const [, color] = this.container.useRangeLeaf(BackgroundColorFunction.namespace)
    const click = (color: string) => {
      this.container.cast('editor:' + BackgroundColorFunction.namespace, { color });
    }

    const Component = BackgroundColorToolBar.component

    return !Component ? null : <div onMouseDown={e => e.preventDefault()} className={classnames(props.status)}>
      <Component click={click} selectedValue={color} status={props.status} />
    </div>
  }

  componentTerminate() {
    this.unRegister(BackgroundColorFunction);
  }
}