export function dbFetchParser(rows) {
  const data = [];
  rows.rows && rows.rows.forEach(element => {
    data.push(element)
  });
  return data;
}