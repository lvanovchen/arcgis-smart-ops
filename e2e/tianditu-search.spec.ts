import { test, expect } from '@playwright/test'

test.describe('Tianditu Search', () => {
  test('2D 地址搜索返回正常结果', async ({ page }) => {
    await page.goto('/tianditu-2d')

    const input = page.locator('input[placeholder="搜索地址..."]')
    await expect(input).toBeVisible({ timeout: 20000 })

    const respPromise = page.waitForResponse(
      (r) => r.url().includes('/v2/search') && r.request().method() === 'GET',
      { timeout: 15000 }
    )

    await input.fill('北京大学')

    const resp = await respPromise
    expect(resp.status()).toBe(200)

    const body = await resp.json()
    expect(Array.isArray(body.pois)).toBe(true)
    expect(body.pois.length).toBeGreaterThan(0)
  })

  test('3D 地址搜索返回正常结果', async ({ page }) => {
    await page.goto('/tianditu-3d')

    const input = page.locator('input[placeholder="搜索地址..."]')
    await expect(input).toBeVisible({ timeout: 20000 })

    const respPromise = page.waitForResponse(
      (r) => r.url().includes('/v2/search') && r.request().method() === 'GET',
      { timeout: 15000 }
    )

    await input.fill('上海外滩')

    const resp = await respPromise
    expect(resp.status()).toBe(200)

    const body = await resp.json()
    expect(Array.isArray(body.pois)).toBe(true)
    expect(body.pois.length).toBeGreaterThan(0)
  })
})
