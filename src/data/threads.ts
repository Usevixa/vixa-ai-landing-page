// All thread copy is verbatim from §6.2 and §6.5 — do not edit.
import type { ChatMessage } from '../components/ChatThread';

export const heroThread: ChatMessage[] = [
  { id: 'h1', side: 'out', type: 'text', body: 'Send 50 USDT to Kenya', time: '9:41', tick: 'blue' },
  { id: 'h2', side: 'in', type: 'typing', time: '9:41' },
  { id: 'h3', side: 'in', type: 'text', body: '50 USDT ≈ 6,450 KES via M-Pesa.\nReply PIN to confirm.', time: '9:41' },
  { id: 'h4', side: 'out', type: 'text', body: '1234', time: '9:41', tick: 'blue' },
  { id: 'h5', side: 'in', type: 'typing', time: '9:41' },
  { id: 'h6', side: 'in', type: 'text', body: '✅ Done! Sent to +254****. Ref: VX-8291', time: '9:42' },
];

export const demoThread: ChatMessage[] = [
  { id: 'd1', side: 'out', type: 'voice', time: '2:17', tick: 'blue' },
  // { id: 'd2', side: 'in', type: 'text', body: 'Abeg send 20k naira give my brother for Accra', time: '2:17' },
  { id: 'd3', side: 'in', type: 'text', body: 'Got you. ₦20,000 → 385 GHS via MTN MoMo.\nReply PIN to confirm.', time: '2:17' },
  { id: 'd4', side: 'out', type: 'text', body: '••••', time: '2:18', tick: 'blue' },
  { id: 'd5', side: 'in', type: 'text', body: '✅ Sent. Ref: VX-4417', time: '2:18' },
];
