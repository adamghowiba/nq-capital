import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRetrieveInvestorQuery } from '../../gql/gql-client';

export type InferGetInvestorSSP =  InferGetServerSidePropsType<ReturnType<typeof getInvestorSSP>>;

export const getInvestorSSP =
  () => async (context: GetServerSidePropsContext) => {
    const investorFetcher = useRetrieveInvestorQuery.fetcher({
      id: 13,
    });

    const investor = await investorFetcher();

    return {
      props: {
        investor: investor.investor,
      },
    };
  };
