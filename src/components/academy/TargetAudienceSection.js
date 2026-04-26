'use client';

import { useEffect, useState } from 'react';
import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import EmptyState from '@/components/ui/EmptyState';
import Loader from '@/components/ui/Loader';
import SecondaryButton from '@/components/ui/SecondaryButton';
import Reveal from '@/components/shared/Reveal';
import { academyThemes, targetAudience } from '@/data/academyData';
import { getPublishedCourses } from '@/lib/courses';

export default function TargetAudienceSection() {
  const [courses, setCourses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadCourses = async () => {
      try {
        const response = await getPublishedCourses({ limit: 3 });
        setCourses(response.data || []);
      } catch (error) {
        setCourses([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadCourses();
  }, []);

  return (
    <section className="section-shell">
      <PageContainer>
        <SectionHeader
          badge="Audience & Themes"
          title="Built for students, early-career researchers, and scientists moving into AI-driven discovery."
          description="ICAD Academy is focused on learners who need computational depth, domain relevance, and a clear pathway into modern discovery workflows."
        />
        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <Card>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Target Audience</p>
            <div className="mt-5 grid gap-3">
              {targetAudience.map((item) => (
                <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-slate-200">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.28em] text-slate-400">Themes</p>
            <div className="mt-5 flex flex-wrap gap-3">
              {academyThemes.map((theme) => (
                <span key={theme} className="rounded-full border border-accent/20 bg-accent/10 px-4 py-2 text-sm text-accent">
                  {theme}
                </span>
              ))}
            </div>
          </Card>

          <div className="grid gap-4">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-400">Published Courses</p>
            {isLoading ? (
              <Loader label="Loading academy courses..." />
            ) : courses.length ? (
              courses.map((course, index) => (
                <Reveal key={course._id || course.slug} delay={index * 0.05}>
                  <Card className="p-5">
                    <p className="text-xs uppercase tracking-[0.24em] text-accentWarm">{course.level || 'Open level'}</p>
                    <h3 className="mt-3 font-heading text-xl font-semibold text-white">{course.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{course.description}</p>
                  </Card>
                </Reveal>
              ))
            ) : (
              <EmptyState
                title="Course catalog coming online"
                description="Published academy courses will appear here once they are added through the backend course management flow."
                action={<SecondaryButton href="/contact">Ask about upcoming cohorts</SecondaryButton>}
              />
            )}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
