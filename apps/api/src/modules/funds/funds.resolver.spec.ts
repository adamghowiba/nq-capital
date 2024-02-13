import { Test, TestingModule } from '@nestjs/testing';
import { FundsResolver } from './funds.resolver';
import { FundsService } from './funds.service';

describe('FundsResolver', () => {
  let resolver: FundsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FundsResolver, FundsService],
    }).compile();

    resolver = module.get<FundsResolver>(FundsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
