import React from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { FontSizeFunction } from './font-size.function';
import classnames from 'classnames';

export interface TFontSizeToolBarComponentProps {
  items: string[],
  click: (value: string) => void,
  selectedValue: string,
  status: 'actived' | 'normal' | 'disabled',
}
export type TFontSizeToolBarComponent = React.FunctionComponent<TFontSizeToolBarComponentProps>;

export class FontSizeToolBar extends SlateTool implements TSlateTool {
  static namespace = 'FontSizeToolbar';
  static icon: JSX.Element;
  static component: TFontSizeToolBarComponent;
  constructor(container: SlateContainer) {
    super(container);
    this.register(FontSizeFunction);
  }

  render(props: TToolProps) {
    const [, value] = this.container.useRangeLeaf(FontSizeFunction.namespace)
    const click = (value: string) => {
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + FontSizeFunction.namespace, { fontSize: value });
      }
    };

    const Component = FontSizeToolBar.component

    return !Component ? null : <div onMouseDown={e => e.preventDefault()} className={classnames('font-size', props.status)}>
      <Component items={props.data} click={click} selectedValue={value} status={props.status} />
    </div>
  }

  componentTerminate() {
    this.unRegister(FontSizeFunction);
  }
}