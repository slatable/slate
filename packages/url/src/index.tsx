import React from 'react';
import { ReactEditor } from 'slate-react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TElementRenderProps } from '@slatable/slate';

export class UrlFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Url';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on('editor:' + UrlFunction.namespace).subscribe(() => {
      this.container.focus();
      this.setLeaf(UrlFunction.namespace);
    });
  }

  // public componentRenderNodes(props: TLeafRenderProps | TElementRenderProps, style: { [key: string]: any }, data: any) {
  //   return <div></div>
  // }

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

  // public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
  //   return {};
  // }
}