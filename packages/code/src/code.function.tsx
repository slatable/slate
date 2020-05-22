import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TLeafNode } from '@slatable/slate';

export class CodeFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Code';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on('editor:' + CodeFunction.namespace).subscribe(() => {
      this.setLeaf(CodeFunction.namespace);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps) {
    return <code {...props.attributes}>{props.children}</code>
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public useRangeMardHook<T extends TLeafNode>(value: T): boolean {
    return !!value[CodeFunction.namespace];
  }

  public componentDeserialize() {
    return { [CodeFunction.namespace]: true };
  }
}