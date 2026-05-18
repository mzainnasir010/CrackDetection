import { useState, useRef, useEffect } from 'react';
import {
  Upload, X, AlertCircle, Activity,
  CheckCircle2, AlertTriangle, HelpCircle, Clock, Cpu, Zap,
} from 'lucide-react';
import {
  Card, Button, Spinner, ProgressBar, SectionHeader, EmptyState,
} from '../components/UI';
import { predictImage } from '../services/api';
import { toBase64 } from '../utils/helpers';
import { COLORS, MODEL_META, MODEL_LIST } from '../theme';

/* helpers */
const THRESHOLD = 0.65;
function getVerdict(crackProb) {
  if (crackProb > THRESHOLD)     return { label: 'Crack Detected', level: 'crack',     color: COLORS.danger };
  if (crackProb < 1 - THRESHOLD) return { label: 'No Crack Found', level: 'safe',      color: COLORS.accent };
  return                                { label: 'Uncertain',       level: 'uncertain', color: COLORS.warning };
}
function fmt(s) { return s < 1 ? `${(s * 1000).toFixed(0)}ms` : `${s.toFixed(2)}s`; }

/* Sample images */
const SAMPLE_IMAGES = [
  {
    label: 'With Crack',
    tag: 'crack',
    images: [
      { url: 'https://res.cloudinary.com/defegszzf/image/upload/v1779018413/15001_zjjdsc.jpg',  name: 'Sample C-1' },
      { url: 'https://res.cloudinary.com/defegszzf/image/upload/v1779018426/15035_1_b95qgg.jpg', name: 'Sample C-2' },
      { url: 'https://res.cloudinary.com/defegszzf/image/upload/v1779018426/15029_1_xzh58l.jpg', name: 'Sample C-3' },
    ],
  },
  {
    label: 'No Crack',
    tag: 'no-crack',
    images: [
      { url: 'https://res.cloudinary.com/defegszzf/image/upload/v1779018413/15002_llpfnv.jpg', name: 'Sample N-1' },
      { url: 'https://res.cloudinary.com/defegszzf/image/upload/v1779018413/15003_muczmi.jpg', name: 'Sample N-2' },
      { url: 'https://res.cloudinary.com/defegszzf/image/upload/v1779018413/15001_zjjdsc.jpg', name: 'Sample N-3' },
    ],
  },
];

