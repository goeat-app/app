import {
  CreateProfilePayload,
  ProfileMapping,
} from 'use-cases/profile-mapping/profile-mapping.types';

import { api } from '@/lib/api/api';

export const profileMappingService = {
  async getProfile(): Promise<ProfileMapping> {
    const response = await api.get<ProfileMapping>('/profile-mapping');
    return response.data;
  },

  async createProfile(payload: CreateProfilePayload): Promise<void> {
    const response = await api.post('/profile-mapping', payload);
    return response.data;
  },
};
