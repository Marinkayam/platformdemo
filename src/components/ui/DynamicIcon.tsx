
import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div className="bg-gray-200 rounded-md animate-pulse" style={{ width: 24, height: 24 }}/>;

export type IconName = keyof typeof dynamicIconImports;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: IconName;
}

const DynamicIcon = ({ name, ...props }: IconProps) => {
  const LucideIcon = name && dynamicIconImports[name] 
    ? lazy(dynamicIconImports[name])
    : null;

  if (!LucideIcon) {
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
}

export default DynamicIcon;
