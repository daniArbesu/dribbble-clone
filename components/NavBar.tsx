import Link from 'next/link';
import Image from 'next/image';
import { NavLinks } from '@/constants';
import AuthProviders from './AuthProviders';
import { getCurrentUser } from '@/lib/session';

const NavBar = async () => {
  const session = await getCurrentUser();

  return (
    <nav className="flexBetween navbar">
      <div className="flex-1 flexStart gap-10">
        <Link href="/">
          <Image src="logo.svg" alt="Flexibble logo" width={115} height={43} />
        </Link>
        <ul className="xl:flex hidden text-small gap-7">
          {NavLinks.map(({ href, text }, index) => (
            <Link href={href} key={index}>
              {text}
            </Link>
          ))}
        </ul>
      </div>
      <div className="flexCenter gap-4">
        {session?.user ? (
          <>
            {session.user.image != null && (
              <Image
                src={session.user.image}
                width={40}
                height={40}
                alt=""
                className="rounded-full"
              />
            )}
            <Link href="/create-project">Share Work</Link>
          </>
        ) : (
          <AuthProviders />
        )}
      </div>
    </nav>
  );
};

export default NavBar;
