import React, { memo } from 'react';
import { ColorToolBar } from '@slatable/color';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { FontColorsOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { CompactPicker, ColorResult } from 'react-color';
import classnames from 'classnames';

export function useColor(container: SlateContainer) {
  ColorToolBar.component = memo(props => {
    const onChangeComplete = (color: ColorResult) => {
      props.click(color.hex)
    }
    return <Popover overlayClassName='cus-popover' content={props.status === 'disabled' ? null : <CompactPicker color={props.selectedValue} onChangeComplete={onChangeComplete} />} title={null}>
      <span onMouseDown={e => e.preventDefault()} className={classnames(props.status, 'tool')} style={{ color: props.selectedValue }}><Tooltip title="字体颜色" placement="bottom"><FontColorsOutlined /></Tooltip></span>
    </Popover>
  })
  container.toolbar.register(ColorToolBar);
  return ColorToolBar.namespace;
}