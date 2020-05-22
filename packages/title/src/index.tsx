import React from 'react';
import { Transforms } from 'slate';
import { ReactEditor } from 'slate-react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps, TLeafNode, TElementNode } from '@slatable/slate';

export class TitleFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Title';
  private readonly event$: Subscription;

  static useTitle<T extends any[]>(container: SlateContainer, data: T, placeholder: string): [T, TSlateFunction] {
    const func = container.register(TitleFunction);
    data.unshift({
      id: 'editor-title',
      type: TitleFunction.namespace,
      children: [
        {
          text: placeholder || 'Please type words...'
        }
      ]
    });
    return [data, func];
  }

  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + TitleFunction.namespace).subscribe(() => {
      this.container.focus();
      this.setLeaf(TitleFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps) {
    return <h1 className="editor-title">{props.children}</h1>;
  }

  public componentWithWrapper(editor: ReactEditor): ReactEditor {
    const deleteBackward = editor.deleteBackward;
    const deleteForward = editor.deleteForward;
    const deleteFragment = editor.deleteFragment;
    const insertBreak = editor.insertBreak;
    editor.deleteBackward = (unit: "character" | "word" | "line" | "block") => this.onDelete(() => deleteBackward(unit));
    editor.deleteForward = (unit: "character" | "word" | "line" | "block") => this.onDelete(() => deleteForward(unit));
    editor.deleteFragment = () => this.onDelete(() => deleteFragment(), true);
    editor.insertBreak = () => this.onInsertBreak(() => insertBreak());
    return editor;
  }

  private onDelete(action: () => void, isFragment?: boolean) {
    const [active, data] = this.container.useRangeElement(TitleFunction.namespace);
    if (!active) {
      if (this.container.editor.children.length > 2) return action();
      const chunk = this.container.editor.children[1] as TElementNode;
      if (chunk.children.length > 1) return action();
      if ((chunk.children[0] as TLeafNode).text.length) return action();
      return;
    }
    if (isFragment && (
      this.container.editor.selection.focus.path[0] > 0 || 
      this.container.editor.selection.anchor.path[0] > 0)
    ) {
      const focus = this.container.editor.selection.focus.path[0] > 0 
        ? this.container.editor.selection.focus
        : this.container.editor.selection.anchor;
      Transforms.select(this.container.editor, {
        anchor: {
          offset: 0,
          path: [1, 0],
        },
        focus,
      });
    }
    if (data.children.length > 1) return action();
    if ((data.children[0] as TLeafNode).text.length) return action();
  }

  private onInsertBreak(next: Function) {
    const [active] = this.container.useRangeElement(TitleFunction.namespace);
    if (!active) return next();
    Transforms.select(this.container.editor, {
      anchor: {
        offset: 0,
        path: [1, 0]
      },
      focus: {
        offset: 0,
        path: [1, 0]
      }
    });
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  // public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
  //   return {};
  // }
}