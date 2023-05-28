import { RcFile } from 'antd/lib/upload';
import authAxios from '../common/authAxios';
import { Constants } from '../common/constants';

export class FileService {
  static baseURL = Constants.API_BASE_URL;

  static importDataFromExcelFile(file: RcFile, providerId: number | undefined) {
    const formData = new FormData();
    formData.append('excel', file);
    console.log(formData);
    return authAxios.post(
      `/api/v1/file/import-products?providerId=${providerId}
        `,
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
  }
}
