import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styles from './Modal.module.scss'

export interface ModalProps {
  show: boolean
  onClose: () => void
  children?: React.ReactNode
  actions?: React.ReactNode
  title?: string
}

function Modal({ show, onClose, children, actions, title }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {
    setIsBrowser(true)
  }, [])
  const handleClose = () => {
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.modal_overlay_custom} onClick={onClose}>
      <div className={styles.modal_box} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modal_header}>{title}</h2>
        {children}
        <div className="modal-action">{actions}</div>
      </div>
    </div>
  ) : null

  if (isBrowser) {
    return ReactDOM.createPortal(modalContent, document.getElementById('modal-root') as HTMLElement)
  } else {
    return null
  }
}

export default Modal
