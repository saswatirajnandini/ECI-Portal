import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load the homepage and check titles', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Election Commission of India/);
    
    // Check for main heading
    const mainHeading = page.locator('h1.hero-title');
    await expect(mainHeading).toBeVisible();
    await expect(mainHeading).toHaveText('Empowering Democracy');
  });

  test('should display the logo correctly', async ({ page }) => {
    await page.goto('/');
    const logo = page.locator('.brand-logo img');
    await expect(logo).toBeVisible();
    await expect(logo).toHaveAttribute('src', '/logo.png');
  });

  test('should have quick stats section', async ({ page }) => {
    await page.goto('/');
    const statsGrid = page.locator('.stats-grid');
    await expect(statsGrid).toBeVisible();
    
    const stats = page.locator('.stat-card');
    await expect(stats).toHaveCount(4);
  });

  test('should have Latest Updates section with news images', async ({ page }) => {
    await page.goto('/');
    const mediaSection = page.locator('.media-section');
    await expect(mediaSection).toBeVisible();
    
    // Check for news images
    const newsImages = page.locator('.media-section img');
    await expect(newsImages).toHaveCount(3);
    
    const firstImg = newsImages.first();
    await expect(firstImg).toHaveAttribute('src', '/news-1.png');
  });
});
