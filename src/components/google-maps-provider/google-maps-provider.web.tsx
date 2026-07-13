import { PropsWithChildren } from 'react';

import { APIProvider } from '@vis.gl/react-google-maps';
import {
  markGoogleMapsApiFailed,
  markGoogleMapsApiReady,
} from 'services/google-maps-api.web';

export function GoogleMapsProvider({ children }: PropsWithChildren) {
  const apiKey = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY?.trim();

  if (!apiKey) return children;

  return (
    <APIProvider
      apiKey={apiKey}
      onLoad={markGoogleMapsApiReady}
      onError={markGoogleMapsApiFailed}
    >
      {children}
    </APIProvider>
  );
}
