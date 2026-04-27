import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Row,
  Column,
  Section,
  Text,
  Img,
} from "@react-email/components";
import * as React from "react";
import { COLLEGE_LOGO_BASE64 } from "@/lib/logo-base64";

interface InquiryReplyEmailProps {
  studentName: string;
  courseInterest: string;
}

export const InquiryReplyEmail = ({
  studentName = "Student",
  courseInterest = "B.Com (Hons)",
}: InquiryReplyEmailProps) => (
  <Html>
    <Head />
    <Preview>
      Your inquiry has been received – S.K. Degree & P.G. College
    </Preview>
    <Body style={main}>
      <Container style={container}>
        {/* ── Header ── */}
        <Section style={header}>
          <Row style={headerRow}>
            <Column style={logoCol}>
              <Img
                src={`data:image/png;base64,${COLLEGE_LOGO_BASE64}`}
                width="64"
                height="64"
                alt="S.K. College Logo"
                style={logoStyle}
              />
            </Column>
            <Column style={headerTextCol}>
              <Heading style={collegeName}>S.K. Degree &amp; P.G. College</Heading>
              <div style={badge}>Estd. 1997 &nbsp;·&nbsp; Andhra University</div>
            </Column>
          </Row>
        </Section>

        {/* Gold accent bar */}
        <div style={accentBar} />

        {/* ── Body ── */}
        <Section style={body}>
          <Text style={label}>Admissions Confirmation</Text>
          <Text style={greeting}>Dear {studentName},</Text>

          <Text style={paragraph}>
            Thank you for your interest in our{" "}
            <span style={courseHighlight}>{courseInterest}</span> programme.
            We have received your inquiry and our admissions team is carefully
            reviewing it.
          </Text>

          <Text style={paragraph}>
            An admissions officer will contact you shortly to discuss the fee
            structure, eligibility criteria, and next steps in the process.
          </Text>

          {/* Contact card */}
          <Section style={contactCard}>
            <Text style={contactLabel}>Quick Contact</Text>

            <Row style={contactRow}>
              <Column style={iconCol}>
                <div style={iconCircle}>&#x260F;</div>
              </Column>
              <Column>
                <Text style={contactText}>+91 94402 44783</Text>
              </Column>
            </Row>

            <Row style={contactRow}>
              <Column style={iconCol}>
                <div style={iconCircle}>&#x2709;</div>
              </Column>
              <Column>
                <Text style={contactText}>admin@skdegreecollege.com</Text>
              </Column>
            </Row>
          </Section>

          <Section style={btnSection}>
            <Button style={ctaButton} href="https://skdegreecollege.com">
              Visit Our Website
            </Button>
          </Section>
        </Section>

        <Hr style={divider} />

        {/* ── Footer ── */}
        <Section style={footer}>
          <Text style={footerAddress}>
            S.K. Degree &amp; P.G. College<br />
            Ayyanapeta, Vizianagaram – 535003, Andhra Pradesh
          </Text>
          <Text style={footerWebsite}>
            <a href="https://skdegreecollege.com" style={footerLink}>
              www.skdegreecollege.com
            </a>
          </Text>
          <Text style={footerNote}>
            This is an automated message. Please do not reply directly to this email.
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default InquiryReplyEmail;

/* ── Styles ── */
const main = {
  backgroundColor: "#f0f2f5",
  fontFamily: 'Georgia, "Times New Roman", serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "32px auto",
  maxWidth: "580px",
  borderRadius: "12px",
  overflow: "hidden" as const,
  border: "1px solid #e0e4ea",
};

/* Header */
const header = {
  backgroundColor: "#1a2b4b",
  padding: "32px 40px",
};

const headerRow = {
  display: "table-cell",
  verticalAlign: "middle",
};

const logoCol = {
  width: "80px",
  verticalAlign: "middle",
};

const logoStyle = {
  display: "block",
  borderRadius: "50%",
  border: "2px solid #c5a059",
};

const headerTextCol = {
  verticalAlign: "middle",
  textAlign: "left" as const,
};

const collegeName = {
  color: "#ffffff",
  fontSize: "22px",
  fontWeight: "700",
  fontFamily: 'Georgia, "Times New Roman", serif',
  letterSpacing: "0.5px",
  margin: "0 0 4px",
};

const badge = {
  display: "inline-block",
  backgroundColor: "#c5a059",
  color: "#ffffff",
  fontSize: "10px",
  fontWeight: "600",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  padding: "4px 12px",
  borderRadius: "20px",
};

const accentBar = {
  height: "4px",
  background: "linear-gradient(90deg, #1a2b4b 0%, #c5a059 50%, #1a2b4b 100%)",
};

/* Body */
const body = {
  padding: "36px 40px 28px",
};

const label = {
  fontSize: "11px",
  color: "#c5a059",
  fontWeight: "600",
  letterSpacing: "2px",
  textTransform: "uppercase" as const,
  margin: "0 0 20px",
  fontFamily: 'Arial, sans-serif',
};

const greeting = {
  fontSize: "18px",
  color: "#1a2b4b",
  fontWeight: "600",
  margin: "0 0 16px",
};

const paragraph = {
  fontSize: "15px",
  lineHeight: "1.7",
  color: "#444444",
  margin: "0 0 18px",
  fontFamily: 'Arial, sans-serif',
};

const courseHighlight = {
  color: "#1a2b4b",
  fontWeight: "700",
  borderBottom: "2px solid #c5a059",
  paddingBottom: "1px",
};

/* Contact card */
const contactCard = {
  backgroundColor: "#f8f6f0",
  borderLeft: "3px solid #c5a059",
  borderRadius: "0 8px 8px 0",
  padding: "20px 24px",
  margin: "0 0 28px",
};

const contactLabel = {
  fontSize: "11px",
  color: "#c5a059",
  fontWeight: "700",
  letterSpacing: "1.5px",
  textTransform: "uppercase" as const,
  margin: "0 0 14px",
  fontFamily: 'Arial, sans-serif',
};

const contactRow = {
  marginBottom: "10px",
};

const iconCol = {
  width: "36px",
  verticalAlign: "middle" as const,
};

const iconCircle = {
  width: "28px",
  height: "28px",
  backgroundColor: "#1a2b4b",
  borderRadius: "50%",
  color: "#c5a059",
  fontSize: "13px",
  textAlign: "center" as const,
  lineHeight: "28px",
};

const contactText = {
  fontSize: "15px",
  color: "#333333",
  fontWeight: "500",
  margin: "0",
  fontFamily: 'Arial, sans-serif',
  verticalAlign: "middle" as const,
};

/* CTA */
const btnSection = {
  textAlign: "center" as const,
  margin: "4px 0 8px",
};

const ctaButton = {
  backgroundColor: "#1a2b4b",
  color: "#ffffff",
  fontSize: "14px",
  fontWeight: "600",
  padding: "13px 32px",
  borderRadius: "6px",
  textDecoration: "none",
  letterSpacing: "0.5px",
  fontFamily: 'Arial, sans-serif',
};

/* Footer */
const divider = {
  borderColor: "#e8e4da",
  margin: "0 40px",
};

const footer = {
  padding: "20px 40px 28px",
  textAlign: "center" as const,
};

const footerAddress = {
  fontSize: "12px",
  color: "#888888",
  lineHeight: "1.8",
  margin: "0 0 6px",
  fontFamily: 'Arial, sans-serif',
};

const footerWebsite = {
  margin: "0 0 10px",
};

const footerLink = {
  color: "#c5a059",
  fontSize: "12px",
  fontWeight: "600",
  textDecoration: "none",
  fontFamily: 'Arial, sans-serif',
};

const footerNote = {
  fontSize: "11px",
  color: "#bbbbbb",
  margin: "0",
  fontFamily: 'Arial, sans-serif',
};
