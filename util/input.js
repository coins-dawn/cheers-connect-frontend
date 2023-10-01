export const isMatch = (kanji, kana, name, value) => {
  return value
    ? kanji.indexOf(value) != -1 || kana.indexOf(value) != -1 || name.indexOf(value) == 0
    : false
}