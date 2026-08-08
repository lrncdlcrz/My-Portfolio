import type { Metadata } from "next";
import { LegalLayout, LegalSection, LegalList } from "@/components/legal/legal-layout";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How this site handles the information you send through the contact form, what is stored in your browser, and who processes it.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Privacy Policy"
      intro="This is a personal portfolio site. It collects as little as possible: there is no analytics, no advertising, and no tracking of any kind. This page sets out exactly what happens to the information you do send."
      updated="7 August 2026"
    >
      <LegalSection number="01" heading="Who is responsible">
        <p>
          This site is owned and operated by {siteConfig.name}, based in{" "}
          {siteConfig.location}. For anything in this policy you can reach me at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>.
        </p>
      </LegalSection>

      <LegalSection number="02" heading="What the contact form collects">
        <p>
          The contact form is the only place this site asks you for information. It
          collects exactly four things, all of which you type yourself:
        </p>
        <LegalList
          items={[
            "Your name",
            "Your email address",
            "A subject line",
            "Your message",
          ]}
        />
        <p>
          There is also a hidden field used to catch automated spam. It is never shown
          to you, and a genuine submission always leaves it empty.
        </p>
      </LegalSection>

      <LegalSection number="03" heading="How your message is delivered">
        <p>
          Submissions are sent from your browser through{" "}
          <a href="https://www.emailjs.com/legal/privacy-policy/" target="_blank" rel="noreferrer noopener">
            EmailJS
          </a>
          , which forwards them to my personal inbox. This site has no database and
          stores nothing server-side. Your message is processed by EmailJS in transit
          and is then subject to their privacy policy, and afterwards it lives in my
          email inbox like any other message.
        </p>
        <p>
          I use what you send only to reply to you. It is never sold, published, or
          shared with anyone else.
        </p>
      </LegalSection>

      <LegalSection number="04" heading="What is stored in your browser">
        <p>
          This site sets no advertising or tracking cookies. The only thing it keeps in
          your browser is a small <code>localStorage</code> entry recording whether you
          chose light or dark mode, so the site can respect your preference on your next
          visit. It contains no personal information and you can clear it at any time
          through your browser settings.
        </p>
      </LegalSection>

      <LegalSection number="05" heading="Analytics">
        <p>
          There are none. No analytics service, tag manager, pixel, heatmap, or session
          recorder runs on this site. I do not know who visits, or which pages they read.
        </p>
      </LegalSection>

      <LegalSection number="06" heading="Hosting">
        <p>
          The site is hosted on{" "}
          <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noreferrer noopener">
            Vercel
          </a>
          . Like any web host, Vercel&apos;s infrastructure records standard request
          logs, which can include IP addresses and browser user-agent strings, for
          security and operational purposes. I do not have a dashboard of visitor
          identities and I do not use these logs to profile anyone.
        </p>
      </LegalSection>

      <LegalSection number="07" heading="Links to other sites">
        <p>
          This site links out to profiles and projects on services such as GitHub,
          LinkedIn, Upwork, OnlineJobs.ph, Fiverr, and Vercel-hosted demos. Once you
          follow one of those links you are on someone else&apos;s site, and their
          privacy policy applies instead of this one.
        </p>
      </LegalSection>

      <LegalSection number="08" heading="Your choices">
        <p>
          Because the only personal data I hold is whatever you chose to email me, your
          options are simple. Write to{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a> and you can ask
          me to:
        </p>
        <LegalList
          items={[
            "Tell you what correspondence of yours I still have",
            "Correct anything that is wrong",
            "Delete our correspondence from my inbox",
          ]}
        />
        <p>
          I will action reasonable requests promptly. You can also simply not use the
          contact form, and reach me through any of the linked profiles instead.
        </p>
      </LegalSection>

      <LegalSection number="09" heading="Children">
        <p>
          This site is a professional portfolio aimed at employers, clients, and
          collaborators. It is not directed at children, and I do not knowingly collect
          information from them.
        </p>
      </LegalSection>

      <LegalSection number="10" heading="Changes to this policy">
        <p>
          If the site changes in a way that affects this policy, for example if
          analytics are ever added, I will update this page and revise the date at the
          top. The current version is always the one published here.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
