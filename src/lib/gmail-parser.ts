export function getHeader(
  headers: { name?: string; value?: string }[],
  name: string,
) {
  const header = headers.find(
    (h) => h.name?.toLowerCase() === name.toLowerCase(),
  );
  return header?.value;
}
