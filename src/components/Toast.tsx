type ToastProps = {
    message: string;
    type?: 'success' | 'error';
};

export function Toast({ message, type = 'success' }: ToastProps) {

    if (!message) return null; // Don't render anything if there's no message

    const toastStyle = {
        position: 'fixed' as const,
        bottom: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: type === 'success' ? '#10B981' : '#EF4444',
        color: 'white',
        padding: '12px 24px',
        borderRadius: '100px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.2)',
        zIndex: 1000,
        fontWeight: 'bold',
        transition: 'all 0.3s ease-in-out',
    }

  return (
    <div style={toastStyle}>
      {message}
    </div>
  )
}
