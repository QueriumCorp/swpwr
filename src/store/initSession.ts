import { shuffle } from '@/lib/utils'
import type { SetFn, GetFn } from './_types'

const initSession = async (set: SetFn, get: GetFn) => {
  console.log('initSession', get().session?.sessionToken)
  set(state => ({
    session: {
      ...state.session,
      sessionToken: 'WORKING',
    },
  }))

  const problem = get().problem
  const student = get().student

  const theHints = []
  if (problem.qs1) {
    theHints.push(problem.qs1)
  }
  if (problem.qs2) {
    theHints.push(problem.qs2)
  }
  if (problem.qs3) {
    theHints.push(problem.qs3)
  }

  const theProblem = {
    appKey: problem.appKey,
    studentId: student.studentId,
    id: problem.problemId,
    title: problem.title,
    definition: problem.question,
    stimulus: problem.stimulus,
    topic: problem.class,
    hints: theHints,
  }

  // Abort if Hot Module Reload (HMR) wipes the store
  if (
    !theProblem.appKey ||
    !theProblem.studentId ||
    !theProblem.id ||
    !theProblem.definition ||
    !theProblem.topic
  ) {
    console.error('Missing required fields in problem: ', theProblem)
    return
  }

  const response = await fetch(get().swapiUrl + '/start/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(theProblem),
  })

  const data = await response.json()
  console.log('initSession', response, data)
  get().logAction({
    page: 'none',
    activity: 'initSession',
    data: { theProblem, response, data },
  })
  if (response.status !== 200) {
    set({
      criticalError: true,
      session: { ...get().session, sessionToken: 'ERROR' },
    })
  } else {
    set(state => ({
      session: {
        ...state.session,
        sessionToken: data.sessionToken,
        identifiers: data.identifiers,
        operators: data.operators,
        explanations: shuffle(data.explanation),
        highlights: data.highlights,
        endPhaseWEqn: convertMixedFractionsToLatex(data.endPhaseWEqn),
        phaseESentence: data.phaseESentence,
        selectedExplanation: { type: '', text: '' },
      },
    }))
  }
}

export default initSession

function convertMixedFractionsToLatex(str: string) {
  console.log(str)
  const mixedFractions = findMixedFractions(str).reverse()
  let latex = str

  mixedFractions.forEach(mixedFraction => {
    const front = latex.slice(0, mixedFraction.offset)
    const frac = mixedFractionToLatex(mixedFraction.original)
    const back = latex.slice(
      mixedFraction.offset + mixedFraction.original.length,
    )
    latex = front + frac + back
  })

  return latex
}

function findMixedFractions(str: string) {
  const regex = /(^|[^\w-])(-)?\s*(\d+(?:\s+\d+\/\d+|\s*\/\d+)|\d+\/\d+)/g
  const results = []
  let match

  while ((match = regex.exec(str)) !== null) {
    const [fullMatch, preMatch, negativeSign, fractionPart] = match

    // Split the fraction part into whole, numerator, and denominator
    let whole, numerator, denominator
    if (fractionPart.includes(' ')) {
      ;[whole, numerator, denominator] = fractionPart.split(/[\s\/]+/)
    } else {
      ;[numerator, denominator] = fractionPart.split('/')
      whole = '0'
    }

    // Convert to numbers
    const wholeNumber = parseInt(whole)
    const num = parseInt(numerator)
    const den = parseInt(denominator)

    // Calculate the decimal value, considering the negative sign
    const sign = negativeSign ? -1 : 1
    const decimal = sign * (wholeNumber + num / den)

    // Calculate the correct offset
    const offset = str.indexOf(fractionPart, match.index)

    // Reconstruct the original fraction string
    const originalFraction = (negativeSign || '') + fractionPart.trim()

    results.push({
      original: originalFraction,
      whole: sign * wholeNumber,
      numerator: num,
      denominator: den,
      decimal: decimal,
      offset: offset,
    })
  }

  return results
}

function mixedFractionToLatex(mixedFraction: string) {
  // Split the mixed fraction into whole number and fractional parts
  const parts = mixedFraction.split(' ')
  let whole = 0
  let numerator = 0
  let denominator = 1

  if (parts.length === 2) {
    whole = parseInt(parts[0])
    ;[numerator, denominator] = parts[1].split('/').map(Number)
  } else if (parts.length === 1) {
    if (parts[0].includes('/')) {
      ;[numerator, denominator] = parts[0].split('/').map(Number)
    } else {
      whole = parseInt(parts[0])
    }
  }

  // Format as LaTeX
  if (whole === 0) {
    return `\\frac{${numerator}}{${denominator}}`
  } else if (numerator === 0) {
    return `${whole}`
  } else {
    return `${whole}\\frac{${numerator}}{${denominator}}`
  }
}

let test =
  'I need 3 1/2 cups of flour, 4 7/8 cups of sugar, and 2 3/4 cups of milk. and 4 oz of butter'
console.log(findMixedFractions(test))
console.log(convertMixedFractionsToLatex(test))
