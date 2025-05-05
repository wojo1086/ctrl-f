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
      }
    }
  }
});
