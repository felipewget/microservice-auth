import { Controller, Get } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {

    constructor(private readonly analyticsService: AnalyticsService) { }

    @Get('daily')
    async getDailyAnalytics() {
        return await this.analyticsService.listDailyReports()
    }

    @Get()
    async getMomentAnalytics() {
        return await this.analyticsService.getReport();
    }

}
