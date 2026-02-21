import React, { useEffect, useRef, useState } from 'react';
import { Bell, X } from 'lucide-react';
import { useSound } from '@/hooks/useSound';
import { verificationService } from '@/services/verification';

const POLL_INTERVAL_MS = 1000;

const VerificationNotificationListener = () => {
  const { playFeedback } = useSound();
  const [notificationBanner, setNotificationBanner] = useState(null);
  const lastPendingCountRef = useRef(null);
  const bannerTimerRef = useRef(null);

  useEffect(() => {
    const loadPendingCount = async () => {
      try {
        const submissions = await verificationService.getSubmissions();
        const pendingCount = submissions.filter((s) => s.status === 'Pending').length;

        if (lastPendingCountRef.current !== null && pendingCount > lastPendingCountRef.current) {
          const newCount = pendingCount - lastPendingCountRef.current;
          playFeedback('notify');
          setNotificationBanner({
            newCount,
            totalPending: pendingCount,
          });

          if (bannerTimerRef.current) {
            clearTimeout(bannerTimerRef.current);
          }
          bannerTimerRef.current = setTimeout(() => setNotificationBanner(null), 6000);
        }

        lastPendingCountRef.current = pendingCount;
      } catch (error) {
        console.error('Failed to check pending verification notifications:', error);
      }
    };

    loadPendingCount();
    const interval = setInterval(loadPendingCount, POLL_INTERVAL_MS);

    return () => {
      clearInterval(interval);
      if (bannerTimerRef.current) {
        clearTimeout(bannerTimerRef.current);
      }
    };
  }, [playFeedback]);

  if (!notificationBanner) return null;

  return (
    <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-sm z-[110] animate-in slide-in-from-top-3 duration-300">
      <div className="flex items-start gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 shadow-xl">
        <div className="mt-0.5 p-2 rounded-xl bg-emerald-600 text-white">
          <Bell size={16} />
        </div>
        <div className="flex-1">
          <p className="text-xs font-black uppercase tracking-wider text-emerald-700">
            New Verification Request
          </p>
          <p className="text-xs text-emerald-900 font-semibold mt-1">
            {notificationBanner.newCount} new pending {notificationBanner.newCount > 1 ? 'requests' : 'request'}.
          </p>
          <p className="text-[11px] text-emerald-800 mt-1">
            Total pending: {notificationBanner.totalPending}
          </p>
        </div>
        <button
          onClick={() => setNotificationBanner(null)}
          className="p-1 text-emerald-700 hover:bg-emerald-100 rounded-lg transition-colors"
          aria-label="Dismiss notification"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

export default VerificationNotificationListener;
