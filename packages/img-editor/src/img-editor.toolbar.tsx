import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ImgEditorFunction } from './img-editor.function';
import classnames from 'classnames';
import { Upload } from 'antd';
import { RcFile } from 'antd/lib/upload/interface'


const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
})

export class ImgEditorToolBar extends SlateTool implements TSlateTool {
  static namespace = 'ImgEditorToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(ImgEditorFunction);
  }

  async uploadImage<T extends Blob>(file: T, data: (file: T) => Promise<string>, callback: Function) {
    if(data) {
      callback(await data(file));
    } else {
      const result = await toBase64(file);
      callback(result);
    }
    
  }

  render(props: TToolProps) {
    const upload = useCallback((file: RcFile) => {
      this.uploadImage(file, props.data, (url: string) => {
        if(url) this.container.cast('editor:' + ImgEditorFunction.namespace, { img: url });
      });
      return false;
    }, []);
    if (props.status !== 'disabled') {
      return <Upload
        beforeUpload={upload}
        showUploadList={false}
        accept='image/*'
      >
        <span onMouseDown={e => e.preventDefault()} className={classnames(props.status, props.className)}>{ImgEditorToolBar.icon || 'U'}</span>
      </Upload>
    }

    return <span className={classnames(props.status, props.className)}>{ImgEditorToolBar.icon || 'U'}</span>
    
  }

  componentTerminate() {
    this.unRegister(ImgEditorFunction);
  }
}