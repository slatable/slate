import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TLeafNode } from '@slatable/slate';
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

  public useRangeMarkedHook<T extends TLeafNode>(value: T): boolean {
    return !!value[ItalicFunction.namespace];
  }
  
  public componentDeserialize() {
    return { [ItalicFunction.namespace]: true };
  }
}