export async function fetchApiMethodGet(URL) {
  const response = await fetch(URL, {
    method: 'GET',
    headers: {},
  });
  const res = response.status === 200 ? await response.json() : response;
  return {res: res, code: response.status};
}
