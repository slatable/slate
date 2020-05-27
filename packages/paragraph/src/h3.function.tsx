import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';

export class H3Function extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'H3';
  public readonly tagname = 'H3'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + H3Function.namespace).subscribe(() => {
      this.setElement(H3Function.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <h3 id={props.element.id} style={style} {...props.attributes}>{props.children}</h3>
  }

  // public componentRenderStyle<T = any>(data?: T): {
  //   [key: string]: string | number | boolean,
  // } {
  //   return {}
  // }

  // public componentWithWrapper(editor: ReactEditor): ReactEditor {
  //   return editor;
  // }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  // public useRenderHook<R = any>(
  //   container: SlateContainer, 
  //   props: TLeafRenderProps | TElementRenderProps
  // ): R {
  //   return;
  // }

  // public useRangeMardHook<T = any>(value: T): boolean {
  //   return false;
  // }

  public componentDeserialize() {
    return {
      type: H3Function.namespace,
      id: SlateContainer.createNewID(),
    };
  }
}