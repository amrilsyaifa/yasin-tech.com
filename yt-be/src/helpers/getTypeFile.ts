const getTypeFile = (mimeType: string) => {
  if (mimeType.includes('image')) return 'image';
  if (mimeType.includes('application')) return 'doc';
  return 'file';
};

export default getTypeFile;
