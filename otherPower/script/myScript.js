const _myScript = `
Have you ever done it?
Você já fez isso?
`

export const myScript = _myScript
  .replace(/\n{2,}/g, '\n\n')
  .split('\n\n')
  .filter(Boolean)
  .map(line => line.split('\n').filter(Boolean))
