import PageContainer from '@/components/shared/PageContainer';
import SectionHeader from '@/components/shared/SectionHeader';
import Card from '@/components/ui/Card';
import Reveal from '@/components/shared/Reveal';
import { contactEmails } from '@/data/contactData';

export default function ContactInfoSection() {
  return (
    <section className="section-shell">
      <PageContainer>
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <SectionHeader
            badge="Contact ICAD"
            title="Reach the team for research inquiries, support, partnerships, and academy-related questions."
            description="ICAD is positioned for high-trust scientific communication, and the contact surface reflects that with clear channels and a direct inquiry flow."
            className="mb-0"
          />
          <div className="grid gap-4">
            {contactEmails.map((email, index) => (
              <Reveal key={email} delay={index * 0.04}>
                <Card className="p-5">
                  <a href={`mailto:${email}`} className="text-sm text-slate-200 hover:text-white">
                    {email}
                  </a>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </PageContainer>
    </section>
  );
}
