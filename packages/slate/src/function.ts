import React from 'react';
import { ReactEditor } from 'slate-react';
import { SlateContainer } from './container';
import { TElementRenderProps, TElementNode } from './transforms/elementRender';
import { TLeafRenderProps, TLeafNode } from './transforms/leafElement';
import { Transforms } from 'slate';


const LIST_TYPES = ['NumberedList', 'BulletedList']

export class SlateFunction {
  public readonly container: SlateContainer;
  public readonly type: 'element' | 'leaf' | 'attr' | 'sys';
  constructor(container: SlateContainer, type: SlateFunction['type']) {
    this.container = container;
    this.type = type;
  }

  public allow<T extends TSlateFunction>(...classModules: ({ new (container: SlateContainer): T, namespace: string } | string)[]) {
    const names = classModules.map(classModule => {
      if (typeof classModule === 'string') return classModule;
      return classModule.namespace;
    });
    this.container.addDependencies((this.constructor as { new (container: SlateContainer): T, namespace: string }).namespace, ...names);
  }

  public setLeaf(namespace: string, data?: any) {
    this.container.toggleMark(namespace, data);
    return this;
  }

  public setElement(namespace: string) {
    const editor = this.container.editor;
    if (!editor) return this;
    if (!editor.selection || !editor.selection.anchor) return this;
    const props = editor.children[editor.selection.anchor.path[0]] as TElementNode;
    const isListActive = LIST_TYPES.indexOf(props.type) > -1
    const isList = LIST_TYPES.indexOf(namespace) > -1
    Transforms.unwrapNodes(editor, {
      match: n => LIST_TYPES.includes(n.type as string),
      split: true,
    })
    Transforms.setNodes(editor, {
      type: isListActive ? 'P' : isList ? 'ListItem' : namespace,
      id: props.id,
      style: props.style,
    });
    if (!isListActive && isList) {
      const block: any = {
        type: namespace,
        children: [],
        id: props.id,
        style: props.style
      };
      Transforms.wrapNodes(editor, block);
    }
    return this;
  }

  public insertBlock(data: any) {
    Transforms.insertNodes(this.container.editor, data);
    return this;
  }

  public insertText(data: string) {
    Transforms.insertText(this.container.editor, data)
  }

  public setAttribute(style: [string, any][]) {
    const editor = this.container.editor;
    if (!editor) return;
    if (!editor.selection || !editor.selection.anchor) return this;
    const selection = editor.selection;
    let min = editor.selection.anchor.path[0];
    let max = editor.selection.focus.path[0];
    if(min > max) {
      [min, max] = [max, min]
    }
    for(let i = min; i <= max; i ++) {
      const props = editor.children[i] as TElementNode;
      const pools: [string, any][] = (props.style || []).slice(0);
      const _PN = pools.map(p => p[0]);
      const isListActive = LIST_TYPES.indexOf(props.type) > -1;
      style.forEach(sty => {
        const i = _PN.indexOf(sty[0]);
        if (i > -1) {
          pools.splice(i, 1);
          _PN.splice(i, 1);
        }
        pools.push(sty);
      });
      Transforms.select(editor, {
        anchor: {
          offset: 0,
          path: [i, 0]
        },
        focus: {
          offset: 0,
          path: [i, 0]
        }
      });

      Transforms.setNodes(editor, {
        type: isListActive ? 'ListItem' : props.type,
        id: props.id,
        style: pools,
      });
    }
    Transforms.select(editor, selection);
    return this;
  }
}

export abstract class TSlateFunction extends SlateFunction {
  // 命名空间
  static readonly namespace: string;

  // 对应节点名 大写
  abstract readonly tagname?: string;

  // 渲染组件
  abstract componentRenderNodes?(
    props: TLeafRenderProps | TElementRenderProps,
    style: { [key: string]: any }, 
    data?: any,
  ): React.ReactElement;

  // 属性渲染
  abstract componentRenderStyle?<T = any>(data?: T): {
    [key: string]: string | number | boolean,
  }

  // 外部包裹
  abstract componentWithWrapper?(editor: ReactEditor): ReactEditor;

  // 反序列化HTML到JSON数据
  abstract componentDeserialize?<T extends HTMLElement>(el: T): any;

  abstract componentDeserialized?(fragment: TElementNode[]): TElementNode[];

  // 生命周期：销毁
  abstract componentTerminate?(): void;

  // 渲染拦截器
  abstract useRenderHook?(
    container: SlateContainer, 
    props: TLeafRenderProps | TElementRenderProps
  ): any;

  // 是否选取选中
  abstract useRangeMarkedHook?(value: TLeafNode): boolean;
}

