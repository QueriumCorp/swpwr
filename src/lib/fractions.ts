interface Fraction {
  full: string
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

  if (num < 20) return units[num]
  if (num < 100)
    return (
      tens[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + units[num % 10] : '')
    )
  return num.toString() // For numbers 100 and above, just return the number as a string
}

function denominatorToWords(num: number): string {
  const special: Record<number, string> = {
    2: 'half',
    3: 'third',
    4: 'quarter',
  }
  return num in special ? special[num] : numberToWords(num) + 'th'
}

function fractionToWords(numerator: number, denominator: number): string {
  const numWord = numberToWords(numerator)
  const denomWord = denominatorToWords(denominator)
  return `${numWord} ${denomWord}${numerator !== 1 ? 's' : ''}`
}

export function findAndReplaceFractions(text: string): {
  fractions: Fraction[]
  replacedText: string
} {
  const fractionRegex: RegExp = /\b(\d+)\/(\d+)\b/g
  const fractions: Fraction[] = []
  let replacedText = text

  replacedText = replacedText.replace(fractionRegex, (match, num, denom) => {
    const numerator = parseInt(num, 10)
    const denominator = parseInt(denom, 10)
    const written = fractionToWords(numerator, denominator)
    fractions.push({ full: match, numerator, denominator, written })
    return written
  })

  return { fractions, replacedText }
}

// Example usage:
const testString: string =
  'The recipe calls for 3/4 cup of sugar and 1/2 teaspoon of salt. Mix in 2/3 cup of flour.'
const { fractions, replacedText } = findAndReplaceFractions(testString)

console.log('Found fractions:', fractions)
console.log('Replaced text:', replacedText)
