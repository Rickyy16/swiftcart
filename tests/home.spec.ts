import { test, expect } from '@playwright/test';

test('homepage loads', async ({ page }) => {

  await page.goto('http://localhost:5173');
  await expect(page.getByText('Our Products')).toBeVisible();

});

test('navigate to product detail', async ({ page }) => {

  await page.goto('http://localhost:5173');
  await page.getByTestId('view-product-btn').first().click();
  await expect(page).toHaveURL(/product/);

});

test('add item to cart', async ({ page }) => {

  await page.goto('http://localhost:5173');
  await page.getByTestId('view-product-btn').first().click();
  await page.getByRole('button', { name: /add to cart/i }).click();
  await expect(page.getByTestId('cart-count')).toHaveText('1');

});