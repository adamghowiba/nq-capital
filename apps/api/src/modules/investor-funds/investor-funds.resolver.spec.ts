import { Test, TestingModule } from '@nestjs/testing';
import { InvestorFundsResolver } from './investor-funds.resolver';
import { InvestorFundsService } from './investor-funds.service';

describe('InvestorFundsResolver', () => {
  let resolver: InvestorFundsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorFundsResolver, InvestorFundsService],
    }).compile();

    resolver = module.get<InvestorFundsResolver>(InvestorFundsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
