import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AnalyticsService } from './analytics.service';


describe('AnalyticsService', () => {
  let analytics: AnalyticsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AnalyticsService],
    }).compile();

    analytics = module.get<AnalyticsService>(AnalyticsService);
  });

  it('should be defined', () => {
    expect(analytics).toBeDefined();
  });
});
