import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';

export class TableCellFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'TableCell';
  public readonly tagname = 'TD'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + TableCellFunction.namespace).subscribe(() => {
      this.setElement(TableCellFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <td {...props.attributes} rowSpan={(props.element.rowSpan || 1) as any} colSpan={(props.element.colSpan || 1) as any} 
>{props.children}</td>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
    return { type: [TableCellFunction.namespace], id: SlateContainer.createNewID() };
  }
}