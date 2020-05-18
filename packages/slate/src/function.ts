import React from 'react';
import { ReactEditor } from 'slate-react';
import { SlateContainer } from './container';

export class SlateFunction {
  public readonly container: SlateContainer;
  constructor(container: SlateContainer) {
    this.container = container;
  }
}

export abstract class TSlateFunction extends SlateFunction {
  // 命名空间
  static readonly namespace: string;

  // 对应节点名 大写
  abstract readonly tagname?: string;

  // 渲染组件
  abstract componentRenderNodes?<T = any>(props?: T): React.FunctionComponent;

  // 属性渲染
  abstract componentRenderStyle?<T = any>(data?: T): {
    [key: string]: string | number | boolean,
  }

  // 外部包裹
  abstract componentWithWrapper?(editor: ReactEditor): ReactEditor;

  // 生命周期：销毁
  abstract componentTerminate?(): void;

  // 渲染拦截器
  abstract componentRenderInterceptor?<R = any>(editor: ReactEditor, props: { children: React.ReactElement }): R;

  // 是否选取选中
  abstract componentRangeIsMarked?<T = any>(value: T): boolean;

  // 反序列化HTML到JSON数据
  abstract componentDeserialize?<T extends HTMLElement>(el: T): { [key: string]: any }
}

