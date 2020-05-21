import React, { memo } from 'react';
import { ReactEditor, useSlate } from 'slate-react';
import { SlateContainer } from './container';
import { TSlateFunction } from './function';

export interface TToolProps<T = any> {
  data?: T, 
  className: string,
  status: 'actived' | 'normal' | 'disabled',
}

export class SlateTool {
  private readonly allowFunctions: Set<TSlateFunction> = new Set();
  public readonly container: SlateContainer;
  constructor(container: SlateContainer) {
    this.container = container;
  }

  public register<T extends TSlateFunction>(...classModules: { new(container: SlateContainer): T, namespace: string }[]) {
    for (let i = 0; i < classModules.length; i++) {
      const func = this.container.register(classModules[i]);
      this.allowFunctions.add(func);
    }
  }

  public unRegister<T extends TSlateFunction>(...classModules: { new(container: SlateContainer): T, namespace: string }[]) {
    for (let i = 0; i < classModules.length; i++) {
      const func = this.container.unRegister(classModules[i]);
      this.allowFunctions.delete(func);
    }
  }

  private isRange() {
    const selection = this.container.editor.selection;
    if (!selection) return false;
    const anchor = selection.anchor;
    const focus = selection.focus;
    if (anchor.path[0] !== focus.path[0]) return true;
    if (anchor.path[1] !== focus.path[1]) return true;
    if (focus.offset - anchor.offset !== 0) return true;
    return false;
  }

  private matchType(type: 'element' | 'leaf') {
    const pool: TSlateFunction[] = [];
    for (const chunk of this.allowFunctions) {
      if (chunk.type === type) {
        pool.push(chunk);
      }
    }
    return pool
  }

  public getStatus(editor: ReactEditor): 'actived' | 'normal' | 'disabled' {
    const stacks = this.container.functionStacks;
    if (stacks.size) {
      for (const stack of stacks) {
        const namespace = stack;
        const deps = this.container.dependencies.has(namespace) ? this.container.dependencies.get(namespace) : null;
        if (deps instanceof Set) {
          const i = this.allowFunctions.size;
          let j = 0
          for (const func of this.allowFunctions) {
            if (!deps.has((func.constructor as any).namespace)) j++;
          }
          if (j === i) return 'disabled';
        }
      }
    }
    const elements = this.matchType('element');
    if (elements.length) {
      for (let i = 0; i < elements.length; i++) {
        const element = elements[i];
        const [active] = this.container.useRangeElement((element.constructor as any).namespace, editor);
        if (active) return 'actived';
      }
      return 'normal';
    }
    const leafs = this.matchType('leaf');
    for (let i = 0; i < leafs.length; i++) {
      const leaf = leafs[i];
      const [active] = this.container.useRangeLeaf((leaf.constructor as any).namespace, editor);
      if (active) return 'actived';
    }
    if (this.isRange()) return 'normal';
    return 'disabled';
  }
}

export abstract class TSlateTool extends SlateTool {
  static readonly namespace: string;
  abstract render: React.FunctionComponent<TToolProps>;
  abstract componentTerminate?(): void;
}

export class SlateToolbar {
  private readonly stacks: Map<string, TSlateTool> = new Map();
  private readonly container: SlateContainer;

  constructor(container: SlateContainer) {
    this.container = container;
  }

  public register(classModule: { 
    new(container: SlateContainer): TSlateTool, 
    readonly namespace: string 
  }) {
    if (this.stacks.has(classModule.namespace)) return this;
    const tool = new classModule(this.container);
    this.stacks.set(classModule.namespace, tool);
    return tool;
  }

  public unRegister(namespace: string) {
    if (this.stacks.has(namespace)) {
      const tool = this.stacks.get(namespace);
      if (tool.componentTerminate) tool.componentTerminate();
      this.stacks.delete(namespace);
      return tool;
    }
  }

  private buildTools(editor: ReactEditor, text: string, DividerComponent: JSX.Element) {
    const _text = text.split('|');
    return _text.map((value, index) => {
      const items: React.FunctionComponentElement<TToolProps>[] = [];

      value.split('-').forEach(val => {
        const i = val.indexOf(':');
        let key: string = val, data: string;
        
        if (i > -1) {
          key = val.substring(0, i);
          data = val.substring(i);
        }

        if (this.stacks.has(key)) {
          const target = this.stacks.get(key);
          const CustomComponent = target.render.bind(target);
          const status = target.getStatus(editor);
          items.push(React.createElement(CustomComponent, { data, key, className: 'tool', status }));
        }
      });

      if (items.length) {
        if (index < _text.length - 1) items.push(DividerComponent);
        return React.createElement(React.Fragment, { key: index }, items);
      }
      
    }).filter(Boolean);
  }

  public component(DividerComponent: JSX.Element): React.FunctionComponent<{ format: string }> {
    return memo((props) => {
      const editor = useSlate();
      const items = this.buildTools(editor, props.format, DividerComponent);
      return React.createElement(React.Fragment, null, items);
    }, (prev, next) => prev.format !== next.format);
  }
}