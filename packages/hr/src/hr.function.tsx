import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';

export class HrFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Hr';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + HrFunction.namespace).subscribe(() => {
      this.setElement(HrFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps) {
    return <hr id={props.element.id} {...props.attributes} />
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
    return {
      id: SlateContainer.createNewID(),
      type: HrFunction.namespace,
      style: [],
    };
  }
}