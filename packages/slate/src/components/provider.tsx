import React, { useMemo, useState, useCallback } from 'react';
import { Slate } from 'slate-react';
import { SlateContainer } from '../container';

export function CreateNewProvider<T extends any[] = any[]>(container: SlateContainer, initContent: T): [
  T, React.FunctionComponent,
  (callback: (value: T) => void) => void
] {
  const [content, setContent] = useState(initContent);
  let _onChange: (value: T) => void;
  return [
    // value:
    content, 
    // component:
    props => {
      const editor = useMemo(() => container.createEditor(), []);
      const onChange = useCallback(value => {
        setContent(value);
        _onChange && _onChange(value);
      }, []);
      return <Slate editor={editor} value={content} onChange={onChange}>{props.children}</Slate>;
    }, 
    // change evnetg handler:
    (callback: (value: T) => void) => _onChange = callback
  ];
}