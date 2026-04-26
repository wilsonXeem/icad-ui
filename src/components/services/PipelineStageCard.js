'use client';

import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PipelineStageCard({ item, isOpen, onToggle }) {
  return (
    <div className="panel-soft overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left"
      >
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-accentWarm">Stage {item.stage}</p>
          <p className="mt-2 font-heading text-xl font-semibold text-white">{item.title}</p>
        </div>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-slate-400 ${isOpen ? 'rotate-180 text-white' : ''}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="overflow-hidden"
          >
            <div className="border-t border-white/8 px-5 py-5">
              <div className="grid gap-5 lg:grid-cols-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Methods & Tools</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.methods}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">What We Do</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.whatWeDo}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Why It Matters</p>
                  <p className="mt-3 text-sm leading-7 text-slate-300">{item.whyItMatters}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
