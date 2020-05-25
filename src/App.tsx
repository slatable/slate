import './App.css';
import 'antd/dist/antd.css';
import React from 'react';

import { TitleFunction } from '@slatable/title';
import { initContent } from './data';
import { Divider } from 'antd';
import { SlateContainer, CreateNewProvider, Editor, CreateNewToolbar, TToolbarFormatProps } from '@slatable/slate';

import { useQuote } from './plugins/quote';
import { useCode } from './plugins/code';
import { useHr } from './plugins/hr';
import { useParagraph } from './plugins/paragraph';
import { useBold } from './plugins/bold';
import { useItalic } from './plugins/italic';
import { useUnderline } from './plugins/underline';
import { useColor } from './plugins/color';
import { useBackgroundColor } from './plugins/background-color';
import { useImage } from './plugins/image';
import { useAlign } from './plugins/align';
import { useLineHeight } from './plugins/line-height';
import { useDecreaseIndent } from './plugins/decrease-indent';
import { useIncreaseIndent } from './plugins/increase-indent';
import { useFontFamily } from './plugins/font-family';
import { useFontSize } from './plugins/font-size';
import { useNumberedList } from './plugins/numbered-list';
import { useBulletedList } from './plugins/bulleted-list';

const container = new SlateContainer();
const ToolBar = CreateNewToolbar(container, <Divider type="vertical" />);
const [state, titleFunc] = TitleFunction.useTitle(container, initContent, '朱自清 - 荷塘月色')
const Provider = CreateNewProvider(container, state);

container.on('content').subscribe(value => console.log('Editor Value:', value));
container.on<{ error: Error, context: any }>('error').subscribe(({ error, context }) => console.warn(error));

titleFunc.allow();
const formater: TToolbarFormatProps = [
  [
    [useQuote(container)],
    [useCode(container)],
    [useHr(container)],
    [useParagraph(container), [1,2,3,4]],
    [useBold(container)],
    [useItalic(container)],
    [useUnderline(container)],
    [useColor(container)],
    [useBackgroundColor(container)],
    [useImage(container)],
    [useAlign(container), ['left', 'center', 'right']],
    [useLineHeight(container), ['1', '1.25', '1.5', '1.75', '2']],
    [useDecreaseIndent(container)],
    [useIncreaseIndent(container)],
    [useFontFamily(container), ['SimSun', 'SimHei', 'Microsoft YaHei', 'Microsoft JhengHei', 'NSimSun', 'PMingLiU', 'MingLiU', 'DFKai-SB', 'FangSong', 'KaiTi', 'FangSong_GB2312', 'KaiTi_GB2312']],
    [useFontSize(container), ['12px', '14px', '16px', '20em']]
  ],
  [
    [useNumberedList(container)],
    [useBulletedList(container)]
  ]
];

function App() {
  return (
    <Provider>
      <div className="editor-header">
        <ToolBar format={formater} />
      </div>
      <div className="editor-content">
        <Editor spellCheck autoFocus container={container} placeholder="请输入文章内容..." className="article" />
      </div>
    </Provider>
  );
}

export default App;
