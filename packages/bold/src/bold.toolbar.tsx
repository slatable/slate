import React, { useCallback } from 'react';
import { TSlateToolbar, SlateContainer } from '@slatable/slate';
import { BoldFunction } from './bold.function';
export class BoldToolBar implements TSlateToolbar {
  static namespace = 'BoldToolbar';
  static icon: JSX.Element;
  private readonly container: SlateContainer;
  constructor(container: SlateContainer) {
    this.container = container;
    this.container.register(BoldFunction);
  }

  render(): React.FunctionComponent {
    return props => {
      const onClick = useCallback(() => {
        this.container.cast('editor:' + BoldFunction.namespace)
      }, []);
      return <span onClick={onClick}>{BoldToolBar.icon || 'Bold'}</span>;
    }
  }

  componentTerminate() {
    this.container.unRegister(BoldFunction);
  }
}