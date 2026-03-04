import { useState } from 'react';
import { timeline } from '@/data/timeline';
import styles from './RulerTimeline.module.css';
import Timeline from '@/components/Timeline/Timeline';


type RulerItem = {
  id: string;
  label: string;
  kind: 'stage' | 'category' | 'task';
};


function flattenStages(stages: typeof timeline, showTasks: boolean): RulerItem[] {
  const items: RulerItem[] = [];


  stages.forEach((stage) => {
    stage.categories.forEach((category) => {
      items.push({ id: category.id, label: category.title, kind: 'category' });


      if (showTasks) {
        category.tasks.forEach((task) => {
          items.push({ id: task.id, label: task.title, kind: 'task' });
        });
      }
    });


    items.push({ id: stage.id, label: stage.title, kind: 'stage' });
  });


  return items;
}


export default function RulerTimeline() {
  const [activeStageId, setActiveStageId] = useState<string | 'all'>('all');
  const [showCompleted, setShowCompleted] = useState(true);


  const stages = timeline;


  const visibleStages =
    activeStageId === 'all' ? stages : stages.filter((s) => s.id === activeStageId);


  // show tasks on ruler only when viewing a single stage (as you had before)
  const showTasksOnRuler = activeStageId !== 'all';
  const rulerItems = flattenStages(visibleStages, showTasksOnRuler);


  return (
    <section className={styles.wrapper}>
      {/* Top bar INSIDE layout */}
      <div className={styles.topBar}>
        <div className={styles.stageButtons}>
          <button
            className={activeStageId === 'all' ? styles.activeBtn : styles.btn}
            onClick={() => setActiveStageId('all')}
            type="button"
          >
            All
          </button>


          {stages.map((stage, i) => (
            <button
              key={stage.id}
              className={activeStageId === stage.id ? styles.activeBtn : styles.btn}
              onClick={() => setActiveStageId(stage.id)}
              type="button"
            >
              Stage {i + 1}
            </button>
          ))}
        </div>
      </div>


      {/* ✅ RULER (this is what disappeared) */}
      <div className={styles.scroll}>
        <div className={styles.ruler}>
          <div className={styles.line} />


          {rulerItems.map((item) => (
            <div
              key={`${item.kind}:${item.id}`}
              className={`${styles.item} ${styles[item.kind]}`}
              title={item.label}
            >
              <span className={styles.tick} />
              <span className={styles.label}>{item.label}</span>
            </div>
          ))}
        </div>
      </div>


      {/* Timeline display controlled by buttons + toggle */}
      <Timeline
        stages={visibleStages}
        showCompleted={showCompleted}
        onToggleShowCompleted={() => setShowCompleted((v) => !v)}
      />
    </section>
  );
}