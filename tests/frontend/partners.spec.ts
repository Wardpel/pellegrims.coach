import { expect, test } from "@playwright/test";
import { locales } from "@/lib/i18n";
import { getTranslations } from "@/lib/translations";

const partners = [
  {
    name: "Orca",
    href: "https://www.orca.com/en-be",
  },
  {
    name: "Precision Fuel & Hydration",
    href: "https://www.precisionhydration.com/eu/en/",
  },
  {
    name: "Q36.5",
    href: "https://www.q36-5.com/en-be/",
  },
  {
    name: "cotersus",
    href: "https://www.cotersus.be/en",
  },
] as const;

for (const locale of locales) {
  test(`${locale}: renders homepage partners`, async ({ page }) => {
    await page.goto(`/${locale}/`);

    const section = page.locator("#partners");
    await expect(
      section.getByRole("heading", {
        level: 2,
        name: getTranslations(locale).partners.title,
      })
    ).toBeVisible();

    for (const partner of partners) {
      const link = section.getByRole("link", {
        name: new RegExp(partner.name, "i"),
      });

      await expect(link).toHaveAttribute("href", partner.href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute(
        "rel",
        "noopener noreferrer sponsored nofollow"
      );
      await expect(link.getByRole("img", { name: partner.name })).toBeVisible();
    }
  });
}

test("does not render partners on a non-homepage route", async ({ page }) => {
  await page.goto("/en/general-terms");
  await expect(page.locator("#partners")).toHaveCount(0);
});
