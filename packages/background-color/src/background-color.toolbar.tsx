import React from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { BackgroundColorFunction } from './background-color.function';
import classnames from 'classnames';
import { Popover } from 'antd';
import { CompactPicker, ColorResult,  } from 'react-color';

export class BackgroundColorToolBar extends SlateTool implements TSlateTool {
  static namespace = 'BackgroundColorToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(BackgroundColorFunction);
  }

  render(props: TToolProps) {
    const [, color] = this.container.useRangeLeaf(BackgroundColorFunction.namespace)
    const onChangeComplete = (color: ColorResult) => {
      this.container.cast('editor:' + BackgroundColorFunction.namespace, { color: color.hex });
    }

    if(props.status !== 'disabled') {
      return <div onMouseDown={e => e.preventDefault()}>
        <Popover overlayClassName='cus-popover' content={<CompactPicker color={color} onChangeComplete={onChangeComplete} />} title={null}>
          <span onMouseDown={e => e.preventDefault()} className={classnames(props.status, props.className)} style={{ color }}>{BackgroundColorToolBar.icon || 'A'}</span>
        </Popover>
      </div>;
    }
    return <span className={classnames(props.status, props.className)} style={{ color }}>{BackgroundColorToolBar.icon || 'A'}</span>
  }

  componentTerminate() {
    this.unRegister(BackgroundColorFunction);
  }
}