import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';
import { ParagraphFunction } from '@slatable/paragraph';
import { Transforms } from 'slate';
import { Subscription } from '@reactivex/rxjs';
import { ReactEditor } from 'slate-react';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import { useSlate } from 'slate-react';


export class ImgEditorFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Image';
  public readonly tagname = 'IMG'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on<{ img: string }>('editor:' + ImgEditorFunction.namespace).subscribe(({ img }) => {
      this.insertImage(img);
    });
  }

  private insertImage(img: string) {
    return Transforms.insertFragment(this.container.editor, [
      {
        type: ParagraphFunction.namespace,
        children: [
          { text: '' }
        ],
        style: [],
        id: SlateContainer.createNewID(),
      },
      {
        type: ImgEditorFunction.namespace,
        src: img,
        id: SlateContainer.createNewID(),
        children: [
          { text: '' }
        ],
        style: []
      },
      {
        type: ParagraphFunction.namespace,
        children: [
          { text: '' }
        ],
        style: [],
        id: SlateContainer.createNewID(),
      }
    ])
  }

  public componentRenderNodes(props: TElementRenderProps) {
    const editor = useSlate()
    return <div {...props.attributes}>
      <div contentEditable={false}>
        <img src={props.element.src} alt='' style={{ maxWidth: '100%' }} onClick={() => {
          let selection: any
          editor.children.forEach((cl: any, index: number) => {
            if(cl.id === props.element.id) {
              const children: any = editor.children[index - 1].children
              const clLast = children.length - 1
              const anchorOffset = (children[clLast]).text.length
              selection = {
                anchor: {
                  offset: anchorOffset,
                  path: [index - 1, clLast]
                },
                focus: {
                  offset: 0,
                  path: [index + 1, 0]
                }
              }
            }
          })
          setTimeout(() => {
            Transforms.select(editor, selection)
          })
        }} />
      </div>
      {props.children}
    </div>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
  
  public componentDeserialize(el: any): any {
    return { type: ImgEditorFunction.namespace, id: SlateContainer.createNewID(), src: el.getAttribute('src') };
  }

  private isImageUrl(url: string) {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop();
    return imageExtensions.includes(ext);
  }

  public componentWithWrapper(editor: ReactEditor) {
    const { insertData, isVoid } = editor;
    editor.isVoid = element => element.type === ImgEditorFunction.namespace ? true : isVoid(element);
    editor.insertData = data => {
      const text = data.getData('text/plain')
      const { files } = data;

      if (files && files.length > 0) {
        for (const file of files) {
          const reader = new FileReader()
          const [mime] = file.type.split('/');
          if (mime === 'image') {
            reader.addEventListener('load', () => this.insertImage(reader.result as string));
            reader.readAsDataURL(file);
          }
        }
      } else if (this.isImageUrl(text)) {
        this.insertImage(text);
      } else {
        insertData(data);
      }
    }
    return editor;
  }
}