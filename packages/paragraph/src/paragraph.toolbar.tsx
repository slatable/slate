import React, { useCallback } from 'react';
import { Subscription } from '@reactivex/rxjs';
import { SlateContainer, TSlateTool, SlateTool, TToolProps } from '@slatable/slate';
import { ParagraphFunction } from './paragraph.function';
import { H1Function } from './h1'
import { H2Function } from './h2'
import { H3Function } from './h3'
import { H4Function } from './h4'
import { H5Function } from './h5'
import { H6Function } from './h6'

const fns = [ParagraphFunction, H1Function, H2Function, H3Function, H4Function, H5Function, H6Function]

const TitleText = [
  '普通文本',
  '一级标题',
  '二级标题',
  '三级标题',
  '四级标题',
  '五级标题',
  '六级标题'
];

export class ParagraphToolbar extends SlateTool implements TSlateTool {
  static readonly namespace = 'ParagraphToolbar';
  static Compo: React.FunctionComponent<{
    onClick: Function,
    titleText: Array<String>
  }>;
  static icon: JSX.Element;
  private readonly event$: Subscription;
  constructor(container: SlateContainer) {
    super(container);
    this.register(H1Function)
    this.register(H2Function)
    this.register(H3Function)
    this.register(H4Function)
    this.register(H5Function)
    this.register(H6Function)
    this.register(ParagraphFunction)
  }

  render(props: TToolProps): JSX.Element {
    if (ParagraphToolbar.Compo) {
      return this.component_render()
    }
    const onClick = useCallback((namespace: string) => {
      if (props.status !== 'disabled') {
        this.container.cast('editor:' + namespace)
      }
    }, [])
    return <div>
      {
        TitleText.map((item: string, index: number) => {
          return <span style={{
            cursor: 'pointer'
          }} onMouseDown={() => {
            onClick(fns[index].namespace)
          }}>{ParagraphToolbar.icon || item}</span>
        })
      }
    </div>
  }

  component_render() {
    let Compo = ParagraphToolbar.Compo
    return <Compo titleText={TitleText} onClick={(index: number) => {
      this.container.cast('editor:' + fns[index].namespace)
    }} />
  }

  componentTerminate() {
    this.unRegister(ParagraphFunction);
  }
}