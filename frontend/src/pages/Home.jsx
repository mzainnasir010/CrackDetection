import { Link } from 'react-router-dom';
import { ScanLine, BarChart3, Cpu, Zap, ArrowRight, CheckCircle, Activity, Shield, ExternalLink, Database, Image, SplitSquareHorizontal, FolderOpen } from 'lucide-react';
import { StatsCard, Card, SectionHeader, Badge } from '../components/UI';
import { ROUTES, MODEL_LIST, COLORS } from '../theme';

const STATS = [
  { label: 'Best Test Accuracy', value: '100%',   sub: '3 of 4 models on test set',   icon: CheckCircle, accent: COLORS.accent   },
  { label: 'Best F1 Score',      value: '1.0000',  sub: 'perfect classification',        icon: Zap,         accent: COLORS.resnet   },
  { label: 'Active Models',      value: '4',       sub: 'deployed on HuggingFace',       icon: Cpu,         accent: COLORS.mobilenet },
  { label: 'Dataset',            value: '40k+',    sub: 'concrete surface images',       icon: Shield,      accent: COLORS.densenet  },
];

const FEATURES = [
  {
    title: 'Multi-Model Ensemble',
    body:  'Four architectures run simultaneously - EfficientNetB0, ResNet50, MobileNetV2, and DenseNet121 - providing a robust, averaged verdict.',
    icon:  Activity,
    color: COLORS.accent,
  },
  {
    title: 'Instant Inference',
    body:  'Upload any concrete surface image and receive crack probability scores from all models within seconds.',
    icon:  Zap,
    color: COLORS.resnet,
  },
  {
    title: 'Metrics Dashboard',
    body:  'Explore training accuracy, validation loss, and per-epoch curves across all model architectures side-by-side.',
    icon:  BarChart3,
    color: COLORS.mobilenet,
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <div style={{ marginBottom: 56 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '.14em', textTransform: 'uppercase',
          color: 'var(--accent)', marginBottom: 16,
        }}>
          Deep Learning · Structural Analysis
        </p>

        <h1 style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(36px, 6vw, 64px)',
          fontWeight: 800, lineHeight: 1.08,
          color: 'var(--text-primary)',
          marginBottom: 20, letterSpacing: '-.02em',
        }}>
          Concrete<br />
          <span style={{
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundImage: 'linear-gradient(90deg, var(--accent) 0%, black 80%)',
            backgroundClip: 'text',
          }}>Crack Detection</span>
        </h1>

        <p style={{
          color: 'var(--text-secondary)', fontSize: 16, lineHeight: 1.7,
          maxWidth: 480, marginBottom: 32,
        }}>
          Upload a concrete surface image and get instant structural analysis
          from four state-of-the-art CNN architectures.
        </p>

        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to={ROUTES.DETECT} style={{ textDecoration: 'none' }}>
            <button className="btn btn-primary" style={{ fontSize: 14, padding: '11px 24px' }}>
              <ScanLine size={15} strokeWidth={2} />
              Start Detection
              <ArrowRight size={14} strokeWidth={2} />
            </button>
          </Link>
          <Link to={ROUTES.METRICS} style={{ textDecoration: 'none' }}>
            <button className="btn btn-ghost" style={{ fontSize: 14, padding: '11px 24px' }}>
              <BarChart3 size={15} strokeWidth={1.8} />
              View Metrics
            </button>
          </Link>
        </div>
      </div>

      {/* Stats row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16, marginBottom: 48,
      }}>
        {STATS.map(s => <StatsCard key={s.label} {...s} />)}
      </div>

      {/* Model chips */}
      <Card style={{ marginBottom: 48 }}>
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          letterSpacing: '.1em', textTransform: 'uppercase',
          color: 'var(--text-muted)', marginBottom: 16,
        }}>Active Models</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {MODEL_LIST.map(m => (
            <div key={m.key} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 16px',
              background: 'var(--bg-raised)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
            }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: m.color, flexShrink: 0,
              }} />
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)', lineHeight: 1.3 }}>{m.name}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
                  {(m.parameters / 1e6).toFixed(1)}M params
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Features */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: 16,
      }}>
        {FEATURES.map(f => {
          const Icon = f.icon;
          return (
            <Card key={f.title} glow>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 36, borderRadius: 10,
                background: `color-mix(in srgb, ${f.color} 10%, transparent)`,
                marginBottom: 14,
              }}>
                <Icon size={18} color={f.color} strokeWidth={1.8} />
              </span>
              <h3 style={{ fontWeight: 700, fontSize: 15, color: 'var(--text-primary)', marginBottom: 8 }}>
                {f.title}
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: 13, lineHeight: 1.65 }}>{f.body}</p>
            </Card>
          );
        })}
      </div>
      {/* Dataset Info */}
      <div style={{ marginTop: 56 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 24 }}>
          <div>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 8 }}>
              Training Data
            </p>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(22px, 3vw, 30px)', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-.01em' }}>
              Dataset Overview
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: 14, lineHeight: 1.6, maxWidth: 480, marginTop: 8 }}>
              Models trained on the <strong style={{ color: 'var(--text-primary)' }}>Concrete Crack Detection</strong> dataset -
              40,000 labeled surface images split across crack and no-crack classes.
            </p>
          </div>
          <a
            href="https://www.kaggle.com/datasets/augustodenevreze/concrete-data-wk4"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="btn btn-primary" style={{ fontSize: 13, padding: '10px 20px', gap: 7 }}>
              <FolderOpen size={14} strokeWidth={2} />
              Explore Dataset
              <ExternalLink size={12} strokeWidth={2} />
            </button>
          </a>
        </div>

        {/* Stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 20 }}>
          {[
            { icon: Image,                label: 'Total Images',    value: '40,000',  sub: 'JPG · 227 × 227 px' },
            { icon: SplitSquareHorizontal, label: 'Classes',         value: '2',       sub: 'Crack · No Crack' },
            { icon: Database,             label: 'Per Class',        value: '20,000',  sub: 'balanced split' },
            { icon: Shield,               label: 'Source',           value: 'SDNET',   sub: 'concrete surface scans' },
          ].map(({ icon: Icon, label, value, sub }) => (
            <div key={label} className="card" style={{ padding: '16px 18px', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span style={{
                width: 32, height: 32, borderRadius: 'var(--radius-md)',
                background: 'var(--accent-dim)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <Icon size={15} color="var(--accent)" strokeWidth={1.8} />
              </span>
              <div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</p>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1 }}>{value}</p>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 4 }}>{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Split bar */}
        <Card style={{ padding: '18px 20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.08em' }}>Class Distribution</p>
            <div style={{ display: 'flex', gap: 16 }}>
              {[{ label: 'Crack', pct: 50, color: 'var(--danger)' }, { label: 'No Crack', pct: 50, color: 'var(--success)' }].map(c => (
                <div key={c.label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: c.color, flexShrink: 0 }} />
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-secondary)' }}>{c.label} - {c.pct}%</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', gap: 2 }}>
            <div style={{ flex: 1, background: 'var(--danger)', opacity: 0.7 }} />
            <div style={{ flex: 1, background: 'var(--success)', opacity: 0.7 }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>20,000 cracked images</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>20,000 intact images</span>
          </div>
        </Card>
      </div>

    </div>
  );
}
