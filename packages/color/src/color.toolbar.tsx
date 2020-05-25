import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ColorFunction } from './color.function';
import classnames from 'classnames';
import { Popover } from 'antd';
import { CompactPicker, ColorResult,  } from 'react-color';

export class ColorToolBar extends SlateTool implements TSlateTool {
  static namespace = 'ColorToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(ColorFunction);
  }

  render(props: TToolProps) {
    const [, color] = this.container.useRangeLeaf(ColorFunction.namespace)
    const onChangeComplete = useCallback((color: ColorResult) => {
      this.container.cast('editor:' + ColorFunction.namespace, { color: color.hex });
    }, [])

    if(props.status !== 'disabled') {
      return <div onMouseDown={e => e.preventDefault()}>
        <Popover overlayClassName='cus-popover' content={<CompactPicker color={color} onChangeComplete={onChangeComplete} />} title={null}>
          <span onMouseDown={e => e.preventDefault()} className={classnames(props.status, props.className)} style={{ color }}>{ColorToolBar.icon || 'A'}</span>
        </Popover>
      </div>;
    }
    return <span className={classnames(props.status, props.className)} style={{ color }}>{ColorToolBar.icon || 'A'}</span>
  }

  componentTerminate() {
    this.unRegister(ColorFunction);
  }
}