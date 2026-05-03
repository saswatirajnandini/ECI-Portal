import { test, expect } from '@playwright/test';

test.describe('Verify Page Tests', () => {
  test('should verify the "Provide Your Details" label styling', async ({ page }) => {
    await page.goto('/verify');
    
    const darkLabel = page.locator('.dark-bg-label');
    await expect(darkLabel).toBeVisible();
    
    // Check for oval shape (border-radius)
    const borderRadius = await darkLabel.evaluate(el => window.getComputedStyle(el).borderRadius);
    expect(borderRadius).toBe('50px');
    
    // Check for dark background
    const bgColor = await darkLabel.evaluate(el => window.getComputedStyle(el).backgroundColor);
    // Navy blue #000080 is rgb(0, 0, 128)
    expect(bgColor).toBe('rgb(0, 0, 128)');
  });
});
