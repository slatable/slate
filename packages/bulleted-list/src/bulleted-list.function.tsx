import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';

export class BulletedListFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'BulletedList';
  public readonly tagname = 'UL'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + BulletedListFunction.namespace).subscribe(() => {
      this.setElement(BulletedListFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <ul id={props.id} style={style} {...props.attributes}>{props.children}</ul>
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
    return { type: [BulletedListFunction.namespace] };
  }
}