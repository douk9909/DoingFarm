import Navbar from '@/components/layout/navbar/Navbar';
import Sidebar from '@/components/layout/sidebar/Sidebar';

interface WithNavLayoutProps {
  children: React.ReactNode;
}

export default function WithNavLayout({ children }: WithNavLayoutProps) {
  return (
    <div style={{ display: 'flex' }}>
      <Sidebar />
      <div>
        <Navbar />
        <main>{children}</main>
      </div>
    </div>
  );
}
