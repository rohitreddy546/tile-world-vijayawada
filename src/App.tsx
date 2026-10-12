import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { BrandTicker } from './components/BrandTicker';
import { CategoriesSection } from './components/CategoriesSection';
import { CollectionsGallery } from './components/CollectionsGallery';
import { FinishesVideoSection } from './components/FinishesVideoSection';
import { ShowcaseGallery } from './components/ShowcaseGallery';
import { WhyChooseUs } from './components/WhyChooseUs';
import { ShowroomsSection } from './components/ShowroomsSection';
import { EnquirySection } from './components/EnquirySection';
import { Footer } from './components/Footer';
import { EnquiryModal } from './components/EnquiryModal';
import { TileEstimatorCalculator } from './components/TileEstimatorCalculator';
import { BUSINESS_INFO } from './data/showroomData';

export const App: React.FC = () => {
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryCategory, setEnquiryCategory] = useState<string | undefined>(undefined);
  const [enquirySqFt, setEnquirySqFt] = useState<string | undefined>(undefined);
  const [enquiryMessage, setEnquiryMessage] = useState<string | undefined>(undefined);

  const handleOpenEnquiry = (category?: string) => {
    setEnquiryCategory(category);
    setEnquirySqFt(undefined);
    setEnquiryMessage(undefined);
    setEnquiryModalOpen(true);
  };

  const handleOpenEnquiryWithEstimate = (summary: string, approxSqFt: string) => {
    setEnquiryCategory('Flooring & Vitrified Tiles');
    setEnquirySqFt(approxSqFt);
    setEnquiryMessage(`Calculated tile requirement from showroom estimator: ${summary}`);
    setEnquiryModalOpen(true);
  };

  const handleCloseEnquiry = () => {
    setEnquiryModalOpen(false);
    setEnquiryCategory(undefined);
    setEnquirySqFt(undefined);
    setEnquiryMessage(undefined);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Architectural Header */}
      <Header onOpenEnquiry={handleOpenEnquiry} />

      {/* 3. Main Content Landmark */}
      <main style={{ flex: 1 }}>
        {/* Cinematic Hero */}
        <Hero onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* Brand Partner Ticker */}
        <BrandTicker />

        {/* Product Category Architecture */}
        <CategoriesSection
          onSelectCategory={(_catId) => {
            const element = document.getElementById('collections');
            if (element) {
              element.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        />

        {/* Featured Collections Gallery with Specification Drawers */}
        <CollectionsGallery onOpenConsultation={(prod) => handleOpenEnquiry(prod)} />

        {/* Interactive Tile Coverage & Box Estimator Tool */}
        <TileEstimatorCalculator onOpenConsultationWithEstimate={handleOpenEnquiryWithEstimate} />

        {/* Tactile Finishes & Real MP4 Video Showcase */}
        <FinishesVideoSection />

        {/* Interior Installations Showcase with Fullscreen Lightbox */}
        <ShowcaseGallery onOpenConsultation={(space) => handleOpenEnquiry(space)} />

        {/* Business Heritage & Supported Strengths */}
        <WhyChooseUs onOpenEnquiry={() => handleOpenEnquiry()} />

        {/* Verified Showrooms Network with Google Maps */}
        <ShowroomsSection />

        {/* Interactive Consultation & Enquiry Section */}
        <EnquirySection onOpenEnquiry={() => handleOpenEnquiry()} />
      </main>

      {/* 4. Architectural Footer */}
      <Footer />

      {/* 5. Consultation & Quotation Modal */}
      <EnquiryModal
        isOpen={enquiryModalOpen}
        onClose={handleCloseEnquiry}
        initialCategory={enquiryCategory}
        initialSqFt={enquirySqFt}
        initialMessage={enquiryMessage}
      />

      {/* 6. Floating Persistent WhatsApp Button */}
      <aside aria-label="Quick contact shortcuts">
        <a
          href={BUSINESS_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            position: 'fixed',
            bottom: '1.75rem',
            right: '1.75rem',
            zIndex: 90,
            display: 'flex',
            alignItems: 'center',
            gap: '0.625rem',
            backgroundColor: '#25D366',
            color: '#FFFFFF',
            padding: '0.75rem 1.125rem',
            borderRadius: 'var(--radius-pill)',
            boxShadow: '0 8px 24px rgba(37, 211, 102, 0.35)',
            textDecoration: 'none',
            fontWeight: 600,
            fontSize: '0.875rem',
            letterSpacing: '0.01em',
            transition: 'all var(--transition-fast)'
          }}
          className="tw-floating-wa-btn"
          aria-label="Direct WhatsApp consultation with Tile World"
        >
          <MessageSquare size={18} />
          <span className="tw-wa-label">WhatsApp Us</span>
        </a>
      </aside>

      <style>{`
        .tw-floating-wa-btn:hover {
          transform: translateY(-2px) scale(1.03);
          box-shadow: 0 12px 28px rgba(37, 211, 102, 0.45);
        }
        @media (max-width: 600px) {
          .tw-wa-label {
            display: none !important;
          }
          .tw-floating-wa-btn {
            padding: 0.875rem !important;
            border-radius: 50% !important;
          }
        }
      `}</style>
    </div>
  );
};
