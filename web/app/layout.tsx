import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { Lato } from 'next/font/google';

export const metadata = {
  title: 'befundr',
  description: 'Your secured crowdfunding platform',
};

const lato = Lato({
  weight: ['100', '300', '400', '700', '900'],
  subsets: ['latin'],
});

const topBarLinks: { label: string; path: string }[] = [
  { label: 'Why beFundr ?', path: '/why' },
  { label: 'Help', path: '/help' },
];

const bottomBarLinks: { label: string; path: string }[] = [
  { label: 'Projects', path: '/projects' },
  { label: 'Rewards marketplace', path: '/marketplace' },
];

const profileBarLinks: { label: string; path: string }[] = [
  { label: 'My profile', path: '/profile/myprofile' },
  { label: 'My funded projects', path: '/profile/myfundedprojects' },
  { label: 'My contributions', path: '/profile/mycontributions' },
  { label: 'My created projects', path: '/profile/mycreatedprojects' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <head>
        <link rel="icon" href="/logo_32x32.png" sizes="32x32"></link>
        <link rel="icon" href="/logo_192x192.png" sizes="192x192"></link>
      </head>
      <body className={`${lato.className} bg-main`}>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout
                topBarLinks={topBarLinks}
                bottomBarLinks={bottomBarLinks}
                profileBarLinks={profileBarLinks}
              >
                {children}
              </UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
