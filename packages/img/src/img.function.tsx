import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps, TElementNode } from '@slatable/slate';
import { ParagraphFunction } from '@slatable/paragraph';
import { Transforms } from 'slate';
import { Subscription } from '@reactivex/rxjs';
import { ReactEditor, useSelected, useFocused } from 'slate-react';
import isUrl from 'is-url';
import imageExtensions from 'image-extensions';

export class ImgFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Image';
  public readonly tagname = 'IMG'
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container, 'element');
    this.event$ = this.container.on<{ img: string }>('editor:' + ImgFunction.namespace).subscribe(({ img }) => {
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
        type: ImgFunction.namespace,
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
    const selected = useSelected()
    const focused = useFocused()
    return <div {...props.attributes}>
    <div contentEditable={false}>
      <img src={props.element.src} alt='' style={{ maxWidth: '100%', boxShadow: `${selected && focused ? '0 0 0 3px #B4D5FF' : 'none'}` }} />
    </div>
    {props.children}
  </div>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
  
  public componentDeserialize(el: any): any {
    return { 
      type: ImgFunction.namespace, 
      id: SlateContainer.createNewID(), 
      src: el.getAttribute('src') 
    };
  }

  public componentDeserialized(fragment: TElementNode[]) {
    if(fragment[fragment.length - 1]?.type === ImgFunction.namespace) {
      fragment.push({
        type: ParagraphFunction.namespace,
        children: [
          { text: '' }
        ],
        style: []
      } as TElementNode);
    }
    return fragment;
  }

  private isImageUrl(url: string) {
    if (!url) return false;
    if (!isUrl(url)) return false;
    const ext = new URL(url).pathname.split('.').pop();
    return imageExtensions.includes(ext);
  }

  public componentWithWrapper(editor: ReactEditor) {
    const { insertData, isVoid } = editor;
    editor.isVoid = element => element.type === ImgFunction.namespace ? true : isVoid(element);
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