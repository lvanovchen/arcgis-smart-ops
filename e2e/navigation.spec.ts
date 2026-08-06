import { test, expect } from '@playwright/test'

test.describe('Navigation', () => {
  test('should navigate to map page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=地图')
    await expect(page).toHaveURL('/map')
    await expect(page.locator('h1')).toContainText('地图')
  })

  test('should navigate to about page', async ({ page }) => {
    await page.goto('/')
    await page.click('text=关于')
    await expect(page).toHaveURL('/about')
    await expect(page.locator('h1')).toContainText('关于')
  })

  test('should navigate back to home', async ({ page }) => {
    await page.goto('/about')
    await page.click('text=首页')
    await expect(page).toHaveURL('/')
    await expect(page.locator('h1')).toContainText('首页')
  })
})
