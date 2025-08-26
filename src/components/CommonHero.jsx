import React from 'react';

const CommonHero = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  icon,
  bg = 'linear-gradient(135deg, #f8fafc 0%, #e6f9ec 100%)',
}) => {
  return (
    <section
      style={{
        background: bg,
        padding: '56px 0 40px 0',
        textAlign: 'center',
        direction: 'rtl',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '0 16px' }}>
        {icon && (
          <div style={{ fontSize: 48, marginBottom: 16 }}>{icon}</div>
        )}
        <h1 style={{
          fontSize: 36,
          fontWeight: 'bold',
          color: '#14532d',
          marginBottom: 12,
          letterSpacing: '-1px',
        }}>{title}</h1>
        {subtitle && (
          <p style={{
            fontSize: 18,
            color: '#374151',
            marginBottom: 28,
            lineHeight: 1.7,
          }}>{subtitle}</p>
        )}
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            style={{
              display: 'inline-block',
              background: 'linear-gradient(90deg, #059669 0%, #10b981 100%)',
              color: '#fff',
              fontWeight: 'bold',
              borderRadius: 12,
              padding: '14px 36px',
              fontSize: 18,
              textDecoration: 'none',
              boxShadow: '0 4px 16px #10b98122',
              transition: 'background 0.2s',
            }}
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  );
};

export default CommonHero; 