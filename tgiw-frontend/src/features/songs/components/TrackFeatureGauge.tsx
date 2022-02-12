import * as React from 'react';

import { getGaugeColor } from '..';
import { VisuallyHidden } from '@/components/elements';

interface TrackFeatureGaugeProps {
  featureName: string;
  featureValue: number;
}

export const TrackFeatureGauge: React.FunctionComponent<
  TrackFeatureGaugeProps
> = ({ featureName, featureValue }) => {
  const roundedValue = Math.round(featureValue);

  return (
    <>
      <div aria-hidden className="flex h-11 items-center justify-between pt-4">
        <p className="text-left text-sm capitalize text-tgiwPurplish text-opacity-70">
          {featureName}
        </p>

        <div className="relative ml-10 flex h-5 w-3/5 shrink-0 items-center rounded-md bg-tgiwBlue px-2">
          <div className="percentage-gauge absolute flex h-3 w-4 justify-center rounded-full bg-tgiwOrange">
            <span className="-translate-y-6 text-center text-xs text-tgiwPurplish text-opacity-70">
              {roundedValue}%
            </span>
          </div>
        </div>
      </div>

      {/* <VisuallyHidden>
        {featureName} is {roundedValue}%
      </VisuallyHidden> */}

      <style jsx>{`
        .percentage-gauge {
          left: ${`${roundedValue}%`};
          background-color: ${getGaugeColor(roundedValue)};
        }
      `}</style>
    </>
  );
};
