import React, { useMemo, useState, useCallback } from 'react';
import { Slate } from 'slate-react';
import { SlateContainer } from '../container';

export function CreateNewProvider<T extends any[] = any[]>(
  container: SlateContainer, 
  initContent: T
): React.FunctionComponent<{ title?: string }> {
  return props => {
    const [content, setContent] = useState(fixedId(initContent));
    const editor = useMemo(() => container.createEditor(), []);
    const onChange = useCallback(value => {
      setContent(value);
      container.cast('content', value);
    }, []);
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