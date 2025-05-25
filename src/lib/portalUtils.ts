
const PORTAL_NAMES = [
  'Bill.com',
  'Tipalti',
  'Amazon',
  'Ariba',
  'Coupa',
  'Apple',
  'SAP'
];

export function getRandomPortalName(): string {
  return PORTAL_NAMES[Math.floor(Math.random() * PORTAL_NAMES.length)];
}
