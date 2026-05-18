/*    src/components/UI/index.jsx
   All shared UI primitives in one file. */

/* Card */
export function Card({ children, className = '', style = {}, glow = false, ...props }) {
  return (
    <div
      className={`card ${glow ? 'card-glow' : ''} ${className}`}
      style={{ padding: 24, ...style }}
      {...props}
    >
      {children}
    </div>
  );
}

/* SectionHeader */
export function SectionHeader({ label, title, subtitle }) {
  return (
    <div style={{ marginBottom: 32 }}>
      {label && (
        <p style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 11, letterSpacing: '.12em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 8,
        }}>{label}</p>
      )}
      <h1 style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(24px, 4vw, 36px)',
        fontWeight: 700, lineHeight: 1.2,
        color: 'var(--text-primary)',
      }}>{title}</h1>
      {subtitle && (
        <p style={{ marginTop: 8, color: 'var(--text-secondary)', fontSize: 14, maxWidth: 540 }}>{subtitle}</p>
      )}
    </div>
  );
}

/* Button */
export function Button({
  children, variant = 'primary', size = 'md',
  loading = false, disabled = false, icon: Icon,
  style = {}, className = '', ...props
}) {
  const sizes = { sm: '8px 16px', md: '10px 22px', lg: '13px 28px' };
  const fontSizes = { sm: 13, md: 14, lg: 15 };

  return (
    <button
      className={`btn btn-${variant} ${className}`}
      disabled={disabled || loading}
      style={{ padding: sizes[size], fontSize: fontSizes[size], ...style }}
      {...props}
    >
      {loading ? (
        <span style={{
          width: 14, height: 14, border: '2px solid currentColor',
          borderTopColor: 'transparent', borderRadius: '50%',
          animation: 'spin 1s linear infinite', display: 'inline-block',
        }} />
      ) : Icon ? (
        <Icon size={14} strokeWidth={2} />
      ) : null}
      {children}
    </button>
  );
}

/* Badge */
export function Badge({ children, color = 'var(--accent)', style = {} }) {
  return (
    <span className="badge" style={{
      background: `color-mix(in srgb, ${color} 13%, transparent)`,
      color,
      border: `1px solid color-mix(in srgb, ${color} 27%, transparent)`,
      ...style,
    }}>
      {children}
    </span>
  );
}

/* Spinner */
export function Spinner({ size = 20, color = 'var(--accent)' }) {
  return (
    <span style={{
      display: 'inline-block',
      width: size, height: size,
      border: `2px solid color-mix(in srgb, ${color} 20%, transparent)`,
      borderTopColor: color,
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
    }} />
  );
}

/* StatsCard */
export function StatsCard({ label, value, sub, icon: Icon, accent = 'var(--accent)', trend }) {
  return (
    <div className="card card-glow" style={{ padding: '20px 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--text-muted)' }}>
          {label}
        </p>
        {Icon && (
          <span style={{
            width: 32, height: 32, borderRadius: 8,
            background: `color-mix(in srgb, ${accent} 10%, transparent)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Icon size={15} color={accent} strokeWidth={1.8} />
          </span>
        )}
      </div>
      <p style={{
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(22px, 3vw, 30px)',
        fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1,
      }}>{value}</p>
      {(sub || trend) && (
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: trend?.up ? 'var(--accent)' : 'var(--text-muted)' }}>
          {trend && <span style={{ color: trend.up ? 'var(--accent)' : 'var(--danger)' }}>{trend.value} </span>}
          {sub}
        </p>
      )}
    </div>
  );
}

/* ProgressBar */
export function ProgressBar({ value, color = 'var(--accent)', height = 4, animated = true, label, showPercent = true }) {
  return (
    <div>
      {(label || showPercent) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
          {label && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{label}</span>}
          {showPercent && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color, fontWeight: 500 }}>{(value * 100).toFixed(1)}%</span>}
        </div>
      )}
      <div className="progress-track" style={{ height }}>
        <div
          className="progress-fill"
          style={{
            width: `${Math.min(100, value * 100)}%`,
            background: color,
            transition: animated ? 'width .7s cubic-bezier(.16,1,.3,1)' : 'none',
          }}
        />
      </div>
    </div>
  );
}

/* Divider */
export function Divider({ style = {} }) {
  return <div className="sep" style={style} />;
}

/* EmptyState */
export function EmptyState({ icon: Icon, title, body }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
      gap: 12, padding: '48px 24px', textAlign: 'center',
      border: '1px dashed var(--border)', borderRadius: 'var(--radius-lg)',
      color: 'var(--text-muted)',
    }}>
      {Icon && <Icon size={32} strokeWidth={1} style={{ opacity: .4 }} />}
      {title && <p style={{ fontWeight: 600, color: 'var(--text-secondary)', fontSize: 14 }}>{title}</p>}
      {body  && <p style={{ fontSize: 13, maxWidth: 300 }}>{body}</p>}
    </div>
  );
}
