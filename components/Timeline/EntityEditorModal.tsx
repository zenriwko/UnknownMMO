import { useEffect, useState } from 'react';
import styles from './EntityEditorModal.module.css';

export type EditorKind = 'stage' | 'category' | 'task';

export type EditorMeta = {
  name: string;
  description: string;
  author: string;
  lastEditedISO: string;
  completed: boolean;
};

type Props = {
  open: boolean;
  kind: EditorKind;
  meta: EditorMeta;

  draftName: string;
  draftDesc: string;
  onChangeName: (v: string) => void;
  onChangeDesc: (v: string) => void;

  isDirty: boolean;
  showCloseConfirm: boolean;
  onRequestClose: () => void;
  onCancelCloseConfirm: () => void;

  onSave: () => void;
  onSaveAndClose: () => void;
  onDiscardAndClose: () => void;
  onToggleComplete: () => void;

  showBin?: boolean;
  onMoveToBin?: () => void;
};

export default function EntityEditorModal({
  open,
  kind,
  meta,
  draftName,
  draftDesc,
  onChangeName,
  onChangeDesc,
  isDirty,
  showCloseConfirm,
  onRequestClose,
  onCancelCloseConfirm,
  onSave,
  onSaveAndClose,
  onDiscardAndClose,
  onToggleComplete,
  showBin,
  onMoveToBin,
}: Props) {
  // Disable body scroll while open
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const [showBinConfirm, setShowBinConfirm] = useState(false);

  // ESC closes (goes through requestClose, which triggers confirm if dirty)
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onRequestClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onRequestClose]);

  useEffect(() => {
    if (!open) return;
    // reset modal-local overlays each time it opens
    setShowBinConfirm(false);
  }, [open]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onMouseDown={() => {if (showBinConfirm) return;onRequestClose();}}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.modalTop}>
          <div className={styles.modalTitle}>
            <div className={styles.modalKind}>{kind.toUpperCase()}</div>

            <input
              className={styles.modalName}
              value={draftName}
              onChange={(e) => onChangeName(e.target.value)}
              placeholder="Name"
            />

            <div className={styles.metaRow}>
              <span>
                <strong>Last edited:</strong> {new Date(meta.lastEditedISO).toLocaleString()}
              </span>
              <span>
                <strong>Author:</strong> {meta.author}
              </span>
              <span>
                <strong>Status:</strong> {meta.completed ? 'Complete' : 'In progress'}
              </span>
              {isDirty && <span className={styles.dirtyTag}>Unsaved</span>}
            </div>
          </div>

          <button type="button" className={styles.closeBtn} onClick={onRequestClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.modalBody}>
          <label className={styles.fieldLabel}>Description</label>
          <textarea
            className={styles.textarea}
            value={draftDesc}
            onChange={(e) => onChangeDesc(e.target.value)}
            placeholder="Write a description…"
          />
        </div>

        <div className={styles.modalBottom}>
          <button type="button" className={styles.saveBtn} onClick={onSave}>
            Save Changes
          </button>
          
          {showBin && kind === 'task' && (
            <button
              type="button"
              className={styles.binBtn}
              onClick={() => setShowBinConfirm(true)}
            >
              Move to bin
            </button>
          )}

          <button
            type="button"
            className={`${styles.completeBtn} ${meta.completed ? styles.completeOn : ''}`}
            onClick={onToggleComplete}
          >
            Mark as complete
          </button>
        </div>
        
        {showBinConfirm && (
          <div className={styles.binConfirmOverlay} onMouseDown={() => setShowBinConfirm(false)}>
            <div className={styles.binConfirmBox} onMouseDown={(e) => e.stopPropagation()}>
              <div className={styles.binConfirmTitle}>Move to bin?</div>
              <div className={styles.binConfirmText}>
                This will remove the task from the timeline. You can restore it later from the bin.
              </div>
                  
              <div className={styles.binConfirmActions}>
                <button
                  type="button"
                  className={styles.binConfirmDanger}
                  onClick={() => {
                    setShowBinConfirm(false);
                    onMoveToBin?.();
                  }}
                >
                  Yes, move to bin
                </button>
              
                <button
                  type="button"
                  className={styles.binConfirmCancel}
                  onClick={() => setShowBinConfirm(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {showCloseConfirm && (
          <div className={styles.confirmOverlay} onMouseDown={onCancelCloseConfirm}>
            <div className={styles.confirmBox} onMouseDown={(e) => e.stopPropagation()}>
              <div className={styles.confirmTitle}>Unsaved changes</div>
              <div className={styles.confirmText}>
                You’ve made changes. Do you want to save before closing?
              </div>

              <div className={styles.confirmActions}>
                <button type="button" className={styles.confirmSave} onClick={onSaveAndClose}>
                  Save & Close
                </button>

                <button type="button" className={styles.confirmDiscard} onClick={onDiscardAndClose}>
                  Discard
                </button>

                <button type="button" className={styles.confirmCancel} onClick={onCancelCloseConfirm}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
        
      </div>
    </div>
  );
}