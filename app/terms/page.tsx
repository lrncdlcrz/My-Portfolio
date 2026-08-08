import type { Metadata } from "next";
import { LegalLayout, LegalSection, LegalList } from "@/components/legal/legal-layout";
import { siteConfig } from "@/constants/site";

export const metadata: Metadata = {
  title: "Terms & Conditions",
  description:
    "The terms covering use of this portfolio site, ownership of its content and code, and the limits of what is promised.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalLayout
      eyebrow="Legal"
      title="Terms & Conditions"
      intro="Plain terms for a personal portfolio. In short: look around, share it, and get in touch, but do not pass the work off as your own."
      updated="7 August 2026"
    >
      <LegalSection number="01" heading="Agreement">
        <p>
          By browsing {siteConfig.url.replace("https://", "")} you agree to these terms.
          If you do not agree with them, please stop using the site. They apply to the
          site itself, not to any separate written agreement we might sign for actual
          project work, which would take precedence.
        </p>
      </LegalSection>

      <LegalSection number="02" heading="Ownership of the content">
        <p>
          The design, written copy, layout, and source code of this site are mine and
          are protected by copyright. The projects presented here have their own
          context:
        </p>
        <LegalList
          items={[
            <>
              <strong className="text-foreground">Elder-Care Link</strong> is an academic
              capstone project co-developed as Team Woodbury with Mark Fred Reyes, in
              coordination with the Batangas City Office for Senior Citizens Affairs.
              Its branding, seals, and institutional material belong to those bodies,
              not to me.
            </>,
            <>
              <strong className="text-foreground">Kepler</strong> and{" "}
              <strong className="text-foreground">Eclaire Coffee Shop</strong> are
              self-directed practice builds for fictional brands. They are not
              commercial products and are not affiliated with any real company of a
              similar name.
            </>,
            <>
              Third-party names, logos, and technology marks shown on this site remain
              the property of their respective owners and appear here for identification
              only.
            </>,
          ]}
        />
      </LegalSection>

      <LegalSection number="03" heading="What you may do">
        <p>You are welcome to:</p>
        <LegalList
          items={[
            "Read, browse, and share links to any page here",
            "Download the resume PDF for the purpose of evaluating me for work",
            "Quote short excerpts with attribution and a link back",
            "Contact me about employment, freelance, or collaboration",
          ]}
        />
      </LegalSection>

      <LegalSection number="04" heading="What you may not do">
        <LegalList
          items={[
            "Republish this site, its code, or its case studies as your own work",
            "Use the content to train commercial models, or scrape it in bulk, without permission",
            "Misrepresent your relationship with me or with any project shown here",
            "Attempt to disrupt, probe, or gain unauthorised access to the site or its hosting",
          ]}
        />
        <p>
          If you would like to reuse something beyond the above, just ask at{" "}
          <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>. The answer is
          often yes.
        </p>
      </LegalSection>

      <LegalSection number="05" heading="Accuracy and availability">
        <p>
          This site is provided as-is. I keep the project write-ups, statistics, and
          technology lists accurate and up to date to the best of my knowledge, but I do
          not warrant that every detail is free of error, nor that the site will always
          be available or uninterrupted. Project status and scope can change,
          particularly for work still in progress.
        </p>
      </LegalSection>

      <LegalSection number="06" heading="External links">
        <p>
          This site links to third-party services and live project demos hosted
          elsewhere. I do not control those destinations and am not responsible for
          their content, availability, or practices. Following an external link is at
          your own discretion.
        </p>
      </LegalSection>

      <LegalSection number="07" heading="Limitation of liability">
        <p>
          To the extent permitted by law, I am not liable for any loss or damage arising
          from your use of, or inability to use, this site or anything you rely on from
          it. Nothing here is professional advice.
        </p>
      </LegalSection>

      <LegalSection number="08" heading="Privacy">
        <p>
          How information you send through the contact form is handled is set out
          separately in the <a href="/privacy">Privacy Policy</a>, which forms part of
          these terms.
        </p>
      </LegalSection>

      <LegalSection number="09" heading="Governing law">
        <p>
          These terms are governed by the laws of the Republic of the Philippines, and
          any dispute arising from them falls to the courts of Batangas City.
        </p>
      </LegalSection>

      <LegalSection number="10" heading="Changes">
        <p>
          I may update these terms as the site grows. Revisions are published on this
          page with a new date at the top, and continuing to use the site after a change
          means you accept the current version.
        </p>
      </LegalSection>
    </LegalLayout>
  );
}
