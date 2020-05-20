import React from 'react';
  import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps } from '@slatable/slate';
  import { Subscription } from '@reactivex/rxjs';
  
  export class BoldFunction extends SlateFunction implements TSlateFunction {
    static readonly namespace = 'Bold';
    private readonly event$: Subscription;
    constructor(container: SlateContainer) {
      super(container, 'leaf');
      this.event$ = this.container.on('editor:' + BoldFunction.namespace).subscribe(() => {
        this.container.focus();
        this.setLeaf(BoldFunction.namespace);
      });
    }
  
    public componentRenderNodes(style: { [key: string]: any }, props: TLeafRenderProps) {
      return <strong {...props.attributes}>{props.children}</strong>;
    }
  
    public componentTerminate(): void {
      this.event$.unsubscribe();
    }
  }