import { ArrowRight, Atom, BrainCircuit, FlaskConical, Sparkles } from 'lucide-react';
import PageContainer from '@/components/shared/PageContainer';
import PrimaryButton from '@/components/ui/PrimaryButton';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { heroActions, signalCards } from '@/data/homeData';

const heroIcons = [BrainCircuit, FlaskConical, Atom];

export default function HeroSection() {
  return (
    <section className="section-shell pt-24">
      <PageContainer>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1.05fr)_420px] lg:items-end">
          <Reveal>
            <div>
              <span className="eyebrow">
                <Sparkles className="h-3.5 w-3.5" />
                ICAD Scientific Platform
              </span>
              <h1 className="headline mt-6">
                Redefining Discovery with <span className="text-gradient">Artificial Intelligence</span> and
                Computational Science
              </h1>
              <p className="subheadline mt-6">
                Accelerating drug discovery, material innovation, and scientific research through advanced
                computational modeling, machine learning, and intelligent design.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <PrimaryButton href={heroActions[0].href}>{heroActions[0].label}</PrimaryButton>
                <SecondaryButton href={heroActions[1].href}>{heroActions[1].label}</SecondaryButton>
                <SecondaryButton href={heroActions[2].href} className="border-accentWarm/25 text-accentWarm">
                  {heroActions[2].label}
                </SecondaryButton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <Card className="overflow-hidden p-0">
              <div className="border-b border-white/10 p-6">
                <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Computational Discovery Stack</p>
                <p className="mt-3 font-heading text-2xl font-semibold text-white">
                  Publication-grade workflows built for modern research teams.
                </p>
              </div>
              <div className="grid gap-4 p-6">
                {signalCards.map((item, index) => {
                  const Icon = heroIcons[index];

                  return (
                    <div key={item.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="rounded-2xl border border-accent/25 bg-accent/10 p-2 text-accent">
                          <Icon className="h-4 w-4" />
                        </div>
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                      </div>
                      <p className="text-sm leading-7 text-slate-300">{item.description}</p>
                    </div>
                  );
                })}
                <div className="flex items-center gap-2 rounded-2xl border border-accentWarm/20 bg-accentWarm/10 px-4 py-3 text-sm text-accentWarm">
                  <ArrowRight className="h-4 w-4" />
                  Research services, academy, and protected platform access in one ecosystem.
                </div>
              </div>
            </Card>
          </Reveal>
        </div>
      </PageContainer>
    </section>
  );
}
