'use client';

import { useState } from 'react';
import Toast from './Toast';

interface PDFDownloaderProps {
  filename: string;
  url: string;
  children: React.ReactNode;
  className?: string;
}

export default function PDFDownloader({ filename, url, children, className }: PDFDownloaderProps) {
  const [isDownloading, setIsDownloading] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'info',
    isVisible: false
  });

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      
      // Use API route for better reliability
      const response = await fetch('/api/download-resume');
      
      if (!response.ok) {
        throw new Error('Failed to download PDF');
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      // Create a temporary link element
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      
      // Append to body, click, and remove
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      // Clean up the blob URL
      window.URL.revokeObjectURL(downloadUrl);
      
      // Show success toast
      setToast({
        message: 'Resume downloaded successfully!',
        type: 'success',
        isVisible: true
      });
      
      // Reset downloading state after a short delay
      setTimeout(() => {
        setIsDownloading(false);
      }, 1000);
      
    } catch (error) {
      console.error('Error downloading PDF:', error);
      setIsDownloading(false);
      
      // Show error toast
      setToast({
        message: 'Failed to download resume. Trying alternative method...',
        type: 'error',
        isVisible: true
      });
      
      // Fallback to direct file download
      setTimeout(() => {
        const link = document.createElement('a');
        link.href = url;
        link.download = filename;
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        setToast({
          message: 'Resume download initiated!',
          type: 'info',
          isVisible: true
        });
      }, 1000);
    }
  };

  return (
    <>
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className={`${className} ${isDownloading ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isDownloading ? (
          <div className="flex items-center space-x-2">
            <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Downloading...</span>
          </div>
        ) : (
          children
        )}
      </button>
      
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast(prev => ({ ...prev, isVisible: false }))}
      />
    </>
  );
}
