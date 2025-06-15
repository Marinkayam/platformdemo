
import React, { lazy, Suspense } from 'react';
import { LucideProps } from 'lucide-react';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const fallback = <div className="bg-gray-200 rounded-md animate-pulse" style={{ width: 24, height: 24 }}/>;

export type IconName = keyof typeof dynamicIconImports;

interface IconProps extends Omit<LucideProps, 'ref'> {
  name: string;
}

const DynamicIcon = ({ name, ...props }: IconProps) => {
  const LucideIcon = name && (dynamicIconImports as any)[name] 
    ? lazy((dynamicIconImports as any)[name])
    : null;

  if (!LucideIcon) {
    console.error(`Icon with name "${name}" not found.`);
    return fallback;
  }

  return (
    <Suspense fallback={fallback}>
      <LucideIcon {...props} />
    </Suspense>
  );
}

export default DynamicIcon;
