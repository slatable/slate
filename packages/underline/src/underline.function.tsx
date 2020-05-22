import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class UnderlineFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Underline';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on('editor:' + UnderlineFunction.namespace).subscribe(() => {
      this.setLeaf(UnderlineFunction.namespace);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <u {...props.attributes}>{props.children}</u>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
  
  public componentDeserialize() {
    return { [UnderlineFunction.namespace]: true };
  }
}