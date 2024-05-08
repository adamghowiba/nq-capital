import { Test } from '@nestjs/testing';
import { IamService } from './iam.service';

describe('IamService', () => {
  let service: IamService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [IamService],
    }).compile();

    service = module.get(IamService);
  });

  it('should be defined', () => {
    expect(service).toBeTruthy();
  });
});
