import { PropsWithChildren } from 'react';

import { APIProvider } from '@vis.gl/react-google-maps';
import { googleMapsConfig } from '@/lib/maps/google-maps-config.web';
import {
  markGoogleMapsApiFailed,
  markGoogleMapsApiReady,
} from 'services/google-maps-api.web';

export function GoogleMapsProvider({ children }: PropsWithChildren) {
  if (!googleMapsConfig.apiKey) return children;

  return (
    <APIProvider
      apiKey={googleMapsConfig.apiKey}
      onLoad={markGoogleMapsApiReady}
      onError={markGoogleMapsApiFailed}
    >
      {children}
    </APIProvider>
  );
}
