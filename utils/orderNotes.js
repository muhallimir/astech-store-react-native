// ASTECH Feature 18: Order Notes/Instructions utilities

export function addOrderNote(notes, note) {
  if (!note || note.trim().length === 0) return notes;
  if (notes.length >= 5) return notes;
  return [...notes, { id: `note-${Date.now()}`, text: note.trim(), createdAt: Date.now() }];
}

export function removeOrderNote(notes, noteId) {
  return notes.filter(n => n.id !== noteId);
}

export function formatOrderNotes(notes) {
  if (!Array.isArray(notes) || notes.length === 0) return '';
  return notes.map(n => `- ${n.text}`).join('\n');
}

export function getOrderNotesSummary(notes) {
  if (!Array.isArray(notes) || notes.length === 0) return 'No special instructions';
  return `${notes.length} instruction(s)`;
}

export function validateNote(note) {
  if (!note || note.trim().length === 0) return { valid: false, error: 'Note cannot be empty' };
  if (note.length > 500) return { valid: false, error: 'Note too long (max 500 chars)' };
  return { valid: true };
}