export type UserCoordinates = {
  latitude: number;
  longitude: number;
};

export type UserLocation = UserCoordinates & {
  label: string;
};
