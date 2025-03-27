import React from 'react'
import Wrapper from '../Wrapper'
import Terms from 'components/Terms';
import useI18n from 'hooks/useI18n';
import { ModalContent } from 'ui/styled';

export default function ModalProviderAgreement() {
  const { t } = useI18n()
  
  const terms = [
    {
      title: "1. Purpose of the Agreement",
      content: "The objective of this Agreement is to define the general conditions under which the Content Provider lists, uploads, and manages their profile and/or content on the Dexsire platform (the \"Platform\")."
    },
    {
      title: "2. Content and Profile Management",
      content: `2.1 Content Submission
The Content Provider agrees to provide accurate, current, and truthful information, including:
● Personal/professional description,
● Photographs, videos, or other multimedia content,
● Details of prices, schedules, and availability.

2.2 Content Standards
Materials provided by the Content Provider must:
● Comply with applicable laws and regulations,
● Not infringe on third-party intellectual property rights,
● Not contain any obscene, defamatory, or illegal content.

2.3 Updates and Maintenance
The Content Provider must update their profile to ensure the accuracy and relevance of the information.

2.4 Right of Verification
Dexsire reserves the right to:
● Review and approve content before publication,
● Request modifications to comply with platform guidelines,
● Remove any content that violates this Agreement or applicable law.`
    },
    {
      title: "3. Payment Terms",
      content: `3.1 Commissions and Fees
Dexsire will charge fees for listing or using the Platform. Details of commission structures, subscription fees, or one-time payments will be specified in a separate Fee Schedule provided at signing.

3.2 Payment Schedule
Content Providers will receive payments for services rendered via the Platform at intervals agreed upon in writing (weekly, bi-weekly, or monthly). Payments will be made by a mutually agreed method (bank transfer, PayPal, etc.).

3.3 Deductions
Dexsire may deduct commissions, taxes, or fees before transferring the final payment to the Content Provider.

3.4 Payment Disputes
Any dispute regarding payments must be reported within 15 days of receiving the payment.`
    },
    {
      title: "4. Ownership and License",
      content: `4.1 Content Ownership
The Content Provider retains ownership of all content submitted on the Platform.

4.2 Usage License
The Content Provider grants Dexsire a non-exclusive and royalty-free license to:
● Display, distribute, and promote the content on the Platform,
● Use the content for marketing or advertising purposes.

4.3 Third-Party Claims
The Content Provider is solely responsible for ensuring they have all necessary rights to the provided content. In case of third-party claims regarding ownership or infringement, the Content Provider will indemnify Dexsire.`
    },
    {
      title: "5. Representations and Warranties",
      content: `The Content Provider represents and warrants that:
● All content is original or properly licensed,
● They are legally authorized to provide the advertised services,
● They will comply with all applicable laws and regulations in their jurisdiction.`
    },
    {
      title: "6. Term and Termination",
      content: `6.1 Term
This Agreement takes effect on the Effective Date and remains in force until terminated by either Party with 30 days' written notice.

6.2 Termination for Breach
Dexsire reserves the right to immediately terminate this Agreement if the Content Provider:
● Breaches the terms of this Agreement,
● Submits fraudulent, misleading, or illegal content.

6.3 Effects of Termination
Upon termination:
● All licenses granted to Dexsire will end,
● The Content Provider's profile and content will be removed from the Platform.`
    },
    {
      title: "7. Indemnification",
      content: `The Content Provider agrees to indemnify, defend, and hold harmless Dexsire, its affiliates, and employees against any claims, liability, or damages arising from:
● Breach of this Agreement,
● Misrepresentation or misuse of the Platform,
● Any legal claims related to content ownership or service provision.`
    },
    {
      title: "8. Limitation of Liability",
      content: `Dexsire's liability under this Agreement is limited to direct damages not exceeding the total fees paid by the Content Provider during the previous three months.

Dexsire shall not be liable for any indirect, incidental, or consequential damages.`
    },
    {
      title: "9. Confidentiality",
      content: "Both Parties agree to keep confidential all business, financial, or proprietary information shared in the context of this Agreement and not to disclose it to third parties without prior written consent."
    },
    {
      title: "10. General Provisions",
      content: `10.1 Independent Contractor
The Content Provider acts as an independent contractor. This Agreement does not create a partnership, employer-employee relationship, or joint venture.

10.2 Entire Agreement
This Agreement constitutes the entire understanding between the Parties and supersedes any prior agreements.

10.3 Applicable Law
This Agreement is governed by and interpreted in accordance with the laws of the Canton of Vaud, Switzerland.

10.4 Dispute Resolution
Any dispute will be resolved through good faith negotiations.

Acceptance of Terms
By clicking "I accept" or otherwise indicating acceptance, the Content Provider acknowledges having read, understood, and accepted the terms and conditions of this Agreement.`
    }
  ];

  return (
    <>
      <Wrapper background="/images/background.jpeg">
        <ModalContent id="modal-content" type="provider-agreement">
          <Terms 
            terms={terms} 
            title="Content Provider Agreement"
          />
        </ModalContent>
      </Wrapper>
    </>
  )
} 