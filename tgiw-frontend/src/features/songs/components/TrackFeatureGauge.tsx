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
      <div aria-hidden className="flex items-center justify-between pt-4 h-11">
        <p className="text-sm text-left capitalize text-tgiwPurplish text-opacity-70">
          {featureName}
        </p>

        <div className="relative flex items-center w-3/5 h-5 px-2 ml-10 rounded-md shrink-0 bg-tgiwBlue">
          <div className="absolute flex justify-center w-4 h-3 rounded-full bg-tgiwOrange percentage-gauge">
            <span className="text-xs text-center -translate-y-6 text-tgiwPurplish text-opacity-70">
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
