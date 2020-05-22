import React, { useCallback } from 'react';
import { ReactEditor } from 'slate-react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer } from '@slatable/slate';
import { ParagraphFunction } from './paragraph.function';

export class ParagraphToolbar extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'ParagraphToolbar';
  static icon: JSX.Element;
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on('editor:' + ParagraphToolbar.namespace).subscribe(() => {
      this.container.focus();
      this.setElement(ParagraphToolbar.namespace);
    });
  }

  render(): React.FunctionComponent {
    return props => {
      const onClick = useCallback(() => {
        this.container.cast('editor:' + ParagraphFunction.namespace)
      }, []);
      return <p onClick={onClick}>{ParagraphToolbar.icon || 'P'}</p>;
    }
  }

  componentTerminate() {
    this.container.unRegister(ParagraphFunction);
  }
}