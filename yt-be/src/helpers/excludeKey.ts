function exclude(obj: any, keyAttr: string) {
  for (const prop in obj) {
    if (prop === keyAttr) delete obj[prop];
    else if (typeof obj[prop] === 'object') exclude(obj[prop], keyAttr);
  }
  return obj;
}

export default exclude;
