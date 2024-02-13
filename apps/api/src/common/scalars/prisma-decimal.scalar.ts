import { CustomScalar, Scalar } from '@nestjs/graphql';
import { Prisma } from '@prisma/client';
import { Decimal } from '@prisma/client/runtime/library';
import { GraphQLError, Kind, ValueNode } from 'graphql';

@Scalar('Decimal')
export class PrismaDecimalScalar implements CustomScalar<any, any> {
  description = 'Prisma Decimal Scalar';

  parseValue(input: any) {
    console.log('Parsing', input);
    if (typeof input === 'number') {
      return input;
    }

    throw new GraphQLError(
      `Decimal cannot represent non numeric value: ${input}`
    );
  }

  serialize(output: any) {
    return output;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  parseLiteral(ast: ValueNode) {
    if (ast.kind === Kind.INT || ast.kind === Kind.FLOAT) {
      return ast.value;
    }

    return null;
  }
}
