'use client'

import { socialLinks } from '@/lib/constants'
import { SocialLink } from '@/components/Header'
import type { Locale } from '@/lib/i18n'
import type { TranslationKey } from '@/lib/translations'

type Props = {
  locale: Locale
  t: TranslationKey
}

export default function Footer({ t }: Props) {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Navigate to home page with hash
      window.location.href = `/${locale}/#${sectionId}`
    }
  }
  return (
    <footer className="bg-gray-50 border-t border-gray-200 py-12 md:py-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-athletic-dark mb-4">
              {t.footer.companyName}
            </h3>
            <p className="text-sm text-gray-600">{t.footer.legalForm}</p>
            <p className="text-sm text-gray-600">{t.footer.address}</p>
            <p className="text-sm text-gray-600">{t.footer.vatNumber}</p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-lg font-semibold text-athletic-dark mb-4">
              {t.footer.navigationTitle}
            </h3>
            <ul className="space-y-2">
              {[
                { key: 'about', section: 'about' },
                { key: 'coaching', section: 'coaching' },
                { key: 'projects', section: 'projects' },
                { key: 'contact', section: 'contact' }
              ].map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => scrollToSection(item.section)}
                    className="text-sm text-gray-600 hover:text-athletic-dark transition-colors"
                  >
                    {t.nav[item.key as keyof typeof t.nav]}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-athletic-dark mb-4">
              {t.footer.followUs}
            </h3>
            <div className="flex justify-center md:justify-start space-x-4">
              {socialLinks.map((social, index) => (
                <SocialLink
                  key={index}
                  href={social.href}
                  icon={social.icon}
                  platform={social.platform}
                  size={20}
                  className="p-2"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center text-sm text-gray-500">
          {t.footer.copyright}
        </div>
      </div>
    </footer>)}
