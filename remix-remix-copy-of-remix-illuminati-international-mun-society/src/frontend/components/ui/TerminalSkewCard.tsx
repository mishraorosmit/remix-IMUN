import React from 'react';

interface TerminalSkewCardProps {
  title?: string;
  badge?: string;
  tag?: string;
  children: React.ReactNode;
  trafficLights?: { red?: boolean; yellow?: boolean; green?: boolean };
  className?: string;
  variant?: 'dark' | 'cream' | 'navy';
  onClick?: () => void;
}

export const TerminalSkewCard: React.FC<TerminalSkewCardProps> = ({
  title,
  badge,
  tag,
  children,
  className = '',
  variant = 'dark',
  onClick,
}) => {
  // Theme palette styles aligned with Illuminati MUN broadsheet aesthetic
  const isDark = variant === 'dark' || variant === 'navy';

  return (
    <div className={`terminal-skew-card-wrapper ${className}`} onClick={onClick}>
      <div className={`terminal-skew-card ${isDark ? 'terminal-card-dark' : 'terminal-card-cream'}`}>
        {/* macOS Terminal style 3-dot traffic light header */}
        <div className="terminal-header">
          <div className="terminal-dots">
            <span className="dot dot-red" />
            <span className="dot dot-yellow" />
            <span className="dot dot-green" />
          </div>
          {tag && (
            <span className="terminal-tag font-mono-tag">
              {tag}
            </span>
          )}
        </div>

        {/* Card Title & Content */}
        <div className="terminal-body">
          {badge && (
            <div className="terminal-badge font-mono-tag">
              {badge}
            </div>
          )}
          {title && (
            <h3 className="terminal-title font-canopee">
              {title}
            </h3>
          )}
          <div className="terminal-content font-editorial">
            {children}
          </div>
        </div>
      </div>

      <style>{`
        .terminal-skew-card-wrapper {
          perspective: 1000px;
          display: inline-block;
          width: 100%;
        }

        .terminal-skew-card {
          width: 100%;
          min-height: 140px;
          padding: 0.85rem 1rem 1.1rem 1rem;
          border-radius: 8px;
          backdrop-filter: blur(8px);
          transform: skewX(-3deg) rotate(-0.5deg);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          overflow: hidden;
          position: relative;
          cursor: pointer;
        }

        .terminal-card-dark {
          background: rgba(11, 25, 44, 0.92);
          border-bottom: 3px solid #C5A059;
          border-left: 3px solid #C5A059;
          border-top: 1px solid rgba(248, 244, 230, 0.15);
          border-right: 1px solid rgba(248, 244, 230, 0.15);
          box-shadow: -15px 20px 25px rgba(11, 25, 44, 0.35);
          color: #F8F4E6;
        }

        .terminal-card-cream {
          background: rgba(230, 213, 184, 0.88);
          border-bottom: 3px solid #0B192C;
          border-left: 3px solid #0B192C;
          border-top: 1px solid rgba(11, 25, 44, 0.15);
          border-right: 1px solid rgba(11, 25, 44, 0.15);
          box-shadow: -15px 20px 25px rgba(11, 25, 44, 0.18);
          color: #0B192C;
        }

        .terminal-skew-card:hover {
          transform: skewX(0deg) rotate(0deg) translateY(-4px);
          box-shadow: -5px 15px 25px rgba(11, 25, 44, 0.45);
        }

        .terminal-card-dark:hover {
          background: rgba(11, 25, 44, 0.98);
          border-bottom-color: #D97706;
          border-left-color: #D97706;
        }

        .terminal-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-bottom: 0.65rem;
          margin-bottom: 0.45rem;
          border-bottom: 1px solid rgba(197, 160, 89, 0.25);
        }

        .terminal-dots {
          display: flex;
          flex-direction: row;
          gap: 6px;
          align-items: center;
        }

        .dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          display: inline-block;
          box-shadow: -1px 2px 4px rgba(0, 0, 0, 0.3);
          transition: transform 0.2s ease;
        }

        .terminal-skew-card:hover .dot {
          transform: scale(1.15);
        }

        .dot-red {
          background-color: #ff605c;
        }

        .dot-yellow {
          background-color: #ffbd44;
        }

        .dot-green {
          background-color: #00ca4e;
        }

        .terminal-tag {
          font-size: 9.5px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: #C5A059;
          opacity: 0.9;
        }

        .terminal-body {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .terminal-badge {
          font-size: 10px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: #C5A059;
        }

        .terminal-title {
          font-size: 1.55rem;
          line-height: 1.1;
          letter-spacing: -0.02em;
          text-transform: uppercase;
          margin: 0.15rem 0 0.25rem 0;
          color: #F8F4E6;
          text-shadow: -2px 3px 6px rgba(0, 0, 0, 0.4);
        }

        .terminal-card-cream .terminal-title {
          color: #0B192C;
          text-shadow: none;
        }

        .terminal-content {
          font-size: 0.875rem;
          line-height: 1.45;
          opacity: 0.92;
        }
      `}</style>
    </div>
  );
};
