import { addOrderNote, removeOrderNote, formatOrderNotes, getOrderNotesSummary, validateNote } from '../utils/orderNotes';

describe('Order Notes - ASTECH Feature 18', () => {
  test('addOrderNote adds note', () => {
    const notes = addOrderNote([], 'Leave at door');
    expect(notes).toHaveLength(1);
    expect(notes[0].text).toBe('Leave at door');
  });

  test('addOrderNote rejects empty', () => {
    const notes = addOrderNote([], '  ');
    expect(notes).toHaveLength(0);
  });

  test('addOrderNote limits to 5', () => {
    let notes = [];
    for (let i = 0; i < 7; i++) {
      notes = addOrderNote(notes, `Note ${i}`);
    }
    expect(notes).toHaveLength(5);
  });

  test('removeOrderNote removes by id', () => {
    const notes = [{ id: '1', text: 'Note 1' }, { id: '2', text: 'Note 2' }];
    const result = removeOrderNote(notes, '1');
    expect(result).toHaveLength(1);
  });

  test('formatOrderNotes formats correctly', () => {
    const notes = [{ text: 'Leave at door' }, { text: 'Ring bell' }];
    expect(formatOrderNotes(notes)).toContain('Leave at door');
    expect(formatOrderNotes(notes)).toContain('Ring bell');
  });

  test('getOrderNotesSummary formats', () => {
    expect(getOrderNotesSummary([{ text: 'Note' }])).toBe('1 instruction(s)');
    expect(getOrderNotesSummary([])).toBe('No special instructions');
  });

  test('validateNote validates', () => {
    expect(validateNote('Good note').valid).toBe(true);
    expect(validateNote('').valid).toBe(false);
    expect(validateNote('A'.repeat(501)).valid).toBe(false);
  });
});