'use client';

import { WalletButton } from '../solana/solana-provider';
import * as React from 'react';
import { ReactNode, Suspense, useEffect, useRef } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { AccountChecker } from '../account/account-ui';
import {
  ClusterChecker,
  ClusterUiSelect,
  ExplorerLink,
} from '../cluster/cluster-ui';
import toast, { Toaster } from 'react-hot-toast';
import MainButtonLabel from '../z-library/button/MainButtonLabel';
import Image from 'next/image';
import { useWallet } from '@solana/wallet-adapter-react';
import SecondaryButtonLabel from '../z-library/button/SecondaryButtonLabel';
import ClaimFaucetPopup from '../z-library/popup/ClaimFaucetPopup';
import AtaBalance from '../z-library/display_elements/AtaBalance';

export function UiLayout({
  children,
  topBarLinks,
  bottomBarLinks,
  profileBarLinks,
}: {
  children: ReactNode;
  topBarLinks: { label: string; path: string }[];
  bottomBarLinks: { label: string; path: string }[];
  profileBarLinks: { label: string; path: string }[];
}) {
  const pathname = usePathname();
  const { publicKey } = useWallet();

  const [isShowPopup, setIsShowPopup] = React.useState(false);

  return (
    <>
      {/* MOBILE */}
      <div className="h-full md:hidden flex  flex-col items-center justify-center p-4">
        <div className="relative w-full  h-28">
          <Image
            className="absolute object-contain"
            alt="Logo"
            src="/logo_befundr_light.png"
            quality={100}
            fill
          />
        </div>
        <p className="textStyle-subheadline text-center">
          beFUNDR is only available on desktop at the moment.
        </p>
        <p className="textStyle-subheadline text-center">
          To learn more on the project, visit our landing page
        </p>
        <a href="https://befundr.xyz/" className="my-10" target="_blank">
          <MainButtonLabel label="Visit our landing page" />
        </a>
      </div>
      {/* DESKTOP */}
      <div className="h-full flex flex-col ">
        {/* top navbar */}
        <div className="navbar h-20 bg-main text-textColor-main flex-col md:flex-row space-y-2 md:space-y-0">
          <div className="flex-1 pr-2">
            <Link className="btn btn-ghost normal-case text-xl" href="/">
              <Image
                className="h-4 md:h-10"
                alt="Logo"
                src="/logo_befundr_light.png"
                width={183}
                height={40}
                quality={100}
              />
            </Link>
            <ul className="menu menu-horizontal px-1 space-x-2">
              {topBarLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={pathname.startsWith(path) ? 'active' : ''}
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
            <div className="flex-grow mx-10">
              {/* <SearchField placeholder="Look for a project" /> */}
            </div>
            <Link href={'/launchproject'}>
              <MainButtonLabel label="Launch your project" />
            </Link>
          </div>
          {publicKey && (
            <button onClick={() => setIsShowPopup(true)}>
              <SecondaryButtonLabel label="Claim faucet" />
            </button>
          )}
          <div className="bg-main cursor-pointer flex-none mx-2">
            <AtaBalance />
          </div>
          <div className="flex-none mx-2">
            <WalletButton />
          </div>
          <div className="flex-none mx-2">
            <ClusterUiSelect />
          </div>
        </div>
        {/* bottom navbar outside profile*/}
        {!pathname.startsWith('/profile') && (
          <div className="w-full h-10 bg-second textStyle-body-black flex-col md:flex-row justify-center items-center">
            <ul className="menu flex justify-center items-center px-1 space-x-2 h-10 w-1/2 mx-auto">
              {bottomBarLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={
                      pathname.startsWith(path) ? 'text-accent font-normal' : ''
                    }
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              {publicKey && (
                <li key={'profile'}>
                  <Link
                    className={
                      pathname.startsWith('/profile')
                        ? 'text-accent font-normal'
                        : ''
                    }
                    href={'/profile/myprofile'}
                  >
                    Your profile
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
        {/* bottom navbar inside profile*/}
        {pathname.startsWith('/profile') && (
          <div className="w-full h-10 bg-second textStyle-body  flex-col md:flex-row justify-center items-center">
            <ul className="menu flex justify-center items-center px-1 space-x-2 h-10 w-2/3 mx-auto">
              {profileBarLinks.map(({ label, path }) => (
                <li key={path}>
                  <Link
                    className={
                      pathname.startsWith(path) ? 'text-accent font-normal' : ''
                    }
                    href={path}
                  >
                    {label}
                  </Link>
                </li>
              ))}
              <Link href={'/'}>
                <SecondaryButtonLabel label="Back" />
              </Link>
            </ul>
          </div>
        )}
        <ClusterChecker>
          <AccountChecker />
        </ClusterChecker>
        {/* set the global ui constrain here */}
        <div className="flex-grow mx-4 my-4 md:my-10 lg:mx-auto w-full px-4 md:px-60">
          <Suspense
            fallback={
              <div className="text-center my-32">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            }
          >
            {children}
          </Suspense>
          <Toaster position="bottom-right" />
        </div>
        <footer className="footer footer-center p-4 bg-main textStyle-body">
          <aside>
            <p className="flex items-center gap-4">
              &copy; 2024 beFUNDR. All rights reserved
              {/* github link */}
              <a
                className="link hover:text-white"
                href="https://github.com/JonathanDugard/befundr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="github"
                  src={'/github.png'}
                  width={30}
                  height={30}
                />
              </a>
              {/* X link */}
              <a
                className="link hover:text-white"
                href="https://x.com/befundr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  alt="github"
                  src={'/x.jpg'}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </a>
              {/* mail */}
              <a
                href="mailto:contact@befundr.xyz"
                className=" underline"
                target="_blank"
              >
                <Image
                  alt="mail"
                  src={'/mail.png'}
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </a>
            </p>
          </aside>
        </footer>
        {isShowPopup && (
          <ClaimFaucetPopup handleClose={() => setIsShowPopup(false)} />
        )}
      </div>
    </>
  );
}

export function AppModal({
  children,
  title,
  hide,
  show,
  submit,
  submitDisabled,
  submitLabel,
}: {
  children: ReactNode;
  title: string;
  hide: () => void;
  show: boolean;
  submit?: () => void;
  submitDisabled?: boolean;
  submitLabel?: string;
}) {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  useEffect(() => {
    if (!dialogRef.current) return;
    if (show) {
      dialogRef.current.showModal();
    } else {
      dialogRef.current.close();
    }
  }, [show, dialogRef]);

  return (
    <dialog className="modal" ref={dialogRef}>
      <div className="modal-box space-y-5">
        <h3 className="font-bold text-lg">{title}</h3>
        {children}
        <div className="modal-action">
          <div className="join space-x-2">
            {submit ? (
              <button
                className="btn btn-xs lg:btn-md btn-primary"
                onClick={submit}
                disabled={submitDisabled}
              >
                {submitLabel || 'Save'}
              </button>
            ) : null}
            <button onClick={hide} className="btn">
              Close
            </button>
          </div>
        </div>
      </div>
    </dialog>
  );
}

export function AppHero({
  children,
  title,
  subtitle,
}: {
  children?: ReactNode;
  title: ReactNode;
  subtitle: ReactNode;
}) {
  return (
    <div className="hero py-[64px]">
      <div className="hero-content text-center">
        <div className="max-w-2xl">
          {typeof title === 'string' ? (
            <h1 className="text-5xl font-bold">{title}</h1>
          ) : (
            title
          )}
          {typeof subtitle === 'string' ? (
            <p className="py-6">{subtitle}</p>
          ) : (
            subtitle
          )}
          {children}
        </div>
      </div>
    </div>
  );
}

export function ellipsify(str = '', len = 4) {
  if (str.length > 30) {
    return (
      str.substring(0, len) + '..' + str.substring(str.length - len, str.length)
    );
  }
  return str;
}

export function useTransactionToast() {
  return (signature: string, message: string) => {
    toast.success(
      <div className={'text-center'}>
        <div className="text-lg">{message}</div>
        <ExplorerLink
          path={`tx/${signature}`}
          label={'View Transaction'}
          className="btn btn-xs btn-primary"
        />
      </div>
    );
  };
}
