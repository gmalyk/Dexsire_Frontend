import styled from "styled-components";

export const PageBackground = styled.div`
    width: 100%;
    min-height: 100vh;
    background: linear-gradient(to bottom, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
                url('/images/background.jpeg') center/cover no-repeat fixed;
    padding: 40px 20px;
`;

export const Container = styled.div.attrs({})`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 24px;
`;

export const Title = styled.h1`
  color: white;
  font-size: 32px;
  font-weight: 600;
  text-align: center;
  margin: 0;
`;

export const SubTitle = styled.p`
  color: rgba(255, 255, 255, 0.7);
  font-size: 16px;
  text-align: center;
  margin: 0;
`;

export const Content = styled.div.attrs({})`
  background: white;
  border-radius: 20px;
  padding: 40px;
  width: 100%;
  max-width: 800px;
  max-height: 700px;
  overflow-y: auto;
  margin: 0 auto;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
`;

export const SectionTitle = styled.h2`
  color: #FF4B55;  // Red color for section titles
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 16px 0;
`;

export const SectionText = styled.p`
  color: rgba(0, 0, 0, 0.6);  // Light black for text
  font-size: 16px;
  line-height: 1.6;
  margin: 0 0 24px 0;
`;

// For backward compatibility
export const TermsContainer = Content;
export const TermsTitle = Title;
export const TermsContent = Container;
export const TermsSection = Container;
export const TermTitle = SectionTitle;
export const TermText = SectionText;
export const TermContainer = Container;
export const TermContent = Content;
export const TextContainer = Container;