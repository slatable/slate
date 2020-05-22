import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';

export class QuoteFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Quote';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + QuoteFunction.namespace).subscribe(() => {
      this.setElement(QuoteFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }) {
    return <blockquote id={props.element.id} style={style} {...props.attributes}>{props.children}</blockquote>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize(): { [key: string]: any } {
    return { 
      type: QuoteFunction.namespace, 
      id: SlateContainer.createNewID(), 
      style: [],
    };
  }
}