# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: _debug.spec.ts >> debug network
- Location: e2e\_debug.spec.ts:3:1

# Error details

```
ReferenceError: expect is not defined
```

# Page snapshot

```yaml
- generic [ref=e3]:
  - menubar [ref=e5]:
    - menuitem "首页" [ref=e6] [cursor=pointer]
    - menuitem "地图" [ref=e7] [cursor=pointer]
    - menuitem "天地图" [ref=e8]
    - menuitem "关于" [ref=e13] [cursor=pointer]
  - main [ref=e14]
```

# Test source

```ts
  1  | import { test } from '@playwright/test'
  2  | 
  3  | test('debug network', async ({ page }) => {
  4  |   const logs: string[] = []
  5  |   page.on('pageerror', (e) => logs.push('PAGEERROR: ' + e.message))
  6  |   page.on('console', (m) => { if (m.type() === 'error') logs.push('CONSOLE: ' + m.text()) })
  7  |   page.on('request', (r) => { if (r.url().includes('tianditu')) logs.push('REQ: ' + r.method() + ' ' + r.url().slice(0, 120)) })
  8  |   page.on('requestfailed', (r) => { if (r.url().includes('tianditu')) logs.push('REQFAIL: ' + r.failure()?.errorText + ' ' + r.url().slice(0, 120)) })
  9  |   page.on('response', (r) => { if (r.url().includes('/v2/search')) logs.push('RESP: ' + r.status() + ' ' + r.url().slice(0, 120)) })
  10 | 
  11 |   await page.goto('/tianditu-2d')
  12 |   const input = page.locator('input[placeholder="搜索地址..."]')
> 13 |   await expect(input).toBeVisible({ timeout: 20000 })
     |   ^ ReferenceError: expect is not defined
  14 |   await input.fill('北京大学')
  15 |   await page.waitForTimeout(3000)
  16 |   console.log('===LOGS===\n' + logs.join('\n'))
  17 | })
  18 | 
```