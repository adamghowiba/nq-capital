import { applyDecorators } from '@nestjs/common'
import { Transform } from 'class-transformer'

export const TransformLowercase = () => {
  return applyDecorators(Transform((params) => params?.value?.toLowerCase() || params?.value))
}
