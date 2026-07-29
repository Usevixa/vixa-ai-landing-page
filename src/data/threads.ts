// Thread copy. The hero thread mirrors the real VIXA product flow exactly
// (client screenshot, Jun 2026); the demo thread is §6.5 verbatim.
import type { ChatMessage } from '../components/ChatThread';

// date chip shown at the top of the hero thread — matches the screenshot.
// Swap to 'Today' if you'd rather it never read as stale.
export const HERO_DATE = 'Jun 9, 2026';

export const heroThread: ChatMessage[] = [
  { id: 'h1', side: 'out', type: 'text', body: 'Buy $100 USDT', time: '10:45', tick: 'blue' },
  { id: 'h2', side: 'in', type: 'typing', time: '10:45' },
  {
    id: 'h3',
    side: 'in',
    type: 'text',
    body: '💱 Current Exchange Rate\n\nBuy Rate: ₦1,400.11\n\nSell Rate: ₦1,379.95\n\n🔐 Please enter your PIN to continue.',
    time: '10:45',
  },
  { id: 'h4', side: 'out', type: 'text', body: '0006', time: '10:46', tick: 'blue' },
  { id: 'h5', side: 'in', type: 'typing', time: '10:46' },
  {
    id: 'h6',
    side: 'in',
    type: 'text',
    body: '✅ Deposit Initiated\n\nAmount: ₦140,000\n\nBank: Indulge MFB\n\nAccount Name: VICTOR OLADIPO',
    time: '10:46',
  },
  {
    id: 'h7',
    side: 'in',
    type: 'text',
    body: '✅ Deposit Successful\n\nHi Victor,\n\n100 USDT has been credited to your VIXA wallet.\n\nBalance: 100 USDT',
    time: '10:47',
  },
];

// Short supporting threads — one per split section, each proving that
// section's specific claim.
export const whyThread: ChatMessage[] = [
  { id: 'w1', side: 'out', type: 'text', body: 'Send 50k to my mum in Lagos', time: '8:12', tick: 'blue' },
  { id: 'w2', side: 'in', type: 'typing', time: '8:12' },
  {
    id: 'w3',
    side: 'in',
    type: 'text',
    body: '₦50,000 to ADEOLA BALOGUN\nGTBank ····4471\n\n🔐 Reply PIN to confirm.',
    time: '8:12',
  },
  { id: 'w4', side: 'out', type: 'text', body: '····', time: '8:13', tick: 'blue' },
  { id: 'w5', side: 'in', type: 'text', body: '✅ Sent. She has the money.\n\nRef: VX-5512', time: '8:13' },
];

export const howThread: ChatMessage[] = [
  { id: 'k1', side: 'out', type: 'voice', time: '1:04', tick: 'blue' },
  { id: 'k2', side: 'in', type: 'typing', time: '1:04' },
  { id: 'k3', side: 'in', type: 'text', body: 'Got it — you said send $200 to Ghana.', time: '1:04' },
  {
    id: 'k4',
    side: 'in',
    type: 'text',
    body: '$200 ≈ 2,980 GHS via MTN MoMo\nRate locked for 90 seconds\n\n🔐 Reply PIN to confirm.',
    time: '1:05',
  },
  { id: 'k5', side: 'out', type: 'text', body: '····', time: '1:05', tick: 'blue' },
  { id: 'k6', side: 'in', type: 'text', body: '✅ Sent. Ref: VX-7734', time: '1:05' },
];

export const trustThread: ChatMessage[] = [
  { id: 't1', side: 'out', type: 'text', body: 'Send 500 USDT to 0x9f…2b1', time: '11:31', tick: 'blue' },
  { id: 't2', side: 'in', type: 'typing', time: '11:31' },
  {
    id: 't3',
    side: 'in',
    type: 'text',
    body: '⚠️ This wallet is new to your account.\n\nConfirm you recognise it, then reply PIN.',
    time: '11:31',
  },
  { id: 't4', side: 'out', type: 'text', body: 'Not me — cancel it', time: '11:32', tick: 'blue' },
  { id: 't5', side: 'in', type: 'text', body: '🔒 Cancelled. Nothing left your wallet.', time: '11:32' },
];

export const demoThread: ChatMessage[] = [
  { id: 'd1', side: 'out', type: 'voice', time: '2:17', tick: 'blue' },
  { id: 'd2', side: 'in', type: 'text', body: 'Abeg send 20k naira give my brother for Accra', time: '2:17' },
  { id: 'd3', side: 'in', type: 'text', body: 'Got you. ₦20,000 → 385 GHS via MTN MoMo.\nReply PIN to confirm.', time: '2:17' },
  { id: 'd4', side: 'out', type: 'text', body: '••••', time: '2:18', tick: 'blue' },
  { id: 'd5', side: 'in', type: 'text', body: '✅ Sent. Ref: VX-4417', time: '2:18' },
];
