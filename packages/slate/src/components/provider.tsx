import React, { useMemo, useState, useCallback } from 'react';
import { Slate } from 'slate-react';
import { SlateContainer } from '../container';

export function CreateNewProvider<T extends any[] = any[]>(
  container: SlateContainer, 
  initContent: T | ((container: SlateContainer) => T)
): React.FunctionComponent<{ title?: string, }> {
  const contentState = typeof initContent === 'function' ? initContent(container) : initContent;
  return props => {
    const [content, setContent] = useState(contentState);
    const editor = useMemo(() => container.createEditor(), []);
    const onChange = useCallback(value => {
      setContent(value);
      container.cast('content', value);
    }, []);
    return <Slate editor={editor} value={content} onChange={onChange}>{props.children}</Slate>;
  }
}