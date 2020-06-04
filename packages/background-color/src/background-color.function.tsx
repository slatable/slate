import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class BackgroundColorFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'BackgroundColor';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on<{ color: string }>('editor:' + BackgroundColorFunction.namespace).subscribe(({ color }) => {
      this.addLeaf(BackgroundColorFunction.namespace, color);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <span {...props.attributes} style={{ backgroundColor: props.leaf[BackgroundColorFunction.namespace] }}>{props.children}</span>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
  
  public componentDeserialize(el: HTMLElement) {
    return { [BackgroundColorFunction.namespace]: el.style['backgroundColor'] };
  }
}