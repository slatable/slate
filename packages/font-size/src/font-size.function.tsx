import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TLeafNode } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class FontSizeFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'FontSize';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on<{ fontSize: string }>('editor:' + FontSizeFunction.namespace).subscribe(({ fontSize }) => {
      this.addLeaf(FontSizeFunction.namespace, fontSize);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <span {...props.attributes} style={{ fontSize: props.leaf[FontSizeFunction.namespace] }}>{props.children}</span>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public useRangeMarkedHook<T extends TLeafNode>(value: T): boolean {
    return !!value[FontSizeFunction.namespace];
  }

  public componentDeserialize(el: HTMLElement) {
    return {
      [FontSizeFunction.namespace]: el.style['fontSize'],
    }
  }
}