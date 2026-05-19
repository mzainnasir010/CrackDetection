import { useState } from 'react';
import {
  LineChart, Line, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip,
  Legend, ResponsiveContainer,
} from 'recharts';
import { Card, SectionHeader } from '../components/UI';
import { MODEL_META, MODEL_LIST, COLORS } from '../theme';

// Real training history extracted from notebooks
// Keys: epoch, {modelKey}_train_acc, {modelKey}_val_acc,
//       {modelKey}_train_loss, {modelKey}_val_loss
// EfficientNetB0: 25 epochs | ResNet50: 18 | MobileNetV2: 21 | DenseNet121: 25
const RAW = {
  EfficientNetB0: [
    [0.9643,0.0889,0.9977,0.0077],[0.9963,0.0117,0.9985,0.0044],[0.9963,0.0110,0.9988,0.0037],
    [0.9977,0.0088,0.9983,0.0050],[0.9968,0.0104,0.9986,0.0046],[0.9973,0.0092,0.9987,0.0036],
    [0.9974,0.0080,0.9988,0.0039],[0.9985,0.0057,0.9987,0.0035],[0.9972,0.0091,0.9988,0.0033],
    [0.9980,0.0068,0.9991,0.0035],[0.9850,0.0455,0.9986,0.0045],[0.9939,0.0204,0.9991,0.0037],
    [0.9962,0.0121,0.9989,0.0037],[0.9956,0.0158,0.9988,0.0035],[0.9969,0.0117,0.9991,0.0037],
    [0.9970,0.0085,0.9992,0.0035],[0.9976,0.0081,0.9991,0.0034],[0.9978,0.0072,0.9992,0.0034],
    [0.9976,0.0080,0.9992,0.0034],[0.9977,0.0074,0.9991,0.0032],[0.9974,0.0061,0.9991,0.0034],
    [0.9982,0.0067,0.9989,0.0034],[0.9971,0.0118,0.9991,0.0032],[0.9976,0.0067,0.9991,0.0032],
    [0.9982,0.0075,0.9992,0.0031],
  ],
  ResNet50: [
    [0.9623,0.0926,0.9971,0.0089],[0.9956,0.0134,0.9979,0.0066],[0.9968,0.0119,0.9985,0.0051],
    [0.9968,0.0090,0.9984,0.0052],[0.9970,0.0097,0.9983,0.0053],[0.9971,0.0103,0.9984,0.0054],
    [0.9977,0.0083,0.9983,0.0052],[0.9976,0.0077,0.9984,0.0051],[0.9928,0.0179,0.9984,0.0042],
    [0.9973,0.0096,0.9987,0.0032],[0.9981,0.0058,0.9985,0.0037],[0.9986,0.0046,0.9991,0.0030],
    [0.9984,0.0040,0.9993,0.0028],[0.9990,0.0037,0.9989,0.0030],[0.9993,0.0022,0.9994,0.0029],
    [0.9992,0.0028,0.9992,0.0030],[0.9991,0.0026,0.9993,0.0031],[0.9990,0.0022,0.9993,0.0030],
  ],
  MobileNetV2: [
    [0.8965,0.2471,0.9655,0.1098],[0.9711,0.0858,0.9700,0.0931],[0.9758,0.0739,0.9751,0.0761],
    [0.9750,0.0714,0.9732,0.0814],[0.9762,0.0708,0.9732,0.0819],[0.9772,0.0678,0.9756,0.0740],
    [0.9785,0.0657,0.9734,0.0803],[0.9780,0.0643,0.9768,0.0705],[0.9785,0.0633,0.9754,0.0761],
    [0.9762,0.0723,0.9782,0.0648],[0.9091,0.2616,0.9788,0.0600],[0.9751,0.0821,0.9819,0.0540],
    [0.9776,0.0734,0.9831,0.0534],[0.9826,0.0560,0.9848,0.0528],[0.9856,0.0488,0.9882,0.0433],
    [0.9858,0.0410,0.9900,0.0363],[0.9864,0.0444,0.9859,0.0476],[0.9885,0.0383,0.9841,0.0514],
    [0.9894,0.0347,0.9879,0.0415],[0.9903,0.0322,0.9866,0.0445],[0.9914,0.0292,0.9880,0.0422],
  ],
  DenseNet121: [
    [0.9004,0.2324,0.9757,0.0720],[0.9724,0.0836,0.9828,0.0469],[0.9760,0.0693,0.9875,0.0434],
    [0.9772,0.0659,0.9873,0.0358],[0.9806,0.0600,0.9911,0.0290],[0.9781,0.0624,0.9894,0.0315],
    [0.9791,0.0605,0.9897,0.0330],[0.9813,0.0551,0.9906,0.0287],[0.9786,0.0576,0.9895,0.0313],
    [0.9803,0.0557,0.9893,0.0302],[0.9674,0.0971,0.9872,0.0341],[0.9769,0.0728,0.9875,0.0320],
    [0.9806,0.0594,0.9898,0.0284],[0.9823,0.0535,0.9909,0.0254],[0.9855,0.0473,0.9918,0.0254],
    [0.9847,0.0479,0.9934,0.0209],[0.9872,0.0399,0.9936,0.0209],[0.9863,0.0426,0.9937,0.0196],
    [0.9887,0.0350,0.9942,0.0186],[0.9896,0.0317,0.9949,0.0170],[0.9901,0.0327,0.9956,0.0153],
    [0.9905,0.0317,0.9943,0.0173],[0.9916,0.0266,0.9940,0.0184],[0.9910,0.0268,0.9953,0.0158],
    [0.9917,0.0255,0.9954,0.0158],
  ],
};

