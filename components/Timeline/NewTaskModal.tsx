import { useEffect, useMemo, useState } from 'react';
import styles from './NewTaskModal.module.css';
import type { Stage } from '@/data/timeline';

type Props = {
  open: boolean;
  stages: Stage[];
  defaultStageId: string;
  onClose: () => void;
  onCreate: (args: { stageId: string; categoryId: string | null; title: string }) => void;
};

export default function NewTaskModal({
  open,
  stages,
  defaultStageId,
  onClose,
  onCreate,
}: Props) {
  const [stageId, setStageId] = useState(defaultStageId);
  const [categoryId, setCategoryId] = useState<string>(''); // '' = None
  const [title, setTitle] = useState('New Task');

  useEffect(() => {
    if (!open) return;
    setStageId(defaultStageId);
    setCategoryId('');
    setTitle('New Task');
  }, [open, defaultStageId]);

  const categories = useMemo(() => {
    const stage = stages.find((s) => s.id === stageId);
    return stage?.categories ?? [];
  }, [stages, stageId]);

  useEffect(() => {
    // if stage changes, reset category to None
    setCategoryId('');
  }, [stageId]);

  if (!open) return null;

  return (
    <div className={styles.overlay} onMouseDown={onClose}>
      <div className={styles.modal} onMouseDown={(e) => e.stopPropagation()}>
        <div className={styles.top}>
          <div>
            <div className={styles.title}>Add new task</div>
            <div className={styles.sub}>
              Choose where to add it. If Category is “None”, a new category will be created.
            </div>
          </div>

          <button type="button" className={styles.close} onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <div className={styles.body}>
          <label className={styles.label}>Stage</label>
          <select className={styles.select} value={stageId} onChange={(e) => setStageId(e.target.value)}>
            {stages.map((s, i) => (
              <option key={s.id} value={s.id}>
                Stage {i + 1}
              </option>
            ))}
          </select>

          <label className={styles.label}>Category</label>
          <select className={styles.select} value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
            <option value="">None</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          <label className={styles.label}>Task name</label>
          <input className={styles.input} value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>

        <div className={styles.bottom}>
          <button type="button" className={styles.cancel} onClick={onClose}>
            Cancel
          </button>

          <button
            type="button"
            className={styles.create}
            onClick={() => onCreate({ stageId, categoryId: categoryId || null, title: title.trim() || 'New Task' })}
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}