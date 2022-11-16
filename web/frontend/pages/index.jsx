import {
  Card,
  Page,
  Layout,
  EmptyState,
} from "@shopify/polaris";
import { useNavigate, TitleBar } from "@shopify/app-bridge-react";


import { trophyImage } from "../assets";

import CustomLoader from "../components/CustomLoader";
import QRCodeIndex from "../components/QRCodeIndex";
import { useAppQuery } from "../hooks";


export default function HomePage() {

  const navigate = useNavigate()
  /* useAppQuery wraps react-query and the App Bridge authenticatedFetch function */
  const {
    data: QRCodes,
    isLoading,

    /*
      react-query provides stale-while-revalidate caching.
      By passing isRefetching to Index Tables we can show stale data and a loading state.
      Once the query refetches, IndexTable updates and the loading state is removed.
      This ensures a performant UX.
    */
    isRefetching,
  } = useAppQuery({
    url: "/api/qrcodes",
  });

  return (
    <Page narrowWidth>
      <TitleBar title="QRCodes" primaryAction={
        {
          content: 'Create QR code',
          onAction: () => navigate('/qrcodes/new')
        }
      } />
      <Layout>
        <Layout.Section>
          {isLoading && <CustomLoader />}
          {(!isLoading && !QRCodes.length) &&
            <Card sectioned>
              <EmptyState
                heading="Create unique QR codes for your products"
                action={{
                  content: 'Create QR code',
                  onAction: () => navigate('/qrcodes/new')
                }}
                image={trophyImage}
              >
                <p>
                  Allow customers to scan codes and buy products using their phones.
                </p>
              </EmptyState >
            </Card>
          }
          {QRCodes?.length && <QRCodeIndex QRCodes={QRCodes} loading={isRefetching} />}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
