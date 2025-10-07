import type { Metadata } from 'next'
import { redirect, notFound } from 'next/navigation'
import { getTranslations } from '@/lib/translations'
import { isValidLocale, type Locale } from '@/lib/i18n'

const slugPerLocale = {
  en: 'general-terms',
  nl: 'algemene-voorwaarden'
} as const

const localeBySlug = Object.entries(slugPerLocale).reduce(
  (acc, [locale, slug]) => {
    acc[slug as keyof typeof acc] = locale as Locale
    return acc
  },
  {} as Record<string, Locale>
)

const supportedSlugs = new Set(Object.values(slugPerLocale))

type Params = Promise<{ locale: string; termsSlug: string }>

type Props = {
  params: Params
}

export async function generateStaticParams() {
  return Object.entries(slugPerLocale).map(([locale, termsSlug]) => ({ locale, termsSlug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeParam, termsSlug } = await params
  const locale = isValidLocale(localeParam) ? localeParam : 'en'

  const t = getTranslations(locale)
  const txt = t.generalTerms

  const siteUrl = 'https://www.pellegrims.coach'
  const pageSlug = slugPerLocale[locale]
  const pageUrl = `${siteUrl}/${locale}/${pageSlug}`
  const ogImageUrl = `${siteUrl}/images/banner_1920.jpg`

  const baseMetadata: Metadata = {
    title: txt.meta.title,
    description: txt.meta.description,
    keywords: t.meta.keywords,
    authors: [{ name: 'Ward Pellegrims' }],
    openGraph: {
      title: txt.meta.title,
      description: txt.meta.description,
      url: pageUrl,
      siteName: 'Ward Pellegrims Coaching',
      locale: locale === 'en' ? 'en_US' : 'nl_BE',
      type: 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1920,
          height: 1080,
          alt: locale === 'en'
            ? 'Ward Pellegrims Swimming & Triathlon Coach'
            : 'Ward Pellegrims Zwem- en Triathloncoach'
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: txt.meta.title,
      description: txt.meta.description,
      images: [ogImageUrl]
    },
    alternates: {
      canonical: pageUrl,
      languages: {
        'en-US': `${siteUrl}/en/${slugPerLocale.en}`,
        'nl-BE': `${siteUrl}/nl/${slugPerLocale.nl}`
      }
    }
  }

  if (!supportedSlugs.has(termsSlug as typeof slugPerLocale[Locale])) {
    return baseMetadata
  }

  const slugLocale = localeBySlug[termsSlug]
  if (slugLocale && slugLocale !== locale) {
    return baseMetadata
  }

  if (termsSlug !== pageSlug) {
    return baseMetadata
  }

  return baseMetadata
}

export default async function GeneralTermsPage({ params }: Props) {
  const { locale: localeParam, termsSlug } = await params
  const locale: Locale = isValidLocale(localeParam) ? localeParam as Locale : 'en'

  if (!supportedSlugs.has(termsSlug as typeof slugPerLocale[Locale])) {
    notFound()
  }

  const slugLocale = localeBySlug[termsSlug]
  if (slugLocale && slugLocale !== locale) {
    redirect(`/${slugLocale}/${slugPerLocale[slugLocale]}`)
  }

  const expectedSlug = slugPerLocale[locale]
  if (termsSlug !== expectedSlug) {
    redirect(`/${locale}/${expectedSlug}`)
  }

  const t = getTranslations(locale)
  const txt = t.generalTerms

  return (
    <div className="bg-white py-20 md:py-24">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        <header>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-athletic-dark">
            {txt.title}
          </h1>
          <p className="mt-4 text-sm text-gray-500">
            {txt.lastUpdated}
          </p>
          <p className="mt-6 text-lg leading-relaxed text-gray-600">
            {txt.intro}
          </p>
        </header>

        <div className="mt-16 space-y-16">
          {txt.sections.map((section) => (
            <section key={section.id} id={section.id}>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-athletic-dark mb-6">
                {section.title}
              </h2>
              <div className="space-y-4">
                {section.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-lg leading-relaxed text-gray-600">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        <div className="mt-20 border-t border-gray-200 pt-12 space-y-6">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-athletic-dark">
            {txt.contact.title}
          </h2>
          <p className="text-lg leading-relaxed text-gray-600">
            {txt.contact.description}
          </p>
          <dl className="space-y-4 text-lg text-gray-600">
            <div>
              <dt className="font-semibold text-athletic-dark mb-1">
                {txt.contact.emailLabel}
              </dt>
              <dd>
                <a
                  href={`mailto:${txt.contact.emailValue}`}
                  className="text-ocean-600 hover:text-ocean-700 underline underline-offset-2 transition-colors"
                >
                  {txt.contact.emailValue}
                </a>
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-athletic-dark mb-1">
                {txt.contact.addressLabel}
              </dt>
              <dd>{txt.contact.addressValue}</dd>
            </div>
            <div>
              <dt className="font-semibold text-athletic-dark mb-1">
                {txt.contact.vatLabel}
              </dt>
              <dd>{txt.contact.vatValue}</dd>
            </div>
          </dl>
          <p className="text-sm text-gray-500 mt-6">
            {txt.contact.complaintNote}
          </p>
        </div>
      </div>
    </div>
  )
}
