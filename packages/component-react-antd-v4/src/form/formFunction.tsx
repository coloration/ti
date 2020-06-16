export function filterOptionWithNameAndValue(inputValue: string, option: any) {
  return `${option.props.children}${option.props.value}`.includes(inputValue)
}