// Build unified epoch chart data (max epochs across all models)
function buildChartData() {
  const maxEpochs = Math.max(...Object.values(RAW).map(r => r.length));
  return Array.from({ length: maxEpochs }, (_, i) => {
    const row = { epoch: i + 1 };
    for (const [key, epochs] of Object.entries(RAW)) {
      if (i < epochs.length) {
        const [ta, tl, va, vl] = epochs[i];
        row[`${key}_train_acc`]  = ta;
        row[`${key}_train_loss`] = tl;
        row[`${key}_val_acc`]    = va;
        row[`${key}_val_loss`]   = vl;
      }
    }
    return row;
  });
}

const CHART_DATA = buildChartData();

// Helpers
// Note: Recharts cannot resolve CSS variables - use raw rgba values here
const CHART_AXIS_STYLE  = { fontSize: 10, fontFamily: 'DM Mono, monospace', fill: '#9e9485' };
const GRID_STROKE_DARK  = 'rgba(255,255,255,0.07)';

/* Custom tooltip */
function CustomTooltip({ active, payload, label, isPercent = true }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: 'var(--bg-card)', border: '1px solid var(--border)',
      borderRadius: 10, padding: '10px 14px', fontSize: 12,
      backdropFilter: 'blur(12px)',
    }}>
      <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginBottom: 8 }}>
        Epoch {label}
      </p>
      {payload.map((e, i) => (
        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: e.color, flexShrink: 0 }} />
          <span style={{ color: 'var(--text-secondary)', minWidth: 110 }}>{e.name}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--text-primary)', marginLeft: 'auto' }}>
            {isPercent ? `${(e.value * 100).toFixed(2)}%` : e.value?.toFixed(4)}
          </span>
        </div>
      ))}
    </div>
  );
}

/* Chart wrapper */
function ChartCard({ title, children }) {
  return (
    <Card>
      <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
        {title}
      </p>
      {children}
    </Card>
  );
}

/* Tab button */
function Tab({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      style={{
        padding: '7px 16px', borderRadius: 8, border: 'none', cursor: 'pointer',
        fontFamily: 'var(--font-display)', fontSize: 13, fontWeight: 600,
        background: active ? 'var(--accent)' : 'transparent',
        color: active ? 'var(--accent-fg)' : 'var(--text-muted)',
        transition: 'all .15s',
      }}
    >
      {children}
    </button>
  );
}

