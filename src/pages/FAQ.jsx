import React, { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqData = [
    {
      category: 'Getting Started',
      questions: [
        {
          question: 'How do I create an account?',
          answer: 'To create an account, click on the "Sign Up" button on the homepage. Enter your email, create a password, and fill in your profile information. You\'ll receive a verification email to confirm your account.'
        },
        {
          question: 'Is Bookly free to use?',
          answer: 'Yes! Bookly is completely free to use. You can read, write, and share stories without any cost. We may offer premium features in the future, but the basic platform will always be free.'
        },
        {
          question: 'Can I change my username later?',
          answer: 'Yes, you can change your username anytime in your account settings. Go to Profile > Settings > Username to make changes.'
        }
      ]
    },
    {
      category: 'Reading Stories',
      questions: [
        {
          question: 'How do I search for stories?',
          answer: 'Use the search bar at the top of the homepage. You can search by story title, author name, or genre. You can also filter by tags and rating to find exactly what you\'re looking for.'
        },
        {
          question: 'Can I bookmark stories?',
          answer: 'Yes! Click the bookmark icon on any story to save it to your reading list. You can access your bookmarks anytime from your profile.'
        },
        {
          question: 'How do I leave a review?',
          answer: 'After reading a story, click the "Leave a Review" button. You can rate the story (1-5 stars) and write your thoughts. Reviews help other readers find great stories!'
        },
        {
          question: 'Can I download stories to read offline?',
          answer: 'Yes, premium members can download stories as PDF or EPUB files. Free users can read stories online without downloading.'
        }
      ]
    },
    {
      category: 'Writing Stories',
      questions: [
        {
          question: 'How do I start writing a story?',
          answer: 'Go to your profile and click "Create New Story". Give your story a title, add a description, and choose genres and tags. Then start writing in the editor!'
        },
        {
          question: 'Can I save my work as a draft?',
          answer: 'Absolutely! Your work is automatically saved as you write. You can continue editing and save as many drafts as you want before publishing.'
        },
        {
          question: 'How do I publish my story?',
          answer: 'Once you\'re happy with your story, click "Publish". Your story will become visible to other readers. You can unpublish it anytime if needed.'
        },
        {
          question: 'Can I edit my story after publishing?',
          answer: 'Yes! You can edit published stories anytime. Go to your story and click "Edit". Your changes will be visible to readers immediately.'
        },
        {
          question: 'What genres can I choose from?',
          answer: 'We support a wide range of genres including: Fantasy, Science Fiction, Romance, Mystery, Thriller, Historical Fiction, Young Adult, Poetry, Short Stories, and more!'
        }
      ]
    },
    {
      category: 'Community & Interactions',
      questions: [
        {
          question: 'How do I follow other authors?',
          answer: 'Visit an author\'s profile and click the "Follow" button. You\'ll be notified when they publish new stories.'
        },
        {
          question: 'Can I message other users?',
          answer: 'Yes! Click on a user\'s profile and select "Send Message". You can have direct conversations with other Bookly members.'
        },
        {
          question: 'What are story tags?',
          answer: 'Tags are keywords that describe your story\'s themes and content (e.g., "romance", "adventure", "magic"). Tags help readers find stories they\'re interested in.'
        },
        {
          question: 'How do I report inappropriate content?',
          answer: 'If you find content that violates our guidelines, click the three-dot menu on the story and select "Report". Our team will review it promptly.'
        }
      ]
    },
    {
      category: 'Account & Privacy',
      questions: [
        {
          question: 'How do I reset my password?',
          answer: 'Click "Forgot Password" on the login page. Enter your email address and you\'ll receive a link to reset your password.'
        },
        {
          question: 'Is my data private and secure?',
          answer: 'Yes! We take privacy seriously. Your personal information is encrypted and never shared with third parties without your consent. Check our Privacy Policy for details.'
        },
        {
          question: 'Can I delete my account?',
          answer: 'Yes, you can delete your account anytime from Settings > Account. Note that this will also delete all your stories and data permanently.'
        },
        {
          question: 'How do I enable two-factor authentication?',
          answer: 'Go to Settings > Security and enable two-factor authentication (2FA). This adds an extra layer of security to your account.'
        }
      ]
    },
    {
      category: 'Technical Support',
      questions: [
        {
          question: 'The page won\'t load. What do I do?',
          answer: 'Try refreshing the page or clearing your browser cache. Make sure you have a stable internet connection. If the problem persists, try a different browser.'
        },
        {
          question: 'I\'m having issues with the editor.',
          answer: 'Make sure you\'re using a supported browser (Chrome, Firefox, Safari, or Edge). Disable browser extensions that might interfere, and try clearing your cache.'
        },
        {
          question: 'How do I contact customer support?',
          answer: 'Visit our Contact page or email support@bookly.com. We typically respond to inquiries within 24 hours.'
        },
        {
          question: 'Is Bookly available on mobile?',
          answer: 'Yes! Bookly is fully responsive and works great on mobile devices. We\'re also working on dedicated iOS and Android apps.'
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  let globalIndex = 0;

  return (
    <div className="faq-container">
      <div className="faq-header">
        <h1>Help & FAQ</h1>
        <p>Find answers to common questions about Bookly</p>
      </div>

      <div className="faq-search">
        <input
          type="text"
          placeholder="Search FAQ..."
          className="faq-search-input"
        />
      </div>

      <div className="faq-content">
        {faqData.map((section, sectionIndex) => (
          <div key={sectionIndex} className="faq-section">
            <h2 className="faq-section-title">{section.category}</h2>
            <div className="faq-questions">
              {section.questions.map((item, questionIndex) => {
                const itemIndex = globalIndex++;
                return (
                  <div
                    key={questionIndex}
                    className={`faq-item ${activeIndex === itemIndex ? 'active' : ''}`}
                  >
                    <button
                      className="faq-question-btn"
                      onClick={() => toggleQuestion(itemIndex)}
                    >
                      <span className="question-text">{item.question}</span>
                      <span className="faq-icon">
                        {activeIndex === itemIndex ? '−' : '+'}
                      </span>
                    </button>
                    {activeIndex === itemIndex && (
                      <div className="faq-answer">
                        <p>{item.answer}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="faq-footer">
        <div className="faq-footer-content">
          <h3>Still need help?</h3>
          <p>Can't find the answer you're looking for? Our support team is here to help!</p>
          <div className="faq-footer-buttons">
            <button className="faq-btn primary">Contact Support</button>
            <button className="faq-btn secondary">View Documentation</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
