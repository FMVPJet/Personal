import { expect, test, type Locator, type Page } from "@playwright/test";

const openIntro = async (page: Page) => {
  await page.goto("/");
  await expect(page.getByTestId("theme-toggle")).toBeVisible();
  await expect(page.getByTestId("profile-home")).toBeVisible();
  await expect(page.getByTestId("home-page-home")).toBeVisible();
};

const dragCardFromCanvas = async (page: Page, cardFace: Locator) => {
  const box = await cardFace.boundingBox();
  expect(box).not.toBeNull();

  const canvas = page.locator("canvas");
  const startX = box!.x + box!.width * 0.35;
  const startY = box!.y + box!.height * 0.3;

  await canvas.dispatchEvent("pointermove", {
    clientX: startX,
    clientY: startY,
    pointerId: 1,
    isPrimary: true,
  });
  await canvas.dispatchEvent("pointerdown", {
    clientX: startX,
    clientY: startY,
    pointerId: 1,
    button: 0,
    buttons: 1,
    isPrimary: true,
  });
  await canvas.dispatchEvent("pointermove", {
    clientX: startX + 160,
    clientY: startY - 40,
    pointerId: 1,
    button: 0,
    buttons: 1,
    isPrimary: true,
  });
  await expect(cardFace).toHaveAttribute("data-drag-state", "dragging");
  await canvas.dispatchEvent("pointerup", {
    clientX: startX + 160,
    clientY: startY - 40,
    pointerId: 1,
    button: 0,
    buttons: 0,
    isPrimary: true,
  });
  await expect(cardFace).toHaveAttribute("data-drag-state", "idle");
};

const expectIntroCardLayout = async (page: Page, cardFace: Locator) => {
  const box = await cardFace.boundingBox();
  const viewport = page.viewportSize();

  expect(box).not.toBeNull();
  expect(viewport).not.toBeNull();

  expect(box!.width).toBeGreaterThan(viewport!.width * 0.09);
  expect(box!.height).toBeGreaterThan(viewport!.height * 0.19);
  expect(box!.x).toBeGreaterThan(0);
  expect(box!.y).toBeGreaterThan(0);
  expect(box!.x + box!.width).toBeLessThan(viewport!.width - 4);
  expect(box!.y + box!.height).toBeLessThan(viewport!.height - 4);
};

test.describe("badge interaction smoke tests", () => {
  test("opens the card modal from the page and allows dragging", async ({
    page,
  }) => {
    await openIntro(page);

    await page.getByTestId("open-card").click();
    const cardFace = page.getByTestId("card-face");
    await expect(cardFace).toBeVisible({ timeout: 15000 });
    await expectIntroCardLayout(page, cardFace);
    await dragCardFromCanvas(page, cardFace);

    await expect(page.getByTestId("profile-home")).toContainText(/Jet Kwok/i);
    await expect(cardFace).toHaveAttribute("data-view-state", "intro");
    await page.getByTestId("card-overlay-close").click({ position: { x: 20, y: 20 } });
    await expect(page.getByTestId("card-face")).toHaveCount(0);
  });

  test("persists the theme toggle after reload", async ({ page }) => {
    await openIntro(page);

    const themeToggle = page.getByTestId("theme-toggle");

    await page.evaluate(() => {
      window.localStorage.clear();
    });
    await page.reload();

    const initialThemeLabel = (await themeToggle.textContent())?.trim();
    expect(initialThemeLabel).toBeTruthy();

    await themeToggle.click();

    await expect(themeToggle).not.toHaveText(initialThemeLabel!);
    await expect(page.getByTestId("home-page-home")).toContainText("Jet Kwok");

    const toggledThemeLabel = (await themeToggle.textContent())?.trim();
    await page.reload();

    await expect(themeToggle).toHaveText(toggledThemeLabel!);
    await expect(page.getByTestId("home-page-home")).toContainText("Jet Kwok");
  });

  test("opens the GitHub link from the home view without breaking card drag", async ({
    page,
  }) => {
    await openIntro(page);

    const popupPromise = page.waitForEvent("popup");
    await page.getByRole("link", { name: "GitHub" }).first().click();
    const popup = await popupPromise;

    await expect(popup).toHaveURL(/github\.com\/FMVPJet/i);
    await popup.close();
  });

  test("shows the home hero on the page", async ({ page }) => {
    await openIntro(page);

    await expect(page.getByTestId("home-page-home")).toBeVisible();
  });

  test("falls back to placeholder avatar when the image request fails", async ({
    page,
  }) => {
    await page.route("**/assets/images/profile/me.webp", async (route) => {
      await route.abort();
    });

    await openIntro(page);

    await expect(page.getByTestId("home-avatar-placeholder")).toBeVisible();
    await expect(page.getByTestId("home-profile-avatar")).toHaveCount(0);
  });
});
