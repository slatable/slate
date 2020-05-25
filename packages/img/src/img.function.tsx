import React from 'react';
import { SlateFunction, TSlateFunction, SlateContainer, TElementRenderProps } from '@slatable/slate';
import { ParagraphFunction } from '@slatable/paragraph';
import { Transforms } from 'slate';
import { Subscription } from '@reactivex/rxjs';

export class ImgFunction extends SlateFunction implements TSlateFunction {
  static readonly namespace = 'Img';
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
          { text: 'cdsvdfsvfdvdfvfd' }
        ],
        style: [],
        id: SlateContainer.createNewID(),
      }
    ])
  }

  public componentRenderNodes(props: TElementRenderProps) {
    return <div {...props.attributes}>
    <div contentEditable={false}>
      <img src={props.element.src} alt='' />
    </div>
    {props.children}
  </div>;
  }

  public componentTerminate(): void {
    this.event$.unsubscribe();
  }
  
  public componentDeserialize(el: any): any {
    return { type: ImgFunction.namespace, id: SlateContainer.createNewID(), src: el.getAttribute('src') };
  }
}