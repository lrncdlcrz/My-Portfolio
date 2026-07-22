import { Certificate } from "@/types";

export const certificates: Certificate[] = [
  {
    id: "aws-certified-cloud-practitioner",
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    image: "/badges/aws-certified-cloud-practitioner.png",
    description:
      "Industry-recognized foundational certification validating cloud fluency across AWS services, security, architecture, pricing, and support.",
  },
  {
    id: "aws-cloud-quest-cloud-practitioner",
    title: "AWS Cloud Quest: Cloud Practitioner",
    issuer: "AWS Training and Certification",
    image: "/badges/aws-cloud-quest-cloud-practitioner.png",
    description:
      "Hands-on, gamified role-playing badge earned by completing real AWS cloud practitioner labs and quests.",
  },
  {
    id: "aws-academy-cloud-foundations",
    title: "AWS Academy Graduate — Cloud Foundations",
    issuer: "AWS Academy",
    image: "/badges/aws-academy-cloud-foundations.png",
    description:
      "Completed AWS Academy's Cloud Foundations training badge covering core AWS infrastructure, services, and cloud economics.",
    certificatePdf: "/certificates/aws-academy-cloud-foundations.pdf",
  },
  {
    id: "cloud-computing-fundamentals",
    title: "Cloud Computing Fundamentals",
    issuer: "IBM SkillsBuild",
    image: "/badges/cloud-computing-fundamentals.png",
    description:
      "Foundational badge covering cloud service models, deployment models, and core cloud computing concepts.",
    certificatePdf: "/certificates/cloud-computing-fundamentals.pdf",
  },
  {
    id: "introduction-to-cybersecurity",
    title: "Introduction to Cybersecurity",
    issuer: "Cisco Networking Academy",
    image: "/badges/introduction-to-cybersecurity.png",
    description:
      "Verified badge covering cybersecurity fundamentals — threats, vulnerabilities, and how organizations defend against them.",
    certificatePdf: "/certificates/introduction-to-cybersecurity.pdf",
  },
  {
    id: "linux-unhatched",
    title: "Linux Unhatched",
    issuer: "Cisco Networking Academy",
    image: "/badges/linux-unhatched.png",
    description:
      "Verified badge covering Linux fundamentals, the command line, and open-source operating system basics.",
    certificatePdf: "/certificates/linux-unhatched.pdf",
  },
];
