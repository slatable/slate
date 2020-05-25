import React, { useCallback } from 'react';
import { TSlateTool, SlateTool, TToolProps, SlateContainer } from '@slatable/slate';
import { ImgFunction } from './img.function';
import classnames from 'classnames';
import { Upload } from 'antd';
import { RcFile } from 'antd/lib/upload/interface'


const toBase64 = (file: any) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
})

export class ImgToolBar extends SlateTool implements TSlateTool {
  static namespace = 'ImgToolbar';
  static icon: JSX.Element;
  constructor(container: SlateContainer) {
    super(container);
    this.register(ImgFunction);
  }

  private postImg(file: any, data: any) {
    const formData = new FormData();
    formData.append('file', file);
    return fetch(data.action, {
      body: formData,
      mode: 'no-cors',
      method: data.method || 'post',
      credentials: 'include'
    })
  }

  async uploadImage(file: any, data: any, callback: Function) {
    if(data?.action) {
      const result = await this.postImg(file, data);
      console.log(result, 'result')
      callback(result);
    } else {
      const result = await toBase64(file);
      callback(result);
    }
    
  }

  render(props: TToolProps) {
    const upload = (file: RcFile) => {
      this.uploadImage(file, props.data, (url: string) => {
        if(url) {
          this.container.cast('editor:' + ImgFunction.namespace, { img: url });
        }
      });
      return false
    }
    if (props.status !== 'disabled') {
      return <Upload
        beforeUpload={upload}
        showUploadList={false}
        accept='image/*'
      >
        <span onMouseDown={e => e.preventDefault()} className={classnames(props.status, props.className)}>{ImgToolBar.icon || 'U'}</span>
      </Upload>
    }

    return <span className={classnames(props.status, props.className)}>{ImgToolBar.icon || 'U'}</span>
    
  }

  componentTerminate() {
    this.unRegister(ImgFunction);
  }
}