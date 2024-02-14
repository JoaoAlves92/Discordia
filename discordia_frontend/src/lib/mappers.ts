export function toSet(
  originalArray: Array<Entity.Message | Entity.Guild>
): Array<Entity.Message | Entity.Guild> {
  const newSet = new Set(originalArray.map((item) => item.id));
  const filteredItems = [...newSet].map((id) =>
    originalArray.find((item) => item.id === id)
  );
  return filteredItems;
}
