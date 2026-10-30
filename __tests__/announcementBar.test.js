import { getActiveAnnouncements, formatAnnouncementText, getAnnouncementStyle, shouldShowAnnouncement } from '../utils/announcementBar';

describe('Announcement Bar - ASTECH Feature 29', () => {
  const announcements = [
    { id: '1', text: 'Sale!', active: true, type: 'info' },
    { id: '2', text: 'Warning', active: true, type: 'warning', endDate: new Date(Date.now() - 1000) },
    { id: '3', text: 'Inactive', active: false, type: 'info' },
  ];

  test('getActiveAnnouncements filters active', () => {
    const active = getActiveAnnouncements(announcements);
    expect(active).toHaveLength(1);
    expect(active[0].id).toBe('1');
  });

  test('formatAnnouncementText formats', () => {
    expect(formatAnnouncementText(announcements[0])).toBe('Sale!');
  });

  test('getAnnouncementStyle returns style', () => {
    const style = getAnnouncementStyle('warning');
    expect(style.bgColor).toBe('#f59e0b');
  });

  test('shouldShowAnnouncement checks dismissed', () => {
    expect(shouldShowAnnouncement(announcements[0], [])).toBe(true);
    expect(shouldShowAnnouncement(announcements[0], ['1'])).toBe(false);
  });
});