/* ModelToggle */
function ModelToggle({ model, selected, onToggle }) {
  const meta   = MODEL_META[model.key] || {};
  const color  = meta.color || 'var(--accent)';
  const active = selected;
  return (
    <button
      onClick={() => onToggle(model.key)}
      style={{
        display: 'flex', alignItems: 'center', gap: 10,
        padding: '10px 14px',
        background: active ? `color-mix(in srgb, ${color} 8%, transparent)` : 'var(--bg-raised)',
        border: `1px solid ${active ? `color-mix(in srgb, ${color} 33%, transparent)` : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        cursor: 'pointer', transition: 'all .15s',
        width: '100%', textAlign: 'left',
      }}
    >
      <span style={{
        width: 10, height: 10, borderRadius: '50%', flexShrink: 0,
        background: active ? color : 'var(--text-muted)',
        boxShadow: active ? `0 0 6px ${color}` : 'none',
        transition: 'all .15s',
      }} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontSize: 13, fontWeight: 600, color: active ? 'var(--text-primary)' : 'var(--text-secondary)', lineHeight: 1.3 }}>
          {model.name}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>
          {model.architecture}
        </p>
      </div>
    </button>
  );
}

/* PredCard */
function PredCard({ pred }) {
  const crackProb = pred.crack_prob ?? (pred.prediction === 'crack' ? pred.confidence : 1 - pred.confidence);
  const verdict   = getVerdict(crackProb);
  const meta      = MODEL_META[pred.model] || {};

  return (
    <div style={{
      padding: '16px 18px',
      background: 'var(--bg-raised)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
        <div>
          <p style={{ fontWeight: 600, fontSize: 13, color: 'var(--text-primary)' }}>{pred.model_name}</p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>
            {meta.architecture || pred.model}
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
          <Clock size={11} color="var(--text-muted)" />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
            {fmt(pred.inference_time)}
          </span>
        </div>
      </div>

      <div style={{ marginBottom: 10 }}>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 600,
          color: verdict.color, padding: '2px 8px',
          background: `color-mix(in srgb, ${verdict.color} 10%, transparent)`,
          borderRadius: 100,
        }}>{verdict.label}</span>
      </div>

      <ProgressBar value={crackProb} color={verdict.color} height={3} label="crack probability" showPercent />
    </div>
  );
}

/* EnsembleVerdict */
function EnsembleVerdict({ predictions }) {
  const crackProbs = predictions.map(p =>
    p.crack_prob ?? (p.prediction === 'crack' ? p.confidence : 1 - p.confidence)
  );
  const avg     = crackProbs.reduce((a, b) => a + b, 0) / crackProbs.length;
  const verdict = getVerdict(avg);
  const flagged = crackProbs.filter(p => p > THRESHOLD).length;

  const VIcon = verdict.level === 'crack' ? AlertTriangle
              : verdict.level === 'safe'  ? CheckCircle2
              : HelpCircle;

  return (
    <div style={{
      padding: '20px 22px',
      background: `color-mix(in srgb, ${verdict.color} 6%, transparent)`,
      backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
      border: `1px solid color-mix(in srgb, ${verdict.color} 20%, transparent)`,
      borderRadius: 'var(--radius-lg)', marginBottom: 20,
    }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '.1em', textTransform: 'uppercase', color: verdict.color, marginBottom: 10 }}>
        Ensemble Verdict
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
        <VIcon size={28} color={verdict.color} strokeWidth={1.5} />
        <div>
          <p style={{ fontSize: 24, fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.1 }}>
            {verdict.label}
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>
            {flagged}/{predictions.length} models flagged · avg {(avg * 100).toFixed(0)}% crack prob
          </p>
        </div>
      </div>
      <ProgressBar value={avg} color={verdict.color} height={5} showPercent={false} />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 4 }}>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>no crack</span>
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)' }}>crack</span>
      </div>
    </div>
  );
}

/* DropZone */
function DropZone({ onFile }) {
  const [dragging, setDragging] = useState(false);
  const ref = useRef();

  const handle = (file) => {
    if (!file) return;
    const allowed = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowed.includes(file.type)) return;
    if (file.size > 5 * 1024 * 1024) return;
    onFile(file);
  };

  return (
    <div
      onDragOver={e => { e.preventDefault(); setDragging(true); }}
      onDragLeave={() => setDragging(false)}
      onDrop={e => { e.preventDefault(); setDragging(false); handle(e.dataTransfer.files[0]); }}
      onClick={() => ref.current?.click()}
      style={{
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: 12, padding: '40px 24px',
        border: `2px dashed ${dragging ? 'var(--accent)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-lg)',
        background: dragging ? 'var(--accent-dim)' : 'var(--bg-raised)',
        cursor: 'pointer', transition: 'all .15s', minHeight: 220,
      }}
    >
      <input ref={ref} type="file" accept="image/jpeg,image/png" style={{ display: 'none' }} onChange={e => handle(e.target.files[0])} />
      <span style={{
        width: 48, height: 48, borderRadius: 12,
        background: dragging ? 'var(--accent)' : 'var(--border)',
        display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all .15s',
      }}>
        <Upload size={20} color={dragging ? '#0d0f12' : 'var(--text-muted)'} />
      </span>
      <div style={{ textAlign: 'center' }}>
        <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: 4, fontSize: 14 }}>
          {dragging ? 'Drop image here' : 'Click or drag to upload'}
        </p>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>
          JPG · PNG · max 5 MB
        </p>
      </div>
    </div>
  );
}

