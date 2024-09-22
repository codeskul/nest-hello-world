import { Test, TestingModule } from '@nestjs/testing';
import { EpisodesController } from './episodes.controller';
import { EpisodesService } from './episodes.service';
import { ConfigModule } from '../config/config.module';

describe('EpisodesController', () => {
  let controller: EpisodesController;

  const mockFindOne = jest.fn();
  const mockEpisodesService = {
    findAll: async () => [{ id: 'id' }],
    findFeatured: async () => [{ id: 'id' }],
    // findOne: async () => ({ id: 'id' }),
    findOne: mockFindOne,
    create: async () => ({ id: 'id' }),
  };

  beforeEach(async () => {
    jest.resetAllMocks();
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule],
      controllers: [EpisodesController],
      providers: [{ provide: EpisodesService, useValue: mockEpisodesService }],
    }).compile();

    controller = module.get<EpisodesController>(EpisodesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find one', () => {
    describe('when episode is found', () => {
      const episodeId = 'id';
      const mockResul = { id: episodeId, name: 'episode1' };
      beforeEach(() => {
        mockFindOne.mockResolvedValue(mockResul);
      });

      it('should call the service with correct parameters', async () => {
        await controller.findOne(episodeId);
        expect(mockFindOne).toHaveBeenCalledWith(episodeId);
      });

      it('should return correct response', async () => {
        const result = await controller.findOne(episodeId);
        expect(result).toEqual(mockResul);
      });
    });

    describe('when episode is not found', () => {
      const episodeId = 'id2';
      beforeEach(() => {
        mockFindOne.mockResolvedValue(null);
      });
      it('should throw an error', async () => {
        await expect(controller.findOne(episodeId)).rejects.toThrow(
          'Episode not found',
        );
      });
    });
  });
});
