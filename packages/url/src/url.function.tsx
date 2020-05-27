import React from 'react';
import { ReactEditor } from 'slate-react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TLeafRenderProps, TElementRenderProps } from '@slatable/slate';
import { Transforms, Editor, Range } from 'slate';
import isUrl from 'is-url';

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

  public componentWithWrapper(editor: ReactEditor): ReactEditor {
    const { insertData } = editor
    editor.insertData = (data: any) => {
      const text = data.getData('text/plain')
      if (text && isUrl(text)) {
        this.wrapLink(editor, text)
      }
      insertData(data)
    }
    return editor;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  private wrapLink(editor: ReactEditor, url: string) {
    if (this.isLinkActive(editor)) {
        this.unwrapLink(editor)
    }

    const { selection } = editor
    const isCollapsed = selection && Range.isCollapsed(selection)
    const link = {
        type: 'link',
        url,
        children: isCollapsed ? [{ text: url }] : [],
    }

    if (isCollapsed) {
        Transforms.insertNodes(editor, link)
    } else {
        Transforms.wrapNodes(editor, link, { split: true })
        Transforms.collapse(editor, { edge: 'end' })
    }
  }

  private isLinkActive(editor: ReactEditor) {
    const [link] = Editor.nodes(editor, { match: n => n.type === 'link' })
    return !!link
  }
  
  private unwrapLink(editor: any){
    Transforms.unwrapNodes(editor, { match: n => n.type === 'link' })
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