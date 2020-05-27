import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TLeafNode } from '@slatable/slate';
import { Subscription } from '@reactivex/rxjs';
  
export class FontFamilyFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'FontFamily';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on<{ fontFamily: string }>('editor:' + FontFamilyFunction.namespace).subscribe(({ fontFamily }) => {
      this.setLeaf(FontFamilyFunction.namespace, fontFamily);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <span {...props.attributes} style={{ fontFamily: props.leaf[FontFamilyFunction.namespace] }}>{props.children}</span>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public useRangeMardHook<T extends TLeafNode>(value: T): boolean {
    return !!value[FontFamilyFunction.namespace];
  }

  public componentDeserialize(el: HTMLElement) {
    return {
      [FontFamilyFunction.namespace]: el.style['fontFamily'],
    }
  }
}