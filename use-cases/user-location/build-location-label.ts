import { LocationGeocodedAddress } from 'expo-location';

import {
  isBrazilianUf,
  LOCATION_LABELS,
  STATE_NAME_TO_UF,
} from './user-location.constants';

type ParsedAddress = {
  neighborhood: string | null;
  city: string | null;
  state: string | null;
};

function normalize(value: string | null | undefined): string | null {
  const trimmed = value?.trim();
  return trimmed || null;
}

function toStateCode(region: string | null | undefined): string | null {
  const normalized = normalize(region);
  if (!normalized) return null;
  if (normalized.length === 2) return normalized.toUpperCase();
  return STATE_NAME_TO_UF[normalized] ?? normalized;
}

function parseFormattedAddress(formattedAddress: string): ParsedAddress {
  const segments = formattedAddress
    .replace(/,\s*(Brasil|Brazil)\s*$/i, '')
    .split(',')
    .map(part => part.trim())
    .filter(Boolean);

  for (let index = segments.length - 1; index >= 0; index -= 1) {
    const match = segments[index].match(/^(.+?)\s*-\s*([A-Za-z]{2})$/);
    if (!match || !isBrazilianUf(match[2])) continue;

    const previous = segments[index - 1];
    const neighborhood = previous?.includes(' - ')
      ? normalize(previous.split(' - ').at(-1))
      : normalize(previous);

    return {
      city: normalize(match[1]),
      state: match[2].toUpperCase(),
      neighborhood:
        neighborhood && !/^\d{5}-?\d{3}$/.test(neighborhood)
          ? neighborhood
          : null,
    };
  }

  return { neighborhood: null, city: null, state: null };
}

export function buildLocationLabel(
  place: LocationGeocodedAddress | null | undefined,
): string {
  if (!place) return LOCATION_LABELS.nearby;

  const parsed = place.formattedAddress
    ? parseFormattedAddress(place.formattedAddress)
    : null;

  const neighborhood =
    normalize(place.district) ?? parsed?.neighborhood ?? null;
  const city =
    normalize(place.city) ?? normalize(place.subregion) ?? parsed?.city ?? null;
  const state = parsed?.state ?? toStateCode(place.region);

  if (neighborhood && city && state && neighborhood !== city) {
    return `${neighborhood} - ${city}, ${state}`;
  }

  if (city && state && city !== state) {
    return `${city}, ${state}`;
  }

  if (city) return city;

  return LOCATION_LABELS.nearby;
}
