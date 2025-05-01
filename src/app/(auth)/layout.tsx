import { Card } from '@/components/ui/Card';
import React from 'react';

interface layoutProps {
  children: React.ReactNode;
}
const layout = ({ children }: layoutProps) => (
  <div className="flex h-full min-h-screen items-center justify-center px-2">
    <Card className="max-w-100 min-w-96">{children}</Card>
  </div>
);

export default layout;
