export function copyToClipBoard (text: string) {

  const selection = window.getSelection()
  if (selection) {
    const target = document.createElement('div')
    target.style.opacity = '0'
    target.style.position = 'fixed'
    target.style.zIndex = '-1'

    target.innerHTML = text
    document.body.append(target)
    const range = document.createRange()

    range.selectNode(target)
    selection.removeAllRanges()
    selection.addRange(range)
    document.execCommand('Copy')
    selection.removeAllRanges()
    document.body.removeChild(target)

    return Promise.resolve(0)
  }

  return Promise.reject(1)
}
