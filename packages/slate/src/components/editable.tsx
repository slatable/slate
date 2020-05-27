import React from 'react';
import { SlateContainer } from '../container';
import { Editable, } from 'slate-react';
import { EditableProps } from 'slate-react/dist/components/editable';
import { SwtichRender } from '../transforms/switchRender';

interface TEditorProps extends EditableProps {
  container: SlateContainer,
}

export class Editor extends React.Component<TEditorProps> {
  constructor(props: TEditorProps) {
    super(props);
  }

  render() {
    const Switcher = SwtichRender(this.props.container);
    const Rendering = (props: any) => <Switcher {...props} />;
    const onBlur = (e: React.FocusEvent<HTMLDivElement>) => {
      this.props.container.setLastSelectionWhenBlur();
      this.props.onBlur && this.props.onBlur(e);
    }
    return <Editable renderLeaf={Rendering} renderElement={Rendering} onBlur={onBlur} {...this.props} />;
  }
}