import React from 'react';
import { ShieldCheck, HeartHandshake, Layers, Building, ArrowUpRight } from 'lucide-react';

interface WhyChooseUsProps {
  onOpenEnquiry: () => void;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ onOpenEnquiry }) => {
  const strengths = [
    {
      icon: <Layers size={22} color="var(--color-bronze)" />,
      title: 'Complete Surfaces & Bathware Under One Roof',
      desc: 'Floor, wall, vitrified, and designer tiles displayed alongside the matching faucets, rain showers, basins, and sanitaryware. No running between multiple stores.'
    },
    {
      icon: <HeartHandshake size={22} color="var(--color-bronze)" />,
      title: 'Honest Advisory, Not Just Sales',
      desc: 'Whether you are remodeling one bathroom or finishing a complete residential villa, our showroom team helps you evaluate tile slip ratings, traffic endurance, and grout compatibility.'
    },
    {
      icon: <ShieldCheck size={22} color="var(--color-bronze)" />,
      title: '100% Genuine, Warranty-Backed Brands',
      desc: 'Direct authorized dealer relationships with Kajaria, Simpolo, Parryware, and MYK LATICRETE ensure authentic factory-grade quality, batch consistency, and manufacturer warranties.'
    },
    {
      icon: <Building size={22} color="var(--color-bronze)" />,
      title: 'Three Convenient Showrooms in AP',
      desc: 'Physical presence in Governorpet, Vijayawada and Chilakaluripeta makes it easy for homeowners, architects, and contractors to inspect full-size tile slabs and bath mockups in person.'
    }
  ];

  return (
    <section id="why-us" className="tw-section" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="tw-container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '0.95fr 1.05fr',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'center'
          }}
          className="tw-why-grid"
        >
          {/* Left Column: Heritage Story */}
          <div>
            <div className="tw-eyebrow">
              <span className="tw-eyebrow-dot"></span>
              <span>Our Heritage &bull; Est. 2004</span>
            </div>
            <h2
              className="tw-section-title"
              style={{ fontSize: 'clamp(2.25rem, 4vw, 3.25rem)', marginBottom: '1.25rem' }}
            >
              Good tiles and honest advice, since 2004.
            </h2>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '1.25rem'
              }}
            >
              Tile World started with one showroom in Governorpet in 2004 and a simple idea: make it easy to find good tiles and genuine bathware in one place, from people who actually help you choose.
            </p>
            <p
              style={{
                fontSize: '1rem',
                color: 'var(--color-text-muted)',
                lineHeight: 1.7,
                marginBottom: '2rem'
              }}
            >
              Today the same family operates three regional showrooms across Governorpet and Chilakaluripeta, helping homeowners, architects, and interior designers pick tiles and bathware that suit the space, the use, and the budget.
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button
                onClick={onOpenEnquiry}
                className="tw-btn tw-btn-primary"
                style={{ padding: '0.875rem 1.75rem' }}
              >
                <span>Schedule Consultation</span>
                <ArrowUpRight size={15} />
              </button>

              <a
                href="#showrooms"
                className="tw-btn tw-btn-secondary"
                style={{ padding: '0.875rem 1.5rem' }}
              >
                <span>Find Showrooms</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Strengths Grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem'
            }}
          >
            {strengths.map((s, idx) => (
              <div
                key={idx}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  padding: '1.75rem',
                  borderRadius: 'var(--radius-sm)',
                  border: '1px solid var(--color-border)',
                  boxShadow: 'var(--shadow-sm)',
                  display: 'flex',
                  flexDirection: 'column',
                  transition: 'all var(--transition-normal)'
                }}
                className="tw-strength-card"
              >
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: 'var(--radius-xs)',
                    backgroundColor: 'var(--color-bronze-light)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '1.25rem'
                  }}
                >
                  {s.icon}
                </div>
                <h3
                  style={{
                    fontFamily: 'var(--font-serif)',
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    color: 'var(--color-text-main)',
                    marginBottom: '0.625rem'
                  }}
                >
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .tw-strength-card:hover {
          border-color: var(--color-border-active);
          transform: translateY(-2px);
          box-shadow: var(--shadow-md);
        }
        @media (max-width: 960px) {
          .tw-why-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
};
