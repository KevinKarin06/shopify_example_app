import { Card, SkeletonBodyText } from '@shopify/polaris'
import { Loading } from '@shopify/app-bridge-react'

export default function CustomLoader() {
    return (
        <Card sectioned>
            <Loading></Loading>
            <SkeletonBodyText></SkeletonBodyText>
        </Card>
    )
}