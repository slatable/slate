import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';

export class ListItemFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'ListItem';
  public readonly tagname = 'LI'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + ListItemFunction.namespace).subscribe(() => {
      this.setElement(ListItemFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <li id={props.id} style={style} {...props.attributes}>{props.children}</li>
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
    return { type: [ListItemFunction.namespace] };
  }
}