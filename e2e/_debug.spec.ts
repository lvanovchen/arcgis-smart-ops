import { test } from '@playwright/test'

test('debug network', async ({ page }) => {
  const logs: string[] = []
  page.on('pageerror', (e) => logs.push('PAGEERROR: ' + e.message))
  page.on('console', (m) => { if (m.type() === 'error') logs.push('CONSOLE: ' + m.text()) })
  page.on('request', (r) => { if (r.url().includes('tianditu')) logs.push('REQ: ' + r.method() + ' ' + r.url().slice(0, 120)) })
  page.on('requestfailed', (r) => { if (r.url().includes('tianditu')) logs.push('REQFAIL: ' + r.failure()?.errorText + ' ' + r.url().slice(0, 120)) })
  page.on('response', (r) => { if (r.url().includes('/v2/search')) logs.push('RESP: ' + r.status() + ' ' + r.url().slice(0, 120)) })

  await page.goto('/tianditu-2d')
  const input = page.locator('input[placeholder="搜索地址..."]')
  await expect(input).toBeVisible({ timeout: 20000 })
  await input.fill('北京大学')
  await page.waitForTimeout(3000)
  console.log('===LOGS===\n' + logs.join('\n'))
})
