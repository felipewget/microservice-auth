import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AnalyticsEntity } from './analytics.entity';
import { AnalyticsService } from './analytics.service';


describe('AnalyticsService', () => {
  let analytics: AnalyticsService;
  let analyticsRepository: Repository<AnalyticsEntity>

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnalyticsService,
        {
          provide: getRepositoryToken(AnalyticsEntity),
          useValue: {}
        }
      ],
    }).compile();

    analytics = module.get<AnalyticsService>(AnalyticsService);
    analyticsRepository = module.get<Repository<AnalyticsEntity>>(getRepositoryToken(AnalyticsEntity));
  });

  it('should be defined', () => {
    expect(analytics).toBeDefined();
    expect(analyticsRepository).toBeDefined();
  });

  describe('Insert analytics data', () => {
    it('Should register record on analytics table', async () => {

      // Arrange
      // Act
      const result = await analytics.setDailyReport();

      // Assert
      expect(result).toBeDefined();

    })
  })

});
