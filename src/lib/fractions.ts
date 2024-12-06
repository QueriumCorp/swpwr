interface Fraction {
  full: string
  whole: number
  numerator: number
  denominator: number
  written: string
}

function numberToWords(num: number): string {
  const units = [
    '',
    'one',
    'two',
    'three',
    'four',
    'five',
    'six',
    'seven',
    'eight',
    'nine',
    'ten',
    'eleven',
    'twelve',
    'thirteen',
    'fourteen',
    'fifteen',
    'sixteen',
    'seventeen',
    'eighteen',
    'nineteen',
  ]
  const tens = [
    '',
    '',
    'twenty',
    'thirty',
    'forty',
    'fifty',
    'sixty',
    'seventy',
    'eighty',
    'ninety',
  ]

  const absNum = Math.abs(num)
  if (absNum < 20) return units[absNum]
  if (absNum < 100)
    return (
      tens[Math.floor(absNum / 10)] +
      (absNum % 10 !== 0 ? '-' + units[absNum % 10] : '')
    )
  return absNum.toString() // For numbers 100 and above, just return the number as a string
}

function denominatorToWords(num: number): string {
  const special: Record<number, string> = {
    2: 'half',
    3: 'third',
    4: 'quarter',
  }
  return num in special ? special[num] : numberToWords(num) + 'th'
}

function fractionToWords(
  whole: number,
  numerator: number,
  denominator: number,
): string {
  const isNegative = whole < 0 || numerator < 0
  whole = Math.abs(whole)
  numerator = Math.abs(numerator)

  let result = ''
  if (whole !== 0) {
    result += numberToWords(whole)
    if (numerator !== 0) {
      result += ' and '
    }
  }
  if (numerator !== 0) {
    const numWord = numberToWords(numerator)
    const denomWord = denominatorToWords(denominator)
    result += `${numWord} ${denomWord}${numerator !== 1 ? 's' : ''}`
  }
  return isNegative ? `negative ${result}` : result
}

export function findAndReplaceFractions(text: string): {
  fractions: Fraction[]
  replacedText: string
} {
  const fractionRegex: RegExp = /(-?\d+\s+)?\d+\/\d+/g
  const fractions: Fraction[] = []
  let replacedText = text

  replacedText = replacedText.replace(fractionRegex, match => {
    const parts = match.split(/\s+/)
    let whole = 0,
      numerator,
      denominator

    if (parts.length === 2) {
      whole = parseInt(parts[0], 10)
      ;[numerator, denominator] = parts[1].split('/').map(n => parseInt(n, 10))
    } else {
      ;[numerator, denominator] = match.split('/').map(n => parseInt(n, 10))
    }

    const written = fractionToWords(whole, numerator, denominator)
    fractions.push({ full: match, whole, numerator, denominator, written })
    return written
  })

  return { fractions, replacedText }
}
