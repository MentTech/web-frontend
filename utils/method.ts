import { toast, ToastOptions } from 'react-toastify'

export async function copyTextToClipboard(text: string, callbackErr: (arg0: string) => any) {
  // navigator clipboard api needs a secure context (https)
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard api method'
    return navigator.clipboard.writeText(text).catch(() => {
      callbackErr('Có lỗi xảy ra khi copy')
    })
  } else {
    // text area method
    let textArea = document.createElement('textarea')
    textArea.value = text
    // make the textarea out of viewport
    textArea.style.position = 'fixed'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise((resolve, reject) => {
      // here the magic happens
      if (document.execCommand) {
        document.execCommand('copy')
        textArea.remove()
        resolve({})
      } else {
        reject(new Error('copy error'))
      }
    })
  }
}

export const setToastError = (error: any) => {
  return toast.error(`Có lỗi xảy ra: ${error}`)
}

export const setToastSuccess = (message: string) => {
  return toast.success(message)
}
