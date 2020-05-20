import React from 'react';
import { TSlateToolbar, SlateContainer } from '@slatable/slate';
import { BoldFunction } from './bold.function';
export class BoldToolBar implements TSlateToolbar {
  static namespace = 'BoldToolbar';
  private readonly container: SlateContainer;
  constructor(container: SlateContainer) {
    this.container = container;
    this.container.register(BoldFunction);
  }

  render(): React.FunctionComponent {
    return props => {
      return <span>加粗</span>;
    }
  }

  componentTerminate() {
    this.container.unRegister(BoldFunction);
  }
}