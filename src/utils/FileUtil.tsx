const units: string[] = ["B", "KB", "MB", "GB", "TB"];

export const formatSize = (sizeInBytes: number): string => {
  const unitIndex: number = Math.floor(Math.log(sizeInBytes) / Math.log(1024));
  const unit: string = units[unitIndex];
  const size: string = (sizeInBytes / Math.pow(1024, unitIndex)).toFixed(2);
  return size + " " + unit;
};
