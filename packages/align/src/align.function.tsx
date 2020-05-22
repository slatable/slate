import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TLeafNode } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class AlignFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Align';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'attr');
    this.event$ = this.container.on<{ align: string }>('editor:' + AlignFunction.namespace).subscribe(({ align }) => {
      this.setAttribute([[AlignFunction.namespace, align]]);
    });
  }

  // public componentRenderNodes(props: TLeafRenderProps) {
  //   return <strong {...props.attributes}>{props.children}</strong>;
  // }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  // public useRangeMardHook<T extends TLeafNode>(value: T): boolean {
  //   return !!value[AlignFunction.namespace];
  // }

  // public componentDeserialize() {
  //   return { [AlignFunction.namespace]: true };
  // }

  public componentRenderStyle<T = any>(data?: T): {
    [key: string]: string | number | boolean,
  } {
    console.log(data, 'style')
    return { [AlignFunction.namespace]: true }
  }
}