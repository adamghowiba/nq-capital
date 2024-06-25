import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useMeSettingsQuery } from '../../gql/gql-client';

export type InferGetInvestorSSP = InferGetServerSidePropsType<
  ReturnType<typeof getInvestorSSP>
>;

export const getInvestorSSP =
  () => async (context: GetServerSidePropsContext) => {
    const investorFetcher = useMeSettingsQuery.fetcher(
      {},
      // @ts-expect-error Ignored
      {
        Cookie: context.req.headers?.cookie,
      }
    );

    const investor = await investorFetcher();

    return {
      props: {
        investor: investor.meInvestor,
      },
    };
  };
