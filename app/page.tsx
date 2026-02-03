'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import NameInput from '@/components/NameInput';
import ValentineProposal from '@/components/ValentineProposal';

export default function Home() {
  const searchParams = useSearchParams();
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const nameParam = searchParams.get('name');
    if (nameParam) {
      setUserName(nameParam);
    }
    setLoading(false);
  }, [searchParams]);

  if (loading) {
    return null;
  }

  if (!userName) {
    return <NameInput onNameSubmit={setUserName} />;
  }

  return <ValentineProposal userName={userName} />;
}
