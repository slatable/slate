import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';

export class NumberedListFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'NumberedList';
  public readonly tagname = 'OL'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + NumberedListFunction.namespace).subscribe(() => {
      this.setElement(NumberedListFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <ol id={props.id} style={style} {...props.attributes}>{props.children}</ol>
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
    return { type: [NumberedListFunction.namespace] };
  }
}