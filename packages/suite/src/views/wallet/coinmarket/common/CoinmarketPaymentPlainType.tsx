import { ReactNode } from 'react';
import styled from 'styled-components';
import { typography } from '@trezor/theme';
import { BuyCryptoPaymentMethod, SellCryptoPaymentMethod } from 'invity-api';
import { Translation } from 'src/components/suite';

const Text = styled.div`
    display: flex;
    align-items: center;
    ${typography.body};
    color: ${({ theme }) => theme.textDefault};
`;

interface CoinmarketPaymentTypeProps {
    children?: ReactNode;
    method?: BuyCryptoPaymentMethod | SellCryptoPaymentMethod;
    methodName?: string;
}
type TranslatedPaymentMethod = 'bankTransfer' | 'creditCard';

type PaymentMethodId = `TR_PAYMENT_METHOD_${Uppercase<TranslatedPaymentMethod>}`;

const getPaymentMethod = (method: TranslatedPaymentMethod): PaymentMethodId =>
    `TR_PAYMENT_METHOD_${method.toUpperCase() as Uppercase<TranslatedPaymentMethod>}`;

export const CoinmarketPaymentPlainType = ({
    children,
    method,
    methodName,
}: CoinmarketPaymentTypeProps) => (
    <div>
        <Text>
            {method ? (
                <>
                    {method === 'bankTransfer' || method === 'creditCard' ? (
                        <Translation id={getPaymentMethod(method)} />
                    ) : (
                        <Text>{methodName || method}</Text>
                    )}
                </>
            ) : (
                <Text>
                    <Translation id="TR_PAYMENT_METHOD_UNKNOWN" />
                </Text>
            )}
        </Text>
        {children}
    </div>
);
