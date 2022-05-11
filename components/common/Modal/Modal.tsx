import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Divider } from '@mui/material'
import styles from './Modal.module.scss'

export interface ModalProps {
  show: boolean
  onClose: () => void
  children?: React.ReactNode
  actions?: React.ReactNode
  additionalAction?: React.ReactNode
  title?: string
  size?: 'small' | 'medium' | 'large'
}

function Modal({ show, onClose, children, actions, title, size, additionalAction }: ModalProps) {
  const [isBrowser, setIsBrowser] = useState(false)
  useEffect(() => {
    setIsBrowser(true)
  }, [])
  const handleClose = () => {
    onClose()
  }

  const modalContent = show ? (
    <div className={styles.modal_overlay_custom} onClick={onClose}>
      <div
        className={`${styles.modal_box} ${styles[size as string]}`}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className={styles.modal_header}>{title}</h2>
        {/* <Divider /> */}
        {children}
        {/* <Divider /> */}
        <div className={`${additionalAction ? 'flex items-center justify-between' : ''} mt-2`}>
          {additionalAction && <div className="flex justify-start">{additionalAction}</div>}
          <div className="modal-action m-0">{actions}</div>
        </div>
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
