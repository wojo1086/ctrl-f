import { COLORS } from './utility';

export interface Mouse {
    name: string;
    image: string;
    brand: string;
    line: string;
    color: COLORS;
    wired: boolean;
    usbVersion?: number;
    usbTypeFrom?: string;
    usbTypeTo?: string;
    wireless: boolean;
    bluetoothVersion?: number;
    radioFrequency?: number;
    weight: number;
    lighting: boolean;
    keyswitch: string;
    auraSync?: boolean;
    height?: number;
    width?: number;
    length?: number;
}

export const MICE: Mouse[] = [
    {
        name: 'ROG Harpe Ace Extreme',
        image: 'assets/images/mice/rog_harpe_ace_extreme.png',
        brand: 'ASUS',
        line: 'ROG',
        color: COLORS.BLACK,
        wired: true,
        usbVersion: 2.1,
        usbTypeFrom: 'USB-C',
        usbTypeTo: 'USB-A',
        wireless: true,
        bluetoothVersion: 5.1,
        radioFrequency: 2.4,
        weight: 47,
        lighting: true,
        keyswitch: 'ROG 100M Optical Micro Switch',
        auraSync: true,
        height: 39.6,
        width: 63.7,
        length: 127.5
    }
];
