import React from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';
import { ReactEditor } from 'slate-react';
import { Range, Editor, Point } from 'slate';

export class TableFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Table';
  public readonly tagname = 'TABLE'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on('editor:' + TableFunction.namespace).subscribe(() => {
      this.setElement(TableFunction.namespace);
    });
  }

  public componentRenderNodes(props: TElementRenderProps, style: { [key: string]: any }, data: any) {
    return <table id={props.id} style={style} {...props.attributes}>
      <tbody>{props.children}</tbody>
    </table>
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }

  public componentDeserialize<T extends HTMLElement>(el: T): { [key: string]: any } {
    return { type: [TableFunction.namespace] };
  }

  public componentWithWrapper(editor: ReactEditor) {
    const { deleteBackward, deleteForward, insertBreak } = editor;
    editor.deleteBackward = unit => {
      const { selection } = editor;
      if (selection && Range.isCollapsed(selection)) {
        const [cell] = Editor.nodes(editor, {
          match: n => n.type === 'TableCell',
        })
        if (cell) {
          const [, cellPath] = cell
          const start = Editor.start(editor, cellPath)
          if (Point.equals(selection.anchor, start)) {
            return
          }
        }
      }
  
      deleteBackward(unit)
    }
    editor.deleteForward = unit => {
      const { selection } = editor
      if (selection && Range.isCollapsed(selection)) {
        const [cell] = Editor.nodes(editor, {
          match: n => n.type === 'TableCell',
        })
  
        if (cell) {
          const [, cellPath] = cell;
          const end = Editor.end(editor, cellPath);
          if (Point.equals(selection.anchor, end)) return;
        }
      }
      deleteForward(unit);
    }

    editor.insertBreak = () => {
      const { selection } = editor;
      if (selection) {
        const [cell] = Editor.nodes(editor, {
          match: n => n.type === 'TableCell',
        });
        if(cell) return;
      }
      insertBreak();
    }
    return editor;
  }
}