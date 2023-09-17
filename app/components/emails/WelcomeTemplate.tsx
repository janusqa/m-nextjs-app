import React from 'react';
import {
    Html,
    Body,
    Container,
    Text,
    Link,
    Preview,
    Tailwind,
} from '@react-email/components';

interface EmailTemplateProps {
    name: string;
}

const WelcomeTemplate = ({ name }: EmailTemplateProps) => {
    return (
        <Html>
            <Preview>Welcome abord!</Preview>
            <Tailwind>
                <Body className="bg-white">
                    <Container>
                        <Text className="font-bold text-3xl">Hello {name}</Text>
                        <Link href="http://localhost:3000">localhost:3000</Link>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
};

export default WelcomeTemplate;
