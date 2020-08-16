export const parseQueryString = (query: string) => {
  query = query.slice(query.indexOf("=") + 1);
  return query;
};
