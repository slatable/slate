
import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TElementRenderProps } from '@slatable/slate';

export class BlistFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'UL';
  static readonly tagname = 'UL';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + BlistFunction.namespace).subscribe(() => {
      this.setElement(BlistFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <ul id={props.element.id} {...props.attributes} style={style} >{props.children}</ul>
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

  public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
    return {
      id: SlateContainer.createNewID(),
      type: BlistFunction.namespace,
      style: [],
    };
  }
}