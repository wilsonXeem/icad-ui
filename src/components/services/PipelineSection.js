'use client';

import { useState } from 'react';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import { pipelineStages } from '@/data/servicesData';
import PipelineStageCard from './PipelineStageCard';

export default function PipelineSection() {
  const [activeStage, setActiveStage] = useState('A');

  return (
    <section id="pipeline" className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Computational Discovery Pipeline"
          title="From molecular data to mechanistic insight, predictive intelligence, and optimized leads."
          description="The ICAD discovery pipeline is organized into expandable stages so teams can inspect the methods, the technical work, and the scientific value without losing the overall flow."
        />
        <div className="grid gap-4">
          {pipelineStages.map((item) => (
            <PipelineStageCard
              key={item.stage}
              item={item}
              isOpen={activeStage === item.stage}
              onToggle={() => setActiveStage((current) => (current === item.stage ? '' : item.stage))}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
