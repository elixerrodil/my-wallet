export const Footer: React.FC = () => {
  return (
    <footer className='w-full bg-white shadow-inner mt-8'>
      <div className='container mx-auto p-4 text-center text-gray-600'>
        &copy; {new Date().getFullYear()} My Wallet. All rights reserved.
      </div>
    </footer>
  );
};
