// byte单位换算
export const bytesToSize = (bytes: number): string => {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  const num = bytes / Math.pow(k, i);
  const _num = num.toFixed(2)
  return `${num ? _num : 0} ${sizes[i] || 'B'}`;
}
