import { Test, TestingModule } from '@nestjs/testing';
import { InvestorsResolver } from './investors.resolver';
import { InvestorsService } from './investors.service';

describe('InvestorsResolver', () => {
  let resolver: InvestorsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorsResolver, InvestorsService],
    }).compile();

    resolver = module.get<InvestorsResolver>(InvestorsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
