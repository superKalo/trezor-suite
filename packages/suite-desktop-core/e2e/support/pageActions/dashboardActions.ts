import { Page, expect as playwrightExpect } from '@playwright/test';

import { NetworkSymbol } from '@suite-common/wallet-config';

import { waitForDataTestSelector } from '../common';

class DashboardActions {
    async passThroughInitialRun(window: Page) {
        await waitForDataTestSelector(window, '@welcome/title');
        await window.getByTestId('@analytics/continue-button').click();
        await window.getByTestId('@onboarding/exit-app-button').click();

        await window.getByTestId('@onbarding/viewOnly/skip').click();
        await window.getByTestId('@viewOnlyTooltip/gotIt').click();
    }

    async discoveryShouldFinish(window: Page) {
        const discoveryBarSelector = '@wallet/discovery-progress-bar';
        await waitForDataTestSelector(window, discoveryBarSelector, {
            state: 'attached',
            timeout: 10_000,
        });
        await waitForDataTestSelector(window, discoveryBarSelector, {
            state: 'detached',
            timeout: 120_000,
        });
        await waitForDataTestSelector(window, '@dashboard/graph', { timeout: 30000 });
    }

    async openDeviceSwitcherAndReturnWindow(window: Page) {
        await window.getByTestId('@menu/switch-device').click();
        const deviceSwitcherModal = window.getByTestId('@modal');
        await deviceSwitcherModal.waitFor({ state: 'visible' });

        return deviceSwitcherModal;
    }

    async ejectWallet(window: Page, walletName: string) {
        const wallet = await window.locator('[data-test="@switch-device/wallet-on-index/0"]', {
            hasText: walletName,
        });
        await window.locator('[data-test="@switch-device/wallet-on-index/0/eject-button"]').click();
        await window.locator('[data-test="@switch-device/eject"]').click();
        await wallet.waitFor({ state: 'detached' });
    }

    async addStandardWallet(window: Page) {
        const addStandardWallet = window.getByTestId('@switch-device/add-wallet-button');
        await addStandardWallet.click();
        await window.getByTestId('@modal').waitFor({ state: 'detached' });
        await this.discoveryShouldFinish(window);
    }

    // asserts
    async assertHasVisibleBalanceOnFirstAccount(window: Page, network: NetworkSymbol) {
        const locator = window.getByTestId(`@wallet/coin-balance/value-${network}`).first();

        await playwrightExpect(locator).toBeVisible();
    }
}

export const onDashboardPage = new DashboardActions();
