export function initializeValue(
  variable: string,
  initialValues: { variable: string; value: string | null }[],
) {
  let newValue = initialValues.find(el => el.variable == variable)?.value

  if (typeof newValue == 'undefined') {
    return ''
  }

  if (typeof newValue == 'string') {
    return newValue
  }

  if (newValue == null) {
    return variable
  }

  return newValue
}
