import './global.css';
import { UiLayout } from '@/components/ui/ui-layout';
import { ClusterProvider } from '@/components/cluster/cluster-data-access';
import { SolanaProvider } from '@/components/solana/solana-provider';
import { ReactQueryProvider } from './react-query-provider';
import { Lato } from "next/font/google";

export const metadata = {
  title: 'befundr',
  description: 'Your secured crowdfunding platform',
};

const lato = Lato({
  weight: ['100','300', '400', '700', '900'],
  subsets: ["latin"]
})

const topBarLinks: { label: string; path: string }[] = [
  { label: 'Why beFundr ?', path: '/about' },
  { label: 'Help', path: '/help' },
];

const bottomBarLinks: { label: string; path: string }[] = [
  { label: 'Projects', path: '/projects' },
  { label: 'Rewards marketplace', path: '/marketplace' },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="light">
      <body className={`${lato.className} bg-main`}>
        <ReactQueryProvider>
          <ClusterProvider>
            <SolanaProvider>
              <UiLayout topBarLinks={topBarLinks} bottomBarLinks={bottomBarLinks}>{children}</UiLayout>
            </SolanaProvider>
          </ClusterProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
