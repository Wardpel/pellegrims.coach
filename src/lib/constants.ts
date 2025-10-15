import { TwitterIcon, FacebookIcon, InstagramIcon, LinkedinIcon } from '@/components/icons'

export const ATHLETE_COUNTS = {
  CLIENTS: 100,
  MIN_TRAINING_CAMP_SIZE: 6,
} as const;

export const socialLinks = [
  { href: "https://twitter.com/WardPel", icon: TwitterIcon, platform: "Twitter" },
  { href: "https://www.facebook.com/ward.pellegrims/", icon: FacebookIcon, platform: "Facebook" },
  { href: "https://www.instagram.com/wardpel/", icon: InstagramIcon, platform: "Instagram" },
  { href: "https://www.linkedin.com/in/pellegrimsward/", icon: LinkedinIcon, platform: "LinkedIn" }
] as const

export type SocialLink = typeof socialLinks[number]
