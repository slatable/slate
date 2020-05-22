import React, { useCallback } from 'react';
import { ReactEditor } from 'slate-react';
import { Subscription } from '@reactivex/rxjs';
import { SlateFunction, TSlateFunction, SlateContainer, TSlateTool, SlateTool, TToolProps } from '@slatable/slate';
import { ParagraphFunction } from './paragraph.function';

const TitleText = [
  '普通文本',
  '一级标题',
  '二级标题',
  '三级标题',
  '四级标题',
  '五级标题',
  '六级标题'
];

export class TitleToolbar extends SlateTool implements TSlateTool {
  static readonly namespace = 'ParagraphToolbar';
  static Compo: React.FunctionComponent<{
    onClick: Function,
    TitleText: Array<String>
  }>;
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container);
    this.register(ParagraphFunction)
    // this.event$ = this.container.on('editor:' + ParagraphToolbar.namespace).subscribe(() => {
    //   this.container.focus();
    //   this.setElement(ParagraphToolbar.namespace);
    // });
  }

  render(props: TToolProps): JSX.Element {
    const onClick = useCallback(() => {
      this.container.cast('editor:' + ParagraphFunction.namespace)
    }, [])
    return <p onClick={onClick}>test</p>
  }
  // // return props => {
  // //   const onClick = useCallback(() => {
  // //     this.container.cast('editor:' + ParagraphFunction.namespace)
  // //   }, []);
  // //   // return <p onClick={onClick}>{ParagraphToolbar.icon || 'P'}</p>;
  // // }
  // const Compo = TitleToolbar.Compo;
  // return <Compo onClick={() => { }} TitleText={TitleText} />


  componentTerminate() {
    this.unRegister(ParagraphFunction);
  }
}