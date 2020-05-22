import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class BoldFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Bold';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on('editor:' + BoldFunction.namespace).subscribe(() => {
      this.setLeaf(BoldFunction.namespace);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <strong {...props.attributes}>{props.children}</strong>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize() {
    return { [BoldFunction.namespace]: true };
  }
}