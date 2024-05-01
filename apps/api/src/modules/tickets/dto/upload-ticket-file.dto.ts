import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class UploadTicketFileDto {
  @IsNumber()
  @IsOptional()
  @Transform((params) => (params.value ? +params.value : params.value))
  message_id?: number;
}
