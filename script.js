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
        const pdfUrl = 'SAMUEL-LARTEY-CV.pdf'; // Updated path
        const link = document.createElement('a');
        link.href = pdfUrl;
        link.download = 'SAMUEL-LARTEY-RESUME.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });

    // --- Contact Form Handling ---
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', function() {
            // Just show a loading message
            // Formspree will handle the actual submission
            formStatus.textContent = 'Sending your message...';
            formStatus.style.color = '#1e3f7a';
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
