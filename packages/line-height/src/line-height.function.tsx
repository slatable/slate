import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class LineHeightFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'LineHeight';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'attr');
    this.event$ = this.container.on<{ align: string }>('editor:' + LineHeightFunction.namespace).subscribe(({ align }) => {
      this.setAttribute([[LineHeightFunction.namespace, align]]);
    });
  }

  // public componentRenderNodes(props: TLeafRenderProps) {
  //   return <strong {...props.attributes}>{props.children}</strong>;
  // }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  // public useRangeMardHook<T extends TLeafNode>(value: T): boolean {
  //   return !!value[LineHeightFunction.namespace];
  // }

  // public componentDeserialize() {
  //   return { [LineHeightFunction.namespace]: true };
  // }

  public componentRenderStyle<T = any>(data?: any): {
    [key: string]: string | number | boolean,
  } {
    return { lineHeight: data }
  }
}