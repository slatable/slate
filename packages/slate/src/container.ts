import { TSlateFunction } from './function';
import { ReactEditor, withReact } from 'slate-react';
import { withHistory } from 'slate-history';
import { jsx } from 'slate-hyperscript';
import { createEditor, Editor, Range, Transforms, Text } from 'slate';
import { generate } from 'randomstring';
import { EventEmitter } from './events';
import { TElementNode } from './transforms';
import { SlateToolbar } from './toolbar';

export class SlateContainer extends EventEmitter {
  public editor: ReactEditor;
  public readonly functions: Map<string, TSlateFunction> = new Map();
  public readonly toolbar = new SlateToolbar(this);
  private readonly counter: Map<string, number> = new Map();
  private readonly extras: Map<string, any> = new Map();
  public blurSelection: Range;

  constructor() {
    super();
    this.extras.set('wrappers', new Map<string, (editor: ReactEditor) => ReactEditor>());
  }

  static createNewID(weight: number = 5) {
    return generate(weight);
  }

  public setLastSelectionWhenBlur() {
    if (this.editor || this.editor.selection) {
      this.blurSelection = this.editor.selection;
    }
  }

  /**
   * 创建一个编辑器对象
   * 支持：历史记录、React
   * 同时将最新的编辑器的editor对象插入到container中
   * 插件：通过reduce插件来扩展功能
   */
  public createEditor() {
    const editor = this.withHtml(this.onContext(withReact(withHistory(createEditor()))));
    const wrappers: Map<string, (editor: ReactEditor) => ReactEditor> = this.extras.get('wrappers');
    return Array.from(wrappers).reduce((prev, current) => current[1](prev), editor);
  }

  /**
   * 将最新的编辑器的editor对象插入到container中
   * @param editor 
   */
  private onContext(editor: ReactEditor) {
    const onChange = editor.onChange;
    editor.onChange = () => {
      this.editor = editor;
      onChange.call(editor);
    }
    return editor;
  }

  /**
   * 注册功能
   * @param classModule 
   */
  public register<T extends TSlateFunction>(classModule: {
    new(container: SlateContainer): T,
    readonly namespace: string,
  }) {
    if (!this.counter.has(classModule.namespace)) {
      this.counter.set(classModule.namespace, 1);
    } else {
      this.counter.set(classModule.namespace, this.counter.get(classModule.namespace) + 1);
    }
    if (this.functions.has(classModule.namespace)) return this;
    const func = new classModule(this);
    const wrappers: Map<string, (editor: ReactEditor) => ReactEditor> = this.extras.get('wrappers');
    if (func.componentWithWrapper) wrappers.set(classModule.namespace, func.componentWithWrapper.bind(func));
    this.functions.set(classModule.namespace, func);
    return this;
  }

  /**
   * 卸载功能
   * @param namespace 
   */
  public unRegister<T extends TSlateFunction>(namespace: string | { 
    new(container: SlateContainer): T, 
    readonly namespace: string 
  }) {
    namespace = typeof namespace !== 'string' ? namespace.namespace : namespace;
    if (this.counter.has(namespace)) {
      const count = this.counter.get(namespace);
      if (count > 1) {
        this.counter.set(namespace, count - 1);
        return this;
      }
      this.counter.delete(namespace);
    }
    if (this.functions.has(namespace)) {
      const target = this.functions.get(namespace);
      if (target.componentTerminate) target.componentTerminate();
      this.functions.delete(namespace);
    }
    const wrappers: Map<string, (editor: ReactEditor) => ReactEditor> = this.extras.get('wrappers');
    if (wrappers.has(namespace)) wrappers.delete(namespace);
    return this;
  }

  public useRangeLeaf<T = any>(namespace: string): [boolean, T] {
    let marks = Editor.marks(this.editor);
    if (!marks || !marks[namespace]) {
      if (this.editor.selection && Range.isExpanded(this.editor.selection) && this.functions.has(namespace)) {
        const object = this.functions.get(namespace);
        if (object.useRangeMarkedHook) {
          const [match] = Editor.nodes(this.editor, {
            match: object.useRangeMarkedHook.bind(object),
          });
          if (match && match[0]) marks = match[0];
        }
      }
    }
    if (marks && marks[namespace]) {
      if (Array.isArray(marks[namespace])) return [!!marks[namespace].length, marks[namespace]];
      if (['string','number','boolean'].indexOf(typeof marks[namespace]) > -1) return [!!marks[namespace], marks[namespace]];
      return [!!Object.keys(marks[namespace]).length, marks[namespace]];
    }
    return [marks ? marks[namespace] === true : false, marks[namespace]];
  }

  public useRangeElement(namespace: string | string[]): [boolean, TElementNode] {
    const [match] = Editor.nodes<TElementNode>(this.editor, {
      match: node => {
        if (Array.isArray(namespace)) return namespace.indexOf(node.type as string) > -1;
        return node.type === namespace;
      }
    });
    return [!!match, match[0]];
  }

  public toggleMark<T = any>(namespace: string, value: T) {
    const [active] = this.useRangeLeaf(namespace);
    if (active) {
      Editor.removeMark(this.editor, namespace);
    } else {
      Editor.addMark(this.editor, namespace, value === undefined ? true : value);
    }
    return this;
  }

  private withHtml(editor: ReactEditor) {
    const insertData = editor.insertData;
    editor.insertData = (data: any) => {
      const html = data.getData('text/html')
      if (html) {
        const parsed = new DOMParser().parseFromString(html, 'text/html');
        const fragment = this.deserialize(parsed.body);
        Transforms.insertFragment(editor, fragment);
        return;
      }
      insertData(data);
    }
    return editor;
  }

  private deserialize(el: any): any {
    if (el.nodeType === 3) return el.textContent;
    else if (el.nodeType !== 1) return null;
    else if (el.nodeName === 'BR') return '\n';

    const { nodeName } = el;
    let parent = el;

    if (
      nodeName === 'PRE' &&
      el.childNodes[0] &&
      el.childNodes[0].nodeName === 'CODE'
    ) parent = el.childNodes[0];

    const children = Array.from(parent.childNodes)
        .map(this.deserialize.bind(this))
        .flat();

    if (el.nodeName === 'BODY') return jsx('fragment', {}, children);
    const elementTagNode = this.findFunctionByTag(nodeName);
    if (elementTagNode && elementTagNode.componentDeserialize) {
      switch (elementTagNode.type) {
        case 'element': return jsx('element', elementTagNode.componentDeserialize(el), children);
        case 'leaf': return children.find((child) => Text.isText(child))?.map((child:any) => jsx('text', elementTagNode.componentDeserialize(el), child));
      }
    }
    return children;
  }

  private findFunctionByTag(tag: string) {
    for (const [key, value] of this.functions) {
      if (value.tagname === tag) {
        return value;
      }
    }
  }

  public focus() {
    Transforms.select(this.editor, this.blurSelection);
  }
}