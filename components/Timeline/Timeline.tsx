// components/Timeline/Timeline.tsx
import { useEffect, useMemo, useState } from 'react';
import NewTaskModal from './NewTaskModal';
import styles from './Timeline.module.css';
import type { Stage } from '@/data/timeline';
import EntityEditorModal from './EntityEditorModal';

type TimelineProps = {
  stages: Stage[];
  showCompleted: boolean;
  onToggleShowCompleted: () => void;
};

type EntityKind = 'stage' | 'category' | 'task';

type SelectedEntity = {
  kind: EntityKind;
  stageId: string;
  categoryId?: string;
  taskId?: string;
};

type EntityMeta = {
  name: string;
  description: string;
  author: string;
  lastEditedISO: string; // ISO date string
  completed: boolean;
};

function entityKey(e: SelectedEntity) {
  if (e.kind === 'stage') return `stage:${e.stageId}`;
  if (e.kind === 'category') return `category:${e.stageId}:${e.categoryId}`;
  return `task:${e.stageId}:${e.categoryId}:${e.taskId}`;
}

function nowISO() {
  return new Date().toISOString();
}

export default function Timeline({ stages, showCompleted, onToggleShowCompleted }: TimelineProps) {
  const [selected, setSelected] = useState<SelectedEntity | null>(null);

  const [showNewTask, setShowNewTask] = useState(false);
  const [bin, setBin] = useState<
    { stageId: string; categoryId: string; task: { id: string; title: string } }[]
  >([]);
  // Meta store (local-only for now). Keyed by entityKey.
  const [metaByKey, setMetaByKey] = useState<Record<string, EntityMeta>>({});

  // Draft fields in the modal
  const [draftName, setDraftName] = useState('');
  const [draftDesc, setDraftDesc] = useState('');
  const [showCloseConfirm, setShowCloseConfirm] = useState(false);

  // Local editable copy (so we can add tasks before backend/login exists)
  const [localStages, setLocalStages] = useState<Stage[]>(stages);

  // Keep localStages in sync when parent filters/changes stages (Stage buttons)
  useEffect(() => {
    setLocalStages(stages);
  }, [stages]);

  useEffect(() => {
    if (selected) setShowCloseConfirm(false);
  }, [selected]);

  const selectedKey = selected ? entityKey(selected) : null;

  // Find default entity name from localStages data
  const defaultName = useMemo(() => {
    if (!selected) return '';
    const stage = localStages.find((s) => s.id === selected.stageId);
    if (!stage) return '';

    if (selected.kind === 'stage') return stage.title;

    const category = stage.categories.find((c) => c.id === selected.categoryId);
    if (!category) return '';

    if (selected.kind === 'category') return category.title;

    const task = category.tasks.find((t) => t.id === selected.taskId);
    return task?.title ?? '';
  }, [selected, localStages]);

  const currentMeta: EntityMeta | null = useMemo(() => {
    if (!selectedKey) return null;

    // If we haven't edited this entity yet, create a default meta view (not stored until save).
    const existing = metaByKey[selectedKey];
    if (existing) return existing;

    return {
      name: defaultName,
      description: '',
      author: 'You',
      lastEditedISO: nowISO(),
      completed: false,
    };
  }, [selectedKey, metaByKey, defaultName]);

  const isDirty =
    !!selected &&
    !!currentMeta &&
    (draftName !== currentMeta.name || draftDesc !== currentMeta.description);

  const requestClose = () => {
    if (isDirty) {
      setShowCloseConfirm(true);
      return;
    }
    setSelected(null);
  };

  const discardAndClose = () => {
    setShowCloseConfirm(false);
    setSelected(null);
  };

  const saveChanges = () => {
    if (!selected || !selectedKey) return;

    setMetaByKey((prev) => {
      const existing = prev[selectedKey];
      const completed = existing?.completed ?? false;

      return {
        ...prev,
        [selectedKey]: {
          name: draftName.trim() || defaultName,
          description: draftDesc,
          author: existing?.author ?? 'You',
          lastEditedISO: nowISO(),
          completed,
        },
      };
    });
  };

  const saveAndClose = () => {
    saveChanges();
    setShowCloseConfirm(false);
    setSelected(null);
  };

  // When opening modal, populate drafts from currentMeta
  useEffect(() => {
    if (!selected || !currentMeta) return;
    setDraftName(currentMeta.name);
    setDraftDesc(currentMeta.description);
  }, [selected, currentMeta]);

  useEffect(() => {
    if (selected) setShowCloseConfirm(false);
  }, [selected]);

  const openStage = (stageId: string) => setSelected({ kind: 'stage', stageId });
  const openCategory = (stageId: string, categoryId: string) =>
    setSelected({ kind: 'category', stageId, categoryId });
  const openTask = (stageId: string, categoryId: string, taskId: string) =>
    setSelected({ kind: 'task', stageId, categoryId, taskId });

  const toggleComplete = () => {
    if (!selected || !selectedKey) return;

    setMetaByKey((prev) => {
      const existing =
        prev[selectedKey] ?? {
          name: defaultName,
          description: '',
          author: 'You',
          lastEditedISO: nowISO(),
          completed: false,
        };

      return {
        ...prev,
        [selectedKey]: {
          ...existing,
          completed: !existing.completed,
          lastEditedISO: nowISO(),
        },
      };
    });
  };
  const moveSelectedTaskToBin = () => {
    if (!selected || selected.kind !== 'task' || !selected.categoryId || !selected.taskId) return;
  
  
    const stageId = selected.stageId;
    const categoryId = selected.categoryId;
    const taskId = selected.taskId;
  
  
    // find task for bin storage
    const stage = localStages.find((s) => s.id === stageId);
    const cat = stage?.categories.find((c) => c.id === categoryId);
    const task = cat?.tasks.find((t) => t.id === taskId);
    if (!task) return;
  
  
    setBin((prev) => [...prev, { stageId, categoryId, task: { id: task.id, title: task.title } }]);
  
  
    // remove from timeline
    setLocalStages((prev) =>
      prev.map((s) =>
        s.id !== stageId
          ? s
          : {
              ...s,
              categories: s.categories.map((c) =>
                c.id !== categoryId ? c : { ...c, tasks: c.tasks.filter((t) => t.id !== taskId) }
              ),
            }
      )
    );
  
  
    setSelected(null);
  };
  // Helpers to display edited names in the tree
  const displayNameFor = (
    kind: EntityKind,
    ids: { stageId: string; categoryId?: string; taskId?: string },
    fallback: string
  ) => {
    const k =
      kind === 'stage'
        ? `stage:${ids.stageId}`
        : kind === 'category'
          ? `category:${ids.stageId}:${ids.categoryId}`
          : `task:${ids.stageId}:${ids.categoryId}:${ids.taskId}`;
    return metaByKey[k]?.name ?? fallback;
  };

  const isCompleted = (
    kind: EntityKind,
    ids: { stageId: string; categoryId?: string; taskId?: string }
  ) => {
    const k =
      kind === 'stage'
        ? `stage:${ids.stageId}`
        : kind === 'category'
          ? `category:${ids.stageId}:${ids.categoryId}`
          : `task:${ids.stageId}:${ids.categoryId}:${ids.taskId}`;
    return !!metaByKey[k]?.completed;
  };

  const defaultNewTaskStageId = useMemo(() => {
  const first = localStages.find((s) => !isCompleted('stage', { stageId: s.id }));
  return first?.id ?? localStages[0]?.id ?? stages[0]?.id ?? '';
  }, [localStages, stages, metaByKey]);

  const createTaskFromPrompt = (args: { stageId: string; categoryId: string | null; title: string }) => {
  const newTaskId = `task-${Date.now()}`;
  const newTask = { id: newTaskId, title: args.title };

  setLocalStages((prev) => {
    const stageIndex = prev.findIndex((s) => s.id === args.stageId);
    if (stageIndex === -1) return prev;

    const stage = prev[stageIndex];

    // If category is null -> create a new category automatically
    let targetCategoryId = args.categoryId;
    let nextCategories = stage.categories;

    if (!targetCategoryId) {
      const newCategoryId = `cat-${Date.now()}`;
      const nextNumber = stage.categories.length + 1;
      const stageNumber = stageIndex + 1;
      const newCategoryTitle = `Category ${stageNumber}.${nextNumber}`;

      nextCategories = [
        ...stage.categories,
        { id: newCategoryId, title: newCategoryTitle, tasks: [] },
      ];

      targetCategoryId = newCategoryId;
    }

    nextCategories = nextCategories.map((c) =>
      c.id === targetCategoryId ? { ...c, tasks: [...c.tasks, newTask] } : c
    );

    const nextStages = prev.map((s) => (s.id === stage.id ? { ...s, categories: nextCategories } : s));
    return nextStages;
  });

  setShowNewTask(false);
  setSelected({ kind: 'task', stageId: args.stageId, categoryId: args.categoryId ?? undefined, taskId: newTaskId });
};

  return (
    <section className={styles.wrapper}>
      {/* If you want the "Add new task" button INSIDE layout, keep it here */}
      <div className={styles.inlineTools}>
        <button type="button" className={styles.toolBtn} onClick={() => setShowNewTask(true)}>
          Add new task
        </button>
      
        <label className={styles.toggle}>
          <input
            type="checkbox"
            checked={showCompleted}
            onChange={onToggleShowCompleted}
          />
          <span className={styles.toggleText}>Show Completed</span>
        </label>
      </div>

      <div className={styles.stack}>
        {localStages
          .filter((stage) =>
            showCompleted ? true : !isCompleted('stage', { stageId: stage.id })
          )
          .map((stage) => (
            <div key={stage.id} className={styles.stageBlock}>
              <button
                type="button"
                className={`${styles.node} ${styles.nodeStage} ${
                  isCompleted('stage', { stageId: stage.id }) ? styles.completed : ''
                }`}
                onClick={() => openStage(stage.id)}
              >
                [{displayNameFor('stage', { stageId: stage.id }, stage.title)}]
              </button>

              {stage.categories
                .filter((c) =>
                  showCompleted
                    ? true
                    : !isCompleted('category', {
                        stageId: stage.id,
                        categoryId: c.id,
                      })
                )
                .map((category) => (
                  <div key={category.id} className={styles.branch}>
                    <div className={styles.arrow}>↓</div>

                    <div className={styles.inlineRow}>
                      <button
                        type="button"
                        className={`${styles.node} ${styles.nodeCategory} ${
                          isCompleted('category', {
                            stageId: stage.id,
                            categoryId: category.id,
                          })
                            ? styles.completed
                            : ''
                        }`}
                        onClick={() => openCategory(stage.id, category.id)}
                      >
                        [
                        {displayNameFor(
                          'category',
                          { stageId: stage.id, categoryId: category.id },
                          category.title
                        )}
                        ]
                      </button>

                      {category.tasks
                        .filter((t) =>
                          showCompleted
                            ? true
                            : !isCompleted('task', {
                                stageId: stage.id,
                                categoryId: category.id,
                                taskId: t.id,
                              })
                        )
                        .map((task) => (
                          <span key={task.id} className={styles.inlineItem}>
                            <span className={styles.sep}>&gt;</span>

                            <button
                              type="button"
                              className={`${styles.node} ${styles.nodeTask} ${
                                isCompleted('task', {
                                  stageId: stage.id,
                                  categoryId: category.id,
                                  taskId: task.id,
                                })
                                  ? styles.completed
                                  : ''
                              }`}
                              onClick={() => openTask(stage.id, category.id, task.id)}
                              title={task.title}
                            >
                              {displayNameFor(
                                'task',
                                {
                                  stageId: stage.id,
                                  categoryId: category.id,
                                  taskId: task.id,
                                },
                                task.title
                              )}
                            </button>
                          </span>
                        ))}
                    </div>
                  </div>
                ))}
            </div>
          ))}
      </div>
      <NewTaskModal
        open={showNewTask}
        stages={localStages}
        defaultStageId={defaultNewTaskStageId}
        onClose={() => setShowNewTask(false)}
        onCreate={createTaskFromPrompt}
      />
      {/* FULLSCREEN EDITOR MODAL */}
      <EntityEditorModal
        open={!!selected && !!currentMeta}
        kind={(selected?.kind ?? 'task') as any}
        meta={currentMeta as any}
        draftName={draftName}
        draftDesc={draftDesc}
        onChangeName={setDraftName}
        onChangeDesc={setDraftDesc}
        isDirty={isDirty}
        showCloseConfirm={showCloseConfirm}
        onRequestClose={requestClose}
        onCancelCloseConfirm={() => setShowCloseConfirm(false)}
        onSave={saveChanges}
        onSaveAndClose={saveAndClose}
        onDiscardAndClose={discardAndClose}
        onToggleComplete={toggleComplete}
        showBin={selected?.kind === 'task'}
        onMoveToBin={moveSelectedTaskToBin}
      />
    </section>
  );
}