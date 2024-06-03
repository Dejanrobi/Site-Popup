import { starRatingBarSize } from "@wix/design-system";

export type ActivationMode = 'active' | 'timed' | 'disabled';

export type ActivationOptions = {
    activationMode: ActivationMode;
    startDate?: starRatingBarSize;
    endDate?: string;

}

export type SitePopupOptions = {
    headline: string;
    text: string;
    imageUrl: string;
    imageTitle: string;
} & ActivationOptions;