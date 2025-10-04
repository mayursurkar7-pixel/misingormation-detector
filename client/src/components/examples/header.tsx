import { Header } from '../header';
import { ThemeProvider } from '@/lib/theme-provider';

export default function HeaderExample() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Header />
      </div>
    </ThemeProvider>
  );
}
