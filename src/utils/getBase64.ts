import type { RcFile } from 'antd/es/upload';

const getLocalSrc = (file: RcFile): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });

export const getBase64 = async (file: File): Promise<string> => {
  const src = await getLocalSrc(file as RcFile);
  return src
}
