import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { FontFamilyFunction } from './font-family.function';
import classnames from 'classnames';

export interface TFontFamilyToolBarComponentProps {
  items: string[],
  click: (value: string) => void,
  selectedValue: string,
  status: 'actived' | 'normal' | 'disabled',
}
export type TFontFamilyToolBarComponent = React.FunctionComponent<TFontFamilyToolBarComponentProps>;

export class FontFamilyToolBar extends SlateTool implements TSlateTool {
  static namespace = 'FontFamilyToolbar';
  static icon: JSX.Element;
  static component: TFontFamilyToolBarComponent;
  constructor(container: SlateContainer) {
    super(container);
    this.register(FontFamilyFunction);
  }

  render(props: TToolProps) {
    const [, value] = this.container.useRangeLeaf(FontFamilyFunction.namespace)
    const click = (value: string) => {
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + FontFamilyFunction.namespace, { fontFamily: value });
      }
    };

    const Component = FontFamilyToolBar.component

    return !Component ? null : <div onMouseDown={e => e.preventDefault()} className={classnames('font-family', props.status)}>
      <Component items={props.data} click={click} selectedValue={value} status={props.status} />
    </div>
  }

  componentTerminate() {
    this.unRegister(FontFamilyFunction);
  }
}