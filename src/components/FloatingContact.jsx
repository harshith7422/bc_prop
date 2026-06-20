import React from 'react';
import { Phone } from 'lucide-react';

export default function FloatingContact() {
  const phoneNumber = '9886933999';
  const waNumber = '919886933999';
  const waMessage = 'Hello, I want to book a free consultation';

  return (
    <div className="floating-contact-container">
      <a
        href={`https://wa.me/${waNumber}?text=${encodeURIComponent(waMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="floating-btn wa-btn"
        aria-label="Chat on WhatsApp"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <path d="M12.031 0C5.385 0 .003 5.382.003 12.028c0 2.126.554 4.198 1.606 6.01L0 24l6.096-1.597c1.745.966 3.731 1.474 5.933 1.474 6.645 0 12.026-5.383 12.026-12.028S18.677 0 12.031 0zm0 21.94c-1.8 0-3.559-.484-5.1-1.397l-.366-.217-3.79.993 1.01-3.696-.238-.378a9.92 9.92 0 0 1-1.542-5.218c0-5.508 4.484-9.99 9.992-9.99 5.509 0 9.99 4.482 9.99 9.99 0 5.509-4.481 9.99-9.99 9.99zm5.485-7.485c-.301-.151-1.785-.882-2.062-.983-.277-.101-.479-.151-.68.151-.202.302-.782.983-.958 1.185-.177.202-.353.227-.655.076-1.545-.776-2.613-1.428-3.606-2.585-.258-.302-.027-.466.124-.617.135-.136.302-.352.453-.529.151-.176.202-.302.302-.503.1-.202.05-.378-.025-.529-.076-.151-.68-1.637-.933-2.242-.246-.59-.496-.51-.68-.52-.176-.01-.378-.01-.58-.01-.202 0-.529.076-.806.378-.277.302-1.058 1.033-1.058 2.518 0 1.485 1.083 2.92 1.234 3.122.151.202 2.128 3.245 5.155 4.549 2.01.868 2.846.942 3.864.79.795-.119 2.454-1.002 2.795-1.968.34-.966.34-1.794.238-1.968-.1-.176-.377-.277-.679-.428z"/>
        </svg>
      </a>
      
      <a
        href={`tel:${phoneNumber}`}
        className="floating-btn phone-btn"
        aria-label="Call Us"
      >
        <Phone size={24} fill="currentColor" stroke="none" />
      </a>

      <style>{`
        .floating-contact-container {
          position: fixed;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          gap: 15px;
          z-index: 1050;
        }

        .floating-btn {
          width: 55px;
          height: 55px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
          transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .floating-btn:hover {
          transform: scale(1.1) translateY(-4px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.25);
        }

        .wa-btn {
          background-color: #25D366;
        }
        
        .wa-btn:hover {
          background-color: #128C7E;
        }

        .phone-btn {
          background-color: var(--primary);
        }

        .phone-btn:hover {
          background-color: var(--primary-hover);
        }

        @media (max-width: 768px) {
          .floating-contact-container {
            top: auto;
            bottom: 20px;
            right: 20px;
            transform: none;
            gap: 12px;
          }
          
          .floating-btn {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
}
