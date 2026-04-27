import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import * as React from "react";

interface InquiryReplyEmailProps {
  studentName: string;
  courseInterest: string;
}

export const InquiryReplyEmail = ({
  studentName,
  courseInterest,
}: InquiryReplyEmailProps) => (
  <Html>
    <Head />
    <Preview>Thank you for your interest in S.K. Degree & P.G. College</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={header}>
          {/* Replace with your actual hosted logo URL */}
          <Heading style={heading}>S.K. Degree & P.G. College</Heading>
          <Text style={subheading}>Estd. 1997 | Affiliated to Andhra University</Text>
        </Section>

        <Section style={content}>
          <Text style={greeting}>Dear {studentName},</Text>
          <Text style={paragraph}>
            Thank you for reaching out to us regarding your interest in our <strong>{courseInterest}</strong> program.
            We have received your inquiry and our admissions team is currently reviewing it.
          </Text>
          <Text style={paragraph}>
            An admissions officer will contact you shortly on your provided mobile number to discuss the next steps,
            fee structure, and any questions you may have.
          </Text>

          <Section style={btnContainer}>
            <Text style={infoTitle}>Quick Contact:</Text>
            <Text style={infoText}>📞 +91 94402 44783</Text>
            <Text style={infoText}>📧 admin@skdegreecollege.com</Text>
          </Section>
        </Section>

        <Hr style={hr} />

        <Section style={footer}>
          <Text style={footerText}>
            S.K. Degree & P.G. College<br />
            Ayyanapeta,Vizianagaram - 535003
          </Text>
          <Text style={footerLink}>
            <a href="https://skdegreecollege.com" style={link}>www.skdegreecollege.com</a>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default InquiryReplyEmail;

const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: 'Lato, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Ubuntu, sans-serif',
};

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "40px 20px",
  maxWidth: "600px",
  borderRadius: "8px",
  border: "1px solid #e6ebf1",
};

const header = {
  textAlign: "center" as const,
  paddingBottom: "20px",
};

const heading = {
  fontSize: "28px",
  lineHeight: "1.3",
  fontWeight: "700",
  color: "#1a2b4b", // Academic Navy
  fontFamily: "Playfair Display, serif",
  margin: "10px 0",
};

const subheading = {
  fontSize: "14px",
  color: "#c5a059", // Academic Gold
  fontWeight: "600",
  textTransform: "uppercase" as const,
  letterSpacing: "1px",
  margin: "0",
};

const content = {
  padding: "20px 0",
};

const greeting = {
  fontSize: "18px",
  fontWeight: "600",
  color: "#333",
  marginBottom: "15px",
};

const paragraph = {
  fontSize: "16px",
  lineHeight: "26px",
  color: "#444",
  marginBottom: "20px",
};

const btnContainer = {
  backgroundColor: "#f9fafb",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "left" as const,
};

const infoTitle = {
  fontSize: "14px",
  fontWeight: "bold",
  color: "#1a2b4b",
  textTransform: "uppercase" as const,
  marginBottom: "10px",
};

const infoText = {
  fontSize: "16px",
  margin: "5px 0",
  color: "#555",
};

const hr = {
  borderColor: "#e6ebf1",
  margin: "20px 0",
};

const footer = {
  textAlign: "center" as const,
};

const footerText = {
  fontSize: "12px",
  color: "#8898aa",
  lineHeight: "18px",
};

const footerLink = {
  marginTop: "10px",
};

const link = {
  color: "#c5a059",
  textDecoration: "none",
  fontSize: "12px",
  fontWeight: "bold",
};
