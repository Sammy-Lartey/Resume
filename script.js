document.addEventListener('DOMContentLoaded', function() {
    // --- Visitor Count Functionality ---
    fetch('https://j0iyjzewml.execute-api.ap-south-1.amazonaws.com/prod/visitor_count')
    .then(response => response.json())
    .then(data => {
        let visitor_count = data.updated_total_count;
        document.querySelector('#count').textContent = visitor_count;
    })
    .catch(error => {
        console.log('Error fetching visitor count:', error);
        document.querySelector('#count').textContent = "many";
    });

    // --- Download Button Functionality ---
    document.getElementById('download-btn').addEventListener('click', function() {
        const pdfUrl = 'SAMUEL-LARTEY-CV.pdf';
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'SAMUEL-LARTEY-RESUME.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- Contact Form Handling with Formspree ---
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

console.log('Contact form found:', contactForm); // Debug log

if (contactForm) {
    contactForm.addEventListener('submit', async function(event) {
        console.log('Form submitted!'); // Debug log
        event.preventDefault(); 
        console.log('Default prevented!'); // Debug log
        
        const formData = new FormData(contactForm);
        const submitButton = contactForm.querySelector('button[type="submit"]');
        
        // Show loading state
        formStatus.textContent = 'Sending your message...';
        formStatus.style.color = '#1e3f7a';
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';

        try {
            console.log('Sending to Formspree...'); // Debug log
            
            // Use FormData directly with the correct content-type
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData, // Use FormData directly
                headers: {
                    'Accept': 'application/json'
                }
            });

            console.log('Response status:', response.status); // Debug log

            if (response.ok) {
                const result = await response.json();
                console.log('Formspree response:', result); // Debug log
                
                // Success
                formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                formStatus.style.color = 'green';
                contactForm.reset();
                
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            } else {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
        } catch (error) {
            console.error('Form submission error:', error);
            formStatus.textContent = 'Failed to send message. Please email me directly at sammylartey39@gmail.com';
            formStatus.style.color = 'red';
        } finally {
            submitButton.disabled = false;
            submitButton.textContent = 'Send Message';
        }
    });
}
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
