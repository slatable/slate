import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class LinkFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Link';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on('editor:' + LinkFunction.namespace).subscribe(() => {
      this.setLeaf(LinkFunction.namespace);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <u {...props.attributes}>{props.children}</u>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
  
  public componentDeserialize() {
    return { [LinkFunction.namespace]: true };
  }
}