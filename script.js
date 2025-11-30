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

    if (contactForm) {
        contactForm.addEventListener('submit', async function(event) {
            event.preventDefault(); // Prevent default form submission
            
            const formData = new FormData(contactForm);
            const submitButton = contactForm.querySelector('button[type="submit"]');
            
            // Show loading state
            formStatus.textContent = 'Sending your message...';
            formStatus.style.color = '#1e3f7a';
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';

            try {
                // Send to Formspree
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    // Success
                    formStatus.textContent = 'Message sent successfully! I will get back to you soon.';
                    formStatus.style.color = 'green';
                    contactForm.reset();
                    
                    // Clear success message after 5 seconds
                    setTimeout(() => {
                        formStatus.textContent = '';
                    }, 5000);
                } else {
                    // Formspree returned an error
                    const errorData = await response.json();
                    throw new Error(errorData.error || 'Failed to send message');
                }
            } catch (error) {
                // Network error or Formspree error
                console.error('Form submission error:', error);
                formStatus.textContent = 'Failed to send message. Please email me directly at sammylartey39@gmail.com';
                formStatus.style.color = 'red';
                
                // Clear error message after 5 seconds
                setTimeout(() => {
                    formStatus.textContent = '';
                }, 5000);
            } finally {
                // Re-enable submit button
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
