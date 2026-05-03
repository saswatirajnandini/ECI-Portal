import { test, expect } from '@playwright/test';

test.describe('Assistant Page Tests', () => {
  test('should verify assistant fallback responses', async ({ page }) => {
    await page.goto('/assistant');
    
    // Click on a suggested question
    const suggestedQuest = page.locator('text="How to register for voting?"');
    await suggestedQuest.click();
    
    // Wait for response bubble to appear
    const responseBubble = page.locator('.ai-bubble').last();
    await expect(responseBubble).toBeVisible({ timeout: 15000 });
    
    // Verify fallback text is present
    await expect(responseBubble).toContainText('To register for voting in India');
  });

  test('should verify EPIC information response', async ({ page }) => {
    await page.goto('/assistant');
    
    const suggestedQuest = page.locator('text="What is a voter ID (EPIC)?"');
    await suggestedQuest.click();
    
    const responseBubble = page.locator('.ai-bubble').last();
    await expect(responseBubble).toBeVisible({ timeout: 15000 });
    await expect(responseBubble).toContainText('A Voter ID, also known as an EPIC');
  });
});
