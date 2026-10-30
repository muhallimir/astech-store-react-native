// ASTECH Feature 29: Announcement Bar utilities

export function getActiveAnnouncements(announcements) {
  if (!Array.isArray(announcements)) return [];
  const now = Date.now();
  return announcements.filter(a => {
    if (!a.active) return false;
    if (a.startDate && now < new Date(a.startDate).getTime()) return false;
    if (a.endDate && now > new Date(a.endDate).getTime()) return false;
    return true;
  });
}

export function formatAnnouncementText(announcement) {
  if (!announcement) return '';
  return announcement.text || '';
}

export function getAnnouncementStyle(type) {
  const styles = {
    info: { bgColor: '#1e3a8a', textColor: '#ffffff' },
    warning: { bgColor: '#f59e0b', textColor: '#000000' },
    success: { bgColor: '#16a34a', textColor: '#ffffff' },
    error: { bgColor: '#dc2626', textColor: '#ffffff' },
  };
  return styles[type] || styles.info;
}

export function shouldShowAnnouncement(announcement, dismissed = []) {
  if (!announcement) return false;
  return !dismissed.includes(announcement.id);
}