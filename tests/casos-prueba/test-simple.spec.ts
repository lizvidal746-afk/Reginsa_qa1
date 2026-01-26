import { test, expect } from '@playwright/test';

test('Prueba simple', async ({ page }) => {
  console.log('Test ejecutándose');
  expect(true).toBe(true);
});
