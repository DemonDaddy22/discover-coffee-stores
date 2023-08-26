export const getIdFromName = (name: string) => (
  name.toLowerCase().split(/\s+/).join('-')
);
