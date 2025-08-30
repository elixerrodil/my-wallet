export const Footer: React.FC = () => {
  return (
    <footer className='border-t bg-background px-6 py-4 text-sm text-muted-foreground flex items-center justify-between'>
      <p>© {new Date().getFullYear()} My Dashboard. All rights reserved.</p>

      <div className='flex space-x-4'>
        <a
          href='#'
          className='hover:text-primary transition-colors'
        >
          Privacy
        </a>
        <a
          href='#'
          className='hover:text-primary transition-colors'
        >
          Terms
        </a>
        <a
          href='#'
          className='hover:text-primary transition-colors'
        >
          Support
        </a>
      </div>
    </footer>
  );
};
