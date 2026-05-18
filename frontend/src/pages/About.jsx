import { Brain, Server, Code2, Layers } from 'lucide-react';
import { Card, SectionHeader, Badge } from '../components/UI';
import { MODEL_LIST, COLORS } from '../theme';

const TECH = [
  {
    label: 'Deep Learning',
    icon:  Brain,
    color: COLORS.accent,
    items: ['TensorFlow 2.19', 'Keras API', 'ImageDataGenerator', 'MirroredStrategy (multi-GPU)'],
  },
  {
    label: 'Architectures',
    icon:  Layers,
    color: COLORS.resnet,
    items: ['EfficientNetB0', 'ResNet50', 'MobileNetV2', 'DenseNet121'],
  },
  {
    label: 'Backend',
    icon:  Server,
    color: COLORS.mobilenet,
    items: ['FastAPI', 'Python 3.12', 'Uvicorn', 'Pillow / NumPy'],
  },
  {
    label: 'Frontend',
    icon:  Code2,
    color: COLORS.densenet,
    items: ['React 18 + Vite', 'Recharts', 'React Router v6', 'CSS Variables'],
  },
];

const MODEL_DETAILS = {
  EfficientNetB0: { layers: 'B0 baseline', note: 'Test Acc: 100% · F1: 1.00 · Compound scaling: depth × width × resolution.' },
  ResNet50:       { layers: '50',          note: 'Test Acc: 100% · F1: 1.00 · Residual skip connections prevent vanishing gradients.' },
  MobileNetV2:    { layers: 'V2',          note: 'Test Acc: 99% · F1: 0.9881 · Inverted residuals + linear bottlenecks. Edge-optimised.' },
  DenseNet121:    { layers: '121',         note: 'Test Acc: 100% · F1: 1.00 · Every layer connects to every subsequent layer.' },
};

export default function About() {
  return (
    <div>
      <SectionHeader
        label="About"
        title="System Overview"
        subtitle="A full-stack deep learning system comparing four CNN architectures on concrete crack detection."
      />

      {/* Intro */}
      <Card style={{ marginBottom: 24 }}>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 14, marginBottom: 12 }}>
          This application uses transfer learning to fine-tune four pre-trained convolutional neural
          networks on the <strong style={{ color: 'var(--text-primary)' }}>Concrete Crack Images</strong> dataset
          (~40,000 surface photos, balanced crack / no-crack).
        </p>
        <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: 14 }}>
          Each model is trained in two stages: frozen base layers for feature extraction, then
          selective unfreezing for fine-tuning. Results are aggregated via ensemble averaging
          of crack probabilities to produce a final verdict.
        </p>
      </Card>

      {/* Model cards */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
          Model Architectures
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14 }}>
          {MODEL_LIST.map(m => {
            const detail = MODEL_DETAILS[m.key] || {};
            return (
              <div key={m.key} className="card" style={{
                padding: '18px 20px',
                border: `1px solid color-mix(in srgb, ${m.color} 20%, transparent)`,
                borderLeft: `3px solid ${m.color}`,
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
                  <h3 style={{ fontWeight: 700, fontSize: 14, color: 'var(--text-primary)' }}>{m.name}</h3>
                  <span style={{
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: m.color, background: `color-mix(in srgb, ${m.color} 10%, transparent)`,
                    padding: '2px 8px', borderRadius: 100,
                  }}>{m.architecture}</span>
                </div>
                <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>
                  {(m.parameters / 1e6).toFixed(1)}M parameters
                </p>
                <p style={{ fontSize: 12, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{detail.note}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Training setup */}
      <Card style={{ marginBottom: 24 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: 16 }}>
          Training Setup
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 16 }}>
          {[
            { k: 'Input Size',      v: '224 × 224' },
            { k: 'Batch Size',      v: '64' },
            { k: 'Stage 1 Epochs',  v: '10' },
            { k: 'Stage 2 Epochs',  v: '15' },
            { k: 'Optimizer',       v: 'Adam' },
            { k: 'Hardware',        v: 'Kaggle T4 GPU' },
            { k: 'Deployment',      v: 'HuggingFace' },
            { k: 'Dataset',         v: '40k images' },
          ].map(({ k, v }) => (
            <div key={k} style={{ padding: '12px 14px', background: 'var(--bg-raised)', borderRadius: 10 }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 4, letterSpacing: '.06em' }}>{k}</p>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 600, color: 'var(--accent)' }}>{v}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Tech stack */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 14 }}>
        {TECH.map(t => {
          const Icon = t.icon;
          return (
            <Card key={t.label} style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                <span style={{
                  width: 30, height: 30, borderRadius: 8,
                  background: `color-mix(in srgb, ${t.color} 10%, transparent)`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                }}>
                  <Icon size={15} color={t.color} strokeWidth={1.8} />
                </span>
                <p style={{ fontWeight: 700, fontSize: 13, color: 'var(--text-primary)' }}>{t.label}</p>
              </div>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                {t.items.map(i => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <span style={{ width: 4, height: 4, borderRadius: '50%', background: t.color, flexShrink: 0 }} />
                    <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{i}</span>
                  </li>
                ))}
              </ul>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
