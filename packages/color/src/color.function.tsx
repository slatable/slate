import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class ColorFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Color';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on<{ color: string }>('editor:' + ColorFunction.namespace).subscribe(({ color }) => {
      this.setLeaf(ColorFunction.namespace, color);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <span {...props.attributes} style={{ color: props.leaf[ColorFunction.namespace] }}>{props.children}</span>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
  
  // public componentDeserialize() {
  //   return { [ColorFunction.namespace]: true };
  // }
}