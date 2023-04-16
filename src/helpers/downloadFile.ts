import authAxios from '../common/authAxios';
import { errorNotification } from './errorNotification';

export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'
  | 'purge'
  | 'PURGE'
  | 'link'
  | 'LINK'
  | 'unlink'
  | 'UNLINK';

type ResponseType = 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream';

type FileExtension =
  | 'txt'
  | 'pdf'
  | 'doc'
  | 'docx'
  | 'xls'
  | 'xlsx'
  | 'ppt'
  | 'pptx'
  | 'jpg'
  | 'jpeg'
  | 'png'
  | 'gif'
  | 'svg'
  | 'mp3'
  | 'mp4'
  | 'wav'
  | 'avi'
  | 'mov'
  | 'zip'
  | 'tar'
  | 'gz'
  | 'rar';

export function downloadFile(
  url: string,
  method: Method,
  responseType: ResponseType,
  fileName: string,
  extension: FileExtension,
  params?: any
) {
  if (params) {
    console.log(params);
    for (const key of Object.keys(params)) {
      if (!params[key]) {
        delete params[key];
      }
    }
  }
  return authAxios({
    url,
    method,
    params,
    responseType,
  })
    .then((response: any) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${fileName}.${extension}`);
      document.body.appendChild(link);
      link.click();
    })
    .catch((err) => errorNotification('Не удалось скачать файл', err.response?.status));
}
