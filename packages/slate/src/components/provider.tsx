import React, { useMemo, useState, useCallback } from 'react';
import { Slate } from 'slate-react';
import { SlateContainer } from '../container';
import { TElementNode, jsonmd5 } from '../transforms';

export function CreateNewProvider<T extends any[] = any[]>(
  container: SlateContainer, 
  initContent: T
): React.FunctionComponent<{ title?: string }> {
  return props => {
    const [content, setContent] = useState(fixedId(initContent));
    const editor = useMemo(() => container.createEditor(), []);
    const onChange = useCallback(value => {
      setContent(value);
      container.nextTick(diff(container.contentHash, container, value));
    }, []);
    container.content = content;
    container.contentHash = jsonmd5(content);
    return <Slate editor={editor} value={content} onChange={onChange}>{props.children}</Slate>;
  }
}

function fixedId(value: any[]) {
  const ids = new Set<string>();
  for (let i = 0; i < value.length; i++) {
    let chunk = value[i];
    if (!chunk.id) {
      chunk.id = SlateContainer.createNewID();
      ids.add(chunk.id);
      continue;
    }
    if (!ids.has(chunk.id)) {
      ids.add(chunk.id);
      continue;
    } 
    chunk.id = SlateContainer.createNewID();
    ids.add(chunk.id);
  }
  ids.clear();
  return value;
}

function diff(hash: string, container: SlateContainer, value: TElementNode[]) {
  return () => {
    if (container.diffing) return;
    container.diffing = true;
    if (container.content.length !== value.length) {
      container.content = value;
      container.contentHash = jsonmd5(value);
      container.diffing = false;
      return container.cast('content', value);
    }
    const str = jsonmd5(value);
    if (str !== hash) {
      container.content = value;
      container.contentHash = str;
      container.diffing = false;
      return container.cast('content', value);
    }
    container.diffing = false;
  }
}