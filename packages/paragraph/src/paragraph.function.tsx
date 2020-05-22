import React from 'react';
import { ReactEditor } from 'slate-react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TElementRenderProps } from '@slatable/slate';

export class ParagraphFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Paragraph';
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'leaf');
    this.event$ = this.container.on('editor:' + ParagraphFunction.namespace).subscribe(() => {
      this.container.focus();
      this.setElement(ParagraphFunction.namespace);
    });
  }

  public componentRenderNodes(props: TLeafRenderProps | TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <p></p>
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

  // public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
  //   return {};
  // }
}