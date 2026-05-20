export function generateText(prefix: string, maxPrefixLength = 24): string {
  const cleanPrefix = prefix.replace(/[^a-zA-Z0-9]/g, '').slice(0, maxPrefixLength);
  return `${cleanPrefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function repeatChar(char: string, length: number): string {
  return char.repeat(length);
}
