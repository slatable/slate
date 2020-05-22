import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class ItalicFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Italic';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on('editor:' + ItalicFunction.namespace).subscribe(() => {
      this.setLeaf(ItalicFunction.namespace);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <em {...props.attributes}>{props.children}</em>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
}