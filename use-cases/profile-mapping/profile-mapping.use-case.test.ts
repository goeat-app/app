import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { AxiosError } from 'axios';
import { profileMappingService } from 'services/profile-mapping-service';

import { getProfileMapping } from './profile-mapping.use-case';

jest.mock('services/profile-mapping-service', () => ({
  profileMappingService: {
    getProfile: jest.fn(),
  },
}));

jest.mock('@/lib/auth/firebase-auth', () => ({
  authService: {
    getCurrentUser: jest.fn(),
  },
}));

const getProfileMock = jest.mocked(profileMappingService.getProfile);

describe('getProfileMapping', () => {
  beforeEach(() => {
    getProfileMock.mockReset();
  });

  it('returns the current profile mapping', async () => {
    const profileMapping = {
      id: 'mapping-id',
      userId: 'user-id',
      priceRange: { minValue: 20, maxValue: 100 },
      foodTypes: [{ id: 'food-id' }],
      placeTypes: [{ id: 'place-id' }],
      createdAt: new Date().toDateString(),
      updatedAt: new Date().toDateString(),
    };
    getProfileMock.mockResolvedValue(profileMapping);

    await expect(getProfileMapping()).resolves.toEqual({
      success: true,
      profileMapping,
    });
  });

  it('returns null when the profile mapping does not exist', async () => {
    getProfileMock.mockRejectedValue({
      isAxiosError: true,
      response: { status: 404 },
    });

    await expect(getProfileMapping()).resolves.toEqual({
      success: true,
      profileMapping: null,
    });
  });

  it('does not treat other request failures as a missing mapping', async () => {
    getProfileMock.mockRejectedValue(
      Object.assign(new AxiosError('Request failed'), {
        response: { status: 500 },
      }),
    );

    await expect(getProfileMapping()).resolves.toEqual({
      success: false,
      error: 'Erro ao carregar o mapeamento do perfil.',
    });
  });
});