// Main component
export default function Metrics() {
  const [activeTab, setActiveTab] = useState('val_acc');

  const tabLabel = {
    train_acc: 'Training Accuracy',
    val_acc:   'Validation Accuracy',
    train_loss: 'Training Loss',
    val_loss:   'Validation Loss',
  };

  const isPercent = activeTab === 'train_acc' || activeTab === 'val_acc';

  return (
    <div>
      <SectionHeader
        label="Model Metrics"
        title="Performance Dashboard"
        subtitle="Real training curves and final test metrics for all four architectures, extracted from Kaggle notebooks."
      />

      {/* Summary table */}
      <Card style={{ marginBottom: 24, padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border)' }}>
                {['Model', 'Architecture', 'Parameters', 'Test Accuracy', 'Best Val Acc', 'F1 Score'].map(h => (
                  <th key={h} style={{
                    padding: '14px 20px', textAlign: 'left',
                    fontFamily: 'var(--font-mono)', fontSize: 10,
                    textTransform: 'uppercase', letterSpacing: '.08em',
                    color: 'var(--text-muted)', fontWeight: 500,
                    whiteSpace: 'nowrap',
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {MODEL_LIST.map((model, i) => {
                const color = model.color || COLORS.accent;
                return (
                  <tr
                    key={model.key}
                    style={{ borderBottom: i < MODEL_LIST.length - 1 ? '1px solid var(--border)' : 'none', transition: 'background .1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-raised)'}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                  >
                    <td style={{ padding: '14px 20px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <span style={{ width: 8, height: 8, borderRadius: '50%', background: color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-primary)' }}>{model.name}</span>
                      </div>
                    </td>
                    <td style={{ padding: '14px 20px', fontSize: 12, color: 'var(--text-secondary)' }}>{model.architecture}</td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-primary)' }}>
                      {(model.parameters / 1e6).toFixed(1)}M
                    </td>
                    <td style={{ padding: '14px 20px' }}>
                      <span style={{
                        fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700,
                        color: model.testAcc >= 1.0 ? 'var(--success)' : 'var(--accent)',
                      }}>
                        {(model.testAcc * 100).toFixed(0)}%
                      </span>
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>
                      {(model.bestValAcc * 100).toFixed(2)}%
                    </td>
                    <td style={{ padding: '14px 20px', fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-primary)' }}>
                      {model.f1.toFixed(4)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Quick stat pills */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Best Test Accuracy', value: '100%',   sub: 'EfficientNetB0, ResNet50, DenseNet121' },
          { label: 'Best Val Accuracy',  value: '99.94%', sub: 'ResNet50 - peak val' },
          { label: 'Best F1 Score',      value: '1.0000', sub: '3 of 4 models achieved perfect F1' },
          { label: 'Fastest Model',      value: '3.4M',   sub: 'MobileNetV2 params - edge-ready' },
        ].map(s => (
          <div key={s.label} className="card" style={{ padding: '16px 18px' }}>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', marginBottom: 6 }}>{s.label}</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--accent)', lineHeight: 1 }}>{s.value}</p>
            <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 6 }}>{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Chart tabs */}
      <div style={{ display: 'flex', gap: 4, padding: '4px', background: 'var(--bg-raised)', borderRadius: 10, marginBottom: 20, width: 'fit-content', flexWrap: 'wrap' }}>
        {Object.keys(tabLabel).map(k => (
          <Tab key={k} active={activeTab === k} onClick={() => setActiveTab(k)}>{tabLabel[k]}</Tab>
        ))}
      </div>

      {/* Line chart */}
      <ChartCard title={tabLabel[activeTab]}>
        <ResponsiveContainer width="100%" height={360}>
          <LineChart data={CHART_DATA} margin={{ top: 5, right: 24, left: 8, bottom: 16 }}>
            <CartesianGrid stroke={GRID_STROKE_DARK} strokeDasharray="3 3" />
            <XAxis
              dataKey="epoch"
              tick={CHART_AXIS_STYLE}
              axisLine={false} tickLine={false}
              label={{ value: 'Epoch', position: 'insideBottom', offset: -8, style: CHART_AXIS_STYLE }}
            />
            <YAxis
              tick={CHART_AXIS_STYLE} axisLine={false} tickLine={false}
              width={52}
              domain={
                isPercent
                  ? [0.88, 1.001]
                  : [(dataMin) => Math.max(0, +(dataMin * 0.85).toFixed(3)), (dataMax) => +(dataMax * 1.1).toFixed(3)]
              }
              tickFormatter={v => isPercent ? `${(v * 100).toFixed(1)}%` : v.toFixed(3)}
            />
            <Tooltip content={<CustomTooltip isPercent={isPercent} />} />
            <Legend
              wrapperStyle={{ fontFamily: 'DM Mono, monospace', fontSize: 11, paddingTop: 16 }}
              formatter={(value) => <span style={{ color: '#d1c7b8' }}>{value}</span>}
            />
            {MODEL_LIST.map(model => {
              // Resolve model color CSS var at render time
              const resolvedColor = getComputedStyle(document.documentElement)
                .getPropertyValue(model.color.replace('var(', '').replace(')', '').trim())
                .trim() || '#c4a46c';
              return (
                <Line
                  key={model.key}
                  type="monotone"
                  dataKey={`${model.key}_${activeTab}`}
                  name={model.name}
                  stroke={resolvedColor}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                  activeDot={{ r: 5, strokeWidth: 0, fill: resolvedColor }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Per-model bar chart */}
      <Card style={{ marginTop: 24 }}>
        <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '.06em', marginBottom: 20, fontFamily: 'var(--font-mono)' }}>
          Final Test Accuracy vs F1 Score
        </p>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart
            data={MODEL_LIST.map(m => ({ name: m.name, 'Test Acc (%)': +(m.testAcc * 100).toFixed(1), 'F1 Score (%)': +(m.f1 * 100).toFixed(2) }))}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid stroke={GRID_STROKE_DARK} strokeDasharray="3 3" />
            <XAxis dataKey="name" tick={CHART_AXIS_STYLE} axisLine={false} tickLine={false} />
            <YAxis tick={CHART_AXIS_STYLE} axisLine={false} tickLine={false} domain={[96, 101]} tickFormatter={v => `${v}%`} width={40} />
            <Tooltip
              contentStyle={{ background: '#1a1d24', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 6, fontFamily: 'DM Mono, monospace', fontSize: 12 }}
              labelStyle={{ color: '#9e9485' }}
              itemStyle={{ color: '#fdfcf7' }}
              formatter={v => [`${v}%`]}
            />
            <Legend wrapperStyle={{ fontFamily: 'DM Mono, monospace', fontSize: 11 }} formatter={(value) => <span style={{ color: '#d1c7b8' }}>{value}</span>} />
            <Bar dataKey="Test Acc (%)"  fill="#c4a46c" radius={[3,3,0,0]} maxBarSize={40} />
            <Bar dataKey="F1 Score (%)" fill="#9a7b7b" radius={[3,3,0,0]} maxBarSize={40} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
    </div>
  );
}
