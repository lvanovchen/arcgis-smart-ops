import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should display the home page', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('首页')
  })

  test('should have navigation menu', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.el-menu-item')).toHaveCount(3)
  })

  test('should display counter component', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('.font-mono')).toContainText('0')
  })
})
