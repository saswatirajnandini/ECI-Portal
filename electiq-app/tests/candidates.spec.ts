import { test, expect } from '@playwright/test';

test.describe('Candidates Page Tests', () => {
  test('should load candidates and search', async ({ page }) => {
    await page.goto('/candidates');
    
    // Wait for initial candidates to load (if any)
    const candidatesGrid = page.locator('.candidates-grid');
    await expect(candidatesGrid).toBeVisible();

    // Test search input
    const searchInput = page.locator('.search-input');
    await searchInput.fill('Rahul');
    
    // Verify results filter (if results found)
    // Note: Since data is dynamic, we just check if it doesn't crash
  });

  test('should verify "Load More" button styling', async ({ page }) => {
    await page.goto('/candidates');
    
    const loadMoreBtn = page.locator('.btn-load-more');
    if (await loadMoreBtn.isVisible()) {
      // Check for black text on light background
      const color = await loadMoreBtn.evaluate(el => window.getComputedStyle(el).color);
      const bgColor = await loadMoreBtn.evaluate(el => window.getComputedStyle(el).backgroundColor);
      
      // Black is rgb(0, 0, 0)
      expect(color).toBe('rgb(0, 0, 0)');
      // Light background #f1f5f9 is rgb(241, 245, 249)
      expect(bgColor).toBe('rgb(241, 245, 249)');
    }
  });
});
