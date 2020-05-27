import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';

export class TableRowFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'TableRow';
  public readonly tagname = 'TR'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + TableRowFunction.namespace).subscribe(() => {
      this.setElement(TableRowFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <tr {...props.attributes}>{props.children}</tr>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
    return { type: [TableRowFunction.namespace], id: SlateContainer.createNewID() };
  }
}