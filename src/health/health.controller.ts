import { Controller, Get } from '@nestjs/common';
import {
  DiskHealthIndicator,
  HealthCheck,
  HealthCheckService,
  MemoryHealthIndicator,
  MongooseHealthIndicator,
} from '@nestjs/terminus';
/**
 * To be aware whether our application is healthy.
 *
 * Expose endpoints that test our application and throw
 * errors if unhealthy.
 *
 * Tools such as Datadog, loggly or cypress can periodically
 * call these points to ensure everything works as expected
 * or send an email after a set number of retries and fails
 */
@Controller('health')
export class HealthController {
  /**
   * Create an instance of the HealthController
   * @param {HealthCheckService} healthCheckService
   * @param {MongooseHealthIndicator} mongooseHealthIndicator
   * @param {MemoryHealthIndicator} memoryHealthIndicator
   * @param {DiskHealthIndicator} diskHealthIndicator
   */
  constructor(
    private readonly healthCheckService: HealthCheckService,
    private readonly mongooseHealthIndicator: MongooseHealthIndicator,
    private readonly memoryHealthIndicator: MemoryHealthIndicator,
    private readonly diskHealthIndicator: DiskHealthIndicator,
  ) {}

  @Get()
  @HealthCheck()
  check() {
    return this.healthCheckService.check([
      () =>
        this.mongooseHealthIndicator.pingCheck('database', { timeout: 1500 }),
      // process should not use more than 300MB Heap memory
      () =>
        this.memoryHealthIndicator.checkHeap(
          'memory_heap',
          300 * Math.pow(1024, 2),
        ),
      // process should not use more than 300MB RSS memory
      () =>
        this.memoryHealthIndicator.checkRSS(
          'memory_rss',
          300 * Math.pow(1024, 2),
        ),
      // used disk storage should not exceed 50% of available space
      () =>
        this.diskHealthIndicator.checkStorage('disk_storage', {
          thresholdPercent: 0.5,
          path: '/',
        }),
    ]);
  }
}
