import { definePreset } from '@primeng/themes';
import Aura from '@primeng/themes/aura';

export const CustomPreset = definePreset(Aura, {
    semantic: {
        primary: {
            50: '{sky.50}',
            100: '{sky.100}',
            200: '{sky.200}',
            300: '{sky.300}',
            400: '{sky.400}',
            500: '{sky.500}',
            600: '{sky.600}',
            700: '{sky.700}',
            800: '{sky.800}',
            900: '{sky.900}',
            950: '{sky.950}'
        },
        colorScheme: {
            light: {
                surface: {
                    0: '#ffffff',
                    50: '{ocean.50}',
                    100: '{ocean.100}',
                    200: '{ocean.200}',
                    300: '{ocean.300}',
                    400: '{ocean.400}',
                    500: '{ocean.500}',
                    600: '{ocean.600}',
                    700: '{ocean.700}',
                    800: '{ocean.800}',
                    900: '{ocean.900}',
                    950: '{ocean.950}'
                }
            },
            dark: {
                surface: {
                    0: '#ffffff',
                    50: '#fbfcfc',
                    100: '#f7f9f8',
                    200: '#eff3f2',
                    300: '#dadedd',
                    400: '#b1b7b6',
                    500: '#828787',
                    600: '#5f7274',
                    700: '#415b61',
                    800: '#29444e',
                    900: '#183240',
                    950: '#0c1920'
                }
            }
        }
    }
});
