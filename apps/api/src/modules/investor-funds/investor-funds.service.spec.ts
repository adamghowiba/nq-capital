import { Test, TestingModule } from '@nestjs/testing';
import { InvestorFundsService } from './investor-funds.service';

describe('InvestorFundsService', () => {
  let service: InvestorFundsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [InvestorFundsService],
    }).compile();

    service = module.get<InvestorFundsService>(InvestorFundsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
