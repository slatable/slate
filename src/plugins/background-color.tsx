import React, { memo } from 'react';
import { BackgroundColorToolBar } from '@slatable/background-color';
import { SlateContainer } from '@slatable/slate';
import { Tooltip } from 'antd';
import { BgColorsOutlined } from '@ant-design/icons';
import { Popover } from 'antd';
import { CompactPicker, ColorResult } from 'react-color';
import classnames from 'classnames';

export function useBackgroundColor(container: SlateContainer) {
  BackgroundColorToolBar.component = memo(props => {
    const onChangeComplete = (color: ColorResult) => {
      props.click(color.hex)
    }
    return <Popover overlayClassName='cus-popover' content={props.status === 'disabled' ? null : <CompactPicker color={props.selectedValue} onChangeComplete={onChangeComplete} />} title={null}>
      <span onMouseDown={e => e.preventDefault()} className={classnames(props.status, 'tool')} style={{ color: props.selectedValue }}><Tooltip title="背景颜色" placement="bottom"><BgColorsOutlined /></Tooltip></span>
    </Popover>
  })
  container.toolbar.register(BackgroundColorToolBar);
  return BackgroundColorToolBar.namespace;
}