
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const DesignSystemPlayground = () => {
  // Color palette data based on Monto design tokens
  const colorTokens = [
    { name: 'primary-lighter', class: 'bg-primary-lighter', hex: '#EFEBFF' },
    { name: 'primary-light', class: 'bg-primary-light', hex: '#BEADFF' },
    { name: 'primary-main', class: 'bg-primary-main', hex: '#7B59FF' },
    { name: 'primary-dark', class: 'bg-primary-dark', hex: '#523BAA' },
    { name: 'primary-darker', class: 'bg-primary-darker', hex: '#291E55' },
    { name: 'secondary-lighter', class: 'bg-secondary-lighter', hex: '#E6E7EB' },
    { name: 'secondary-light', class: 'bg-secondary-light', hex: '#6F768B' },
    { name: 'secondary-main', class: 'bg-secondary-main', hex: '#1D153B' },
    { name: 'secondary-dark', class: 'bg-secondary-dark', hex: '#181231' },
    { name: 'secondary-darker', class: 'bg-secondary-darker', hex: '#0A0714' },
    { name: 'grey-0', class: 'bg-grey-0', hex: '#FFFFFF' },
    { name: 'grey-100', class: 'bg-grey-100', hex: '#707C87' },
    { name: 'grey-200', class: 'bg-grey-200', hex: '#F4F6F8' },
    { name: 'grey-300', class: 'bg-grey-300', hex: '#F1F1F3' },
    { name: 'grey-400', class: 'bg-grey-400', hex: '#E6E7EB' },
    { name: 'grey-500', class: 'bg-grey-500', hex: '#8C94A9' },
    { name: 'grey-600', class: 'bg-grey-600', hex: '#818799' },
    { name: 'grey-700', class: 'bg-grey-700', hex: '#586079' },
    { name: 'grey-800', class: 'bg-grey-800', hex: '#38415F' },
    { name: 'grey-900', class: 'bg-grey-900', hex: '#061237' },
    { name: 'info-main', class: 'bg-info-main', hex: '#375DFB' },
    { name: 'success-main', class: 'bg-success-main', hex: '#007737' },
    { name: 'warning-main', class: 'bg-warning-main', hex: '#F2AE40' },
    { name: 'error-main', class: 'bg-error-main', hex: '#DF1C41' },
    { name: 'background-default', class: 'bg-background-default', hex: '#F4F6F8' },
    { name: 'background-paper', class: 'bg-background-paper', hex: '#FFFFFF' },
  ];

  const spacingValues = [
    { name: 'p-1', class: 'p-1', value: '0.25rem' },
    { name: 'p-2', class: 'p-2', value: '0.5rem' },
    { name: 'p-4', class: 'p-4', value: '1rem' },
    { name: 'p-6', class: 'p-6', value: '1.5rem' },
    { name: 'p-8', class: 'p-8', value: '2rem' },
    { name: 'p-10', class: 'p-10', value: '2.5rem' },
    { name: 'p-12', class: 'p-12', value: '3rem' },
    { name: 'p-16', class: 'p-16', value: '4rem' },
    { name: 'p-20', class: 'p-20', value: '5rem' },
    { name: 'p-24', class: 'p-24', value: '6rem' },
  ];

  const borderRadiusValues = [
    { name: 'rounded-xs', class: 'rounded-xs', value: '0.125rem' },
    { name: 'rounded-sm', class: 'rounded-sm', value: '0.25rem' },
    { name: 'rounded', class: 'rounded', value: '0.375rem' },
    { name: 'rounded-lg', class: 'rounded-lg', value: '0.5rem' },
    { name: 'rounded-xl', class: 'rounded-xl', value: '0.75rem' },
    { name: 'rounded-2xl', class: 'rounded-2xl', value: '1rem' },
    { name: 'rounded-3xl', class: 'rounded-3xl', value: '1.5rem' },
    { name: 'rounded-full', class: 'rounded-full', value: '9999px' },
  ];

  const shadowValues = [
    { name: 'shadow-sm', class: 'shadow-sm' },
    { name: 'shadow', class: 'shadow' },
    { name: 'shadow-md', class: 'shadow-md' },
    { name: 'shadow-lg', class: 'shadow-lg' },
    { name: 'shadow-xl', class: 'shadow-xl' },
    { name: 'shadow-2xl', class: 'shadow-2xl' },
  ];

  return (
    <div className="min-h-screen bg-background-default p-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Header */}
        <div className="text-center">
          <h1 className="text-6xl font-sans font-bold text-secondary-main mb-4">
            Design System Playground
          </h1>
          <p className="text-lg text-grey-700 font-sans">
            Exploring Monto's Design Tokens
          </p>
        </div>

        {/* Color Palette */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-sans text-secondary-main">
              Color Palette
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {colorTokens.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className={`w-20 h-20 ${color.class} rounded-lg border border-grey-400 mx-auto mb-2 shadow-sm`}
                  />
                  <p className="text-small-text font-sans text-grey-800 font-medium">
                    {color.name}
                  </p>
                  <p className="text-overline font-mono text-grey-600">
                    {color.hex}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Typography */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-sans text-secondary-main">
              Typography
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h3 className="text-xl font-sans font-medium text-grey-800 mb-4">Headings</h3>
              <div className="space-y-3">
                <div className="text-6xl font-sans font-bold text-secondary-main">
                  Heading 6XL - Studio Feixen Sans
                </div>
                <div className="text-5xl font-sans font-bold text-secondary-main">
                  Heading 5XL - Studio Feixen Sans
                </div>
                <div className="text-4xl font-sans font-bold text-secondary-main">
                  Heading 4XL - Studio Feixen Sans
                </div>
                <div className="text-3xl font-sans font-bold text-secondary-main">
                  Heading 3XL - Studio Feixen Sans
                </div>
                <div className="text-2xl font-sans font-bold text-secondary-main">
                  Heading 2XL - Studio Feixen Sans
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-xl font-sans font-medium text-grey-800 mb-4">Body Text</h3>
              <div className="space-y-3">
                <p className="text-base font-sans text-grey-700">
                  Base text - This is the default body text using Studio Feixen Sans
                </p>
                <p className="text-small-text font-sans text-grey-700">
                  Small text - Smaller body text for secondary information
                </p>
                <p className="text-overline font-sans text-grey-600 uppercase tracking-wider">
                  Overline text - For labels and categories
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Spacing Scale */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-sans text-secondary-main">
              Spacing Scale
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              {spacingValues.map((spacing) => (
                <div key={spacing.name} className="text-center">
                  <div className="bg-grey-200 rounded-lg inline-block mb-2">
                    <div className={`bg-primary-main ${spacing.class} rounded-lg`}>
                      <div className="w-8 h-8"></div>
                    </div>
                  </div>
                  <p className="text-small-text font-sans text-grey-800 font-medium">
                    {spacing.name}
                  </p>
                  <p className="text-overline font-mono text-grey-600">
                    {spacing.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Border Radius */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-sans text-secondary-main">
              Border Radius
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {borderRadiusValues.map((radius) => (
                <div key={radius.name} className="text-center">
                  <div className={`w-20 h-20 bg-primary-light ${radius.class} mx-auto mb-2 shadow-sm`} />
                  <p className="text-small-text font-sans text-grey-800 font-medium">
                    {radius.name}
                  </p>
                  <p className="text-overline font-mono text-grey-600">
                    {radius.value}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shadows */}
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl font-sans text-secondary-main">
              Shadows
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {shadowValues.map((shadow) => (
                <div key={shadow.name} className="text-center">
                  <div className={`w-20 h-20 bg-background-paper rounded-lg ${shadow.class} mx-auto mb-2`} />
                  <p className="text-small-text font-sans text-grey-800 font-medium">
                    {shadow.name}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DesignSystemPlayground;