/* QuickAnalysis Gallery */
function QuickAnalysis({ onSelect, selectedUrl }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
      {SAMPLE_IMAGES.map(group => {
        const isCrack  = group.tag === 'crack';
        const tagColor = isCrack ? 'var(--danger)' : 'var(--success)';
        return (
          <div key={group.tag}>
            {/* Group label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
              <span style={{
                width: 8, height: 8, borderRadius: '50%',
                background: tagColor, flexShrink: 0,
                boxShadow: `0 0 6px ${tagColor}`,
              }} />
              <p style={{
                fontFamily: 'var(--font-mono)', fontSize: 11,
                textTransform: 'uppercase', letterSpacing: '.08em',
                color: tagColor,
              }}>{group.label}</p>
            </div>

            {/* 3-column image grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
              {group.images.map(img => {
                const isSelected = selectedUrl === img.url;
                return (
                  <button
                    key={img.url}
                    onClick={() => onSelect(img)}
                    title={img.name}
                    style={{
                      position: 'relative', padding: 0, border: 'none',
                      cursor: 'pointer', borderRadius: 'var(--radius-md)',
                      overflow: 'hidden',
                      outline: isSelected ? `2px solid ${tagColor}` : '2px solid transparent',
                      outlineOffset: 2,
                      transition: 'outline .15s, transform .15s',
                      transform: isSelected ? 'scale(1.04)' : 'scale(1)',
                    }}
                  >
                    <img
                      src={img.url}
                      alt={img.name}
                      style={{
                        width: '100%', height: 80, objectFit: 'cover', display: 'block',
                        filter: isSelected ? 'brightness(1)' : 'brightness(0.72)',
                        transition: 'filter .15s',
                      }}
                      onMouseEnter={e => { if (!isSelected) e.currentTarget.style.filter = 'brightness(1)'; }}
                      onMouseLeave={e => { if (!isSelected) e.currentTarget.style.filter = 'brightness(0.72)'; }}
                    />
                    {isSelected && (
                      <span style={{
                        position: 'absolute', top: 4, right: 4,
                        background: tagColor, borderRadius: '50%',
                        width: 18, height: 18,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <CheckCircle2 size={11} color="#fff" strokeWidth={2.5} />
                      </span>
                    )}
                    <span style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: 'rgba(0,0,0,0.55)',
                      fontFamily: 'var(--font-mono)', fontSize: 9,
                      color: '#fff', padding: '3px 6px',
                      textAlign: 'center', letterSpacing: '.04em',
                    }}>{img.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}

      {selectedUrl && (
        <p style={{
          fontFamily: 'var(--font-mono)', fontSize: 11,
          color: 'var(--text-muted)', textAlign: 'center', paddingTop: 4,
        }}>
          Click <strong style={{ color: 'var(--accent)' }}>Run Analysis</strong> to analyse the selected image
        </p>
      )}
    </div>
  );
}

/* Main page */
export default function Detect() {
  const [inputTab,       setInputTab]       = useState('upload');  // 'upload' | 'quick'
  const [file,           setFile]           = useState(null);
  const [preview,        setPreview]        = useState(null);
  const [selectedSample, setSelectedSample] = useState(null);     // { url, name }
  const [availModels,    setAvailModels]    = useState(MODEL_LIST);
  const [selectedModels, setSelectedModels] = useState(MODEL_LIST.map(m => m.key));
  const [loading,        setLoading]        = useState(false);
  const [error,          setError]          = useState(null);
  const [predictions,    setPredictions]    = useState([]);

  const onFile = (f) => {
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setSelectedSample(null);
    setPredictions([]);
    setError(null);
  };

  const onSampleSelect = (img) => {
    if (selectedSample?.url === img.url) {
      setSelectedSample(null); setPreview(null); setFile(null);
    } else {
      setSelectedSample(img); setPreview(img.url);
      setFile(null); setPredictions([]); setError(null);
    }
  };

  const onClear = () => {
    setFile(null); setPreview(null);
    setSelectedSample(null);
    setPredictions([]); setError(null);
  };

  const toggleModel = (key) =>
    setSelectedModels(s => s.includes(key) ? s.filter(k => k !== key) : [...s, key]);

  /* Convert a remote URL → File for the API */
  const urlToFile = async (url, name) => {
    const res  = await fetch(url);
    const blob = await res.blob();
    return new File([blob], name + '.jpg', { type: blob.type || 'image/jpeg' });
  };

  const analyze = async () => {
    const hasInput = file || selectedSample;
    if (!hasInput || selectedModels.length === 0) return;
    setLoading(true); setError(null); setPredictions([]);
    try {
      let f = file;
      if (!f && selectedSample) f = await urlToFile(selectedSample.url, selectedSample.name);
      const b64 = await toBase64(f);
      const res = await predictImage(b64, selectedModels);
      setPredictions(res.predictions);
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const canAnalyze = (file || selectedSample) && !loading && selectedModels.length > 0;

  /* Tab pill style */
  const tabBase = {
    flex: 1, padding: '8px 0', border: 'none', cursor: 'pointer',
    fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.04em',
    borderRadius: 'var(--radius-sm)', transition: 'all .15s',
  };
  const tabActive   = { ...tabBase, background: 'var(--accent)', color: 'var(--accent-fg)', fontWeight: 600 };
  const tabInactive = { ...tabBase, background: 'transparent', color: 'var(--text-muted)' };

  return (
    <div>
      <SectionHeader
        label="Live Detection"
        title="Analyze Concrete Surface"
        subtitle="Upload your own image or pick a sample from Quick Analysis to get AI-powered crack probability scores."
      />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: 24, alignItems: 'stretch',
      }}>
        {/* Left column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>

          {/* Input card */}
          <Card style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            {/* Tab switcher */}
            <div style={{
              display: 'flex', gap: 4, marginBottom: 16,
              background: 'var(--bg-raised)',
              padding: 4, borderRadius: 'var(--radius-md)',
            }}>
              <button style={inputTab === 'upload' ? tabActive : tabInactive} onClick={() => setInputTab('upload')}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Upload size={12} /> Upload Image
                </span>
              </button>
              <button style={inputTab === 'quick' ? tabActive : tabInactive} onClick={() => setInputTab('quick')}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                  <Zap size={12} /> Quick Analysis
                </span>
              </button>
            </div>

            {/* Preview - shown in both tabs once an image is selected */}
            {preview && (
              <div style={{
                position: 'relative', borderRadius: 'var(--radius-md)',
                overflow: 'hidden', background: 'var(--bg-raised)', marginBottom: 16,
              }}>
                <img src={preview} alt="preview" style={{ width: '100%', maxHeight: 280, objectFit: 'contain', display: 'block' }} />
                <button
                  onClick={onClear}
                  style={{
                    position: 'absolute', top: 10, right: 10,
                    width: 30, height: 30, borderRadius: '50%',
                    background: 'rgba(13,15,18,.8)', border: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer',
                  }}
                >
                  <X size={14} color="var(--text-secondary)" />
                </button>
                {selectedSample && (
                  <span style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(0,0,0,0.6)', padding: '4px 10px',
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    color: 'var(--text-secondary)', textAlign: 'center', letterSpacing: '.04em',
                  }}>{selectedSample.name}</span>
                )}
              </div>
            )}

            {/* Tab body */}
            {inputTab === 'upload'
              ? (!preview && <DropZone onFile={onFile} />)
              : <QuickAnalysis onSelect={onSampleSelect} selectedUrl={selectedSample?.url} />
            }
          </Card>

          {/* Model selection */}
          <Card>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', fontFamily: 'var(--font-mono)' }}>
                Select Models
              </p>
              <Cpu size={13} color="var(--text-muted)" />
            </div>
            {availModels.length === 0 ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 0' }}>
                <Spinner size={14} />
                <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Loading models…</span>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {availModels.map(m => (
                  <ModelToggle
                    key={m.key} model={m}
                    selected={selectedModels.includes(m.key)}
                    onToggle={toggleModel}
                  />
                ))}
              </div>
            )}
          </Card>

          {/* Run button */}
          <Button
            onClick={analyze}
            disabled={!canAnalyze}
            loading={loading}
            size="lg"
            style={{ width: '100%', justifyContent: 'center' }}
          >
            {loading ? 'Analyzing…' : 'Run Analysis'}
          </Button>
        </div>

        {/* Right column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, height: '100%' }}>
          {error && (
            <div style={{
              display: 'flex', gap: 10, padding: '14px 16px',
              background: 'var(--danger-dim)', border: '1px solid var(--danger)33',
              borderRadius: 'var(--radius-md)',
            }}>
              <AlertCircle size={15} color="var(--danger)" style={{ flexShrink: 0, marginTop: 2 }} />
              <p style={{ fontSize: 13, color: 'var(--danger)' }}>{error}</p>
            </div>
          )}

          {predictions.length === 0 && !loading && (
            <EmptyState
              icon={Activity}
              title="Results will appear here"
              body="Upload an image or pick a sample from Quick Analysis, then run analysis to see predictions."
            />
          )}

          {loading && (
            <Card style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: 40 }}>
              <Spinner size={28} />
              <p style={{ fontSize: 13, color: 'var(--text-muted)' }}>
                Running inference on {selectedModels.length} model{selectedModels.length > 1 ? 's' : ''}…
              </p>
            </Card>
          )}

          {predictions.length > 0 && (
            <>
              <EnsembleVerdict predictions={predictions} />
              <Card>
                <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 14, fontFamily: 'var(--font-mono)' }}>
                  Per-Model Results
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {predictions.map(p => <PredCard key={p.model} pred={p} />)}
                </div>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
