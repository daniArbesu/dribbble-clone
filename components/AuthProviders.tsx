'use client';
import { getProviders, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

interface Provider {
  id: string;
  name: string;
  type: string;
  signinUrl: string;
  callbackUrl: string;
  signinUrlParams?: Record<string, string> | null;
}

type Providers = Record<string, Provider>;

const AuthProviders = () => {
  const [providers, setProviders] = useState<Providers | null>(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    void fetchProviders();
  }, []);

  if (providers != null) {
    return (
      <div>
        {Object.values(providers).map((provider: Provider, index) => (
          <button key={index} onClick={async () => await signIn(provider?.id)}>
            {provider.id}
          </button>
        ))}
      </div>
    );
  }
};

export default AuthProviders;
