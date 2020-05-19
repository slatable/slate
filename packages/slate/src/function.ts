import React from 'react';
import { ReactEditor } from 'slate-react';
import { SlateContainer } from './container';
import { TElementRenderProps } from './transforms/elementRender';
import { TLeafRenderProps } from './transforms/leafElement';

export class SlateFunction {
  public readonly container: SlateContainer;
  public readonly type: 'element' | 'leaf' | 'attr';
  constructor(container: SlateContainer, type: 'element' | 'leaf' | 'attr') {
    this.container = container;
    this.type = type;
  }
}

export abstract class TSlateFunction extends SlateFunction {
  // 命名空间
  static readonly namespace: string;

  // 对应节点名 大写
  abstract readonly tagname?: string;

  // 渲染组件
  abstract componentRenderNodes?(
    style: { [key: string]: any }, 
    props: TLeafRenderProps | TElementRenderProps,
    data?: any,
  ): React.ReactElement;

  // 属性渲染
  abstract componentRenderStyle?<T = any>(data?: T): {
    [key: string]: string | number | boolean,
  }

  // 外部包裹
  abstract componentWithWrapper?(editor: ReactEditor): ReactEditor;

  // 生命周期：销毁
  abstract componentTerminate?(): void;

  // 渲染拦截器
  abstract componentRenderInterceptor?<R = any>(
    container: SlateContainer, 
    props: TLeafRenderProps | TElementRenderProps
  ): R;

  // 是否选取选中
  abstract componentRangeIsMarked?<T = any>(value: T): boolean;

  // 反序列化HTML到JSON数据
  abstract componentDeserialize?<T extends HTMLElement>(el: T): { [key: string]: any }
}

