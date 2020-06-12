export function download (filename: string, content: any) {
  const link = document.createElement('a')
  link.href = content
  link.download = filename
  link.click()
}

export function downloadAsFile (filename: string, content: Blob) {
  return download(filename, window.URL.createObjectURL(content))
}

export function downloadAsCsv (filename: string, content: string): void {
  content = '\ufeff' + content
  const blob = new Blob([content], { type: 'text/csv,charset=UTF-8' })
  return downloadAsFile(filename + '.csv', blob)
}

export const downloadWithDataurl = (filename: string, content: string) => {
  
  const arr = content.split(',') as any
  const mime = arr[0].match(/:(.*?);/)[1]
  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)
  
  while(n--){
    u8arr[n] = bstr.charCodeAt(n)
  }
  
  const blob = new Blob([u8arr], { type: mime })
  const objUrl = URL.createObjectURL(blob)

  download(objUrl, filename)
}