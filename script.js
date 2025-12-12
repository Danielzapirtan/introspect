        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('therapistForm');
            const previewBtn = document.getElementById('previewBtn');
            const generateBtn = document.getElementById('generateBtn');
            const resetBtn = document.getElementById('resetBtn');
            const previewContainer = document.getElementById('previewContainer');
            const previewWebsite = document.getElementById('previewWebsite');
            const previewPlaceholder = document.querySelector('.preview-placeholder');
            
            // Load sample data for testing
            loadSampleData();
            
            // Preview button event
            previewBtn.addEventListener('click', function() {
                if (validateForm()) {
                    generatePreview();
                }
            });
            
            // Generate button event
            generateBtn.addEventListener('click', function() {
                if (validateForm()) {
                    generateWebsiteFile();
                }
            });
            
            // Reset button event
            resetBtn.addEventListener('click', function() {
                if (confirm('Sigur dorești să resetezi formularul? Toate datele introduse se vor pierde.')) {
                    form.reset();
                    previewWebsite.style.display = 'none';
                    previewPlaceholder.style.display = 'block';
                }
            });
            
            // Form validation
            function validateForm() {
                let isValid = true;
                const requiredFields = ['name', 'specialization', 'description', 'services', 'contact'];
                
                requiredFields.forEach(fieldId => {
                    const field = document.getElementById(fieldId);
                    const formGroup = field.closest('.form-group');
                    const errorMessage = formGroup.querySelector('.error-message');
                    
                    if (!field.value.trim()) {
                        formGroup.classList.add('error');
                        errorMessage.style.display = 'block';
                        isValid = false;
                    } else {
                        formGroup.classList.remove('error');
                        errorMessage.style.display = 'none';
                    }
                });
                
                return isValid;
            }
            
            // Generate preview
            function generatePreview() {
                const formData = getFormData();
                
                // Build the preview HTML
                let previewHTML = `
                    <div class="preview-header">
                        <h1>${formData.name}</h1>
                        <p>${formData.specialization}</p>
                    </div>
                    
                    <div class="preview-nav">
                        <a href="#despre">Despre mine</a>
                        <a href="#servicii">Servicii</a>
                        <a href="#abordari">Abordări terapeutice</a>
                        <a href="#contact">Contact</a>
                    </div>
                    
                    <div class="preview-content">
                        <section id="despre">
                            <h2 class="preview-section-title">Despre mine</h2>
                            <p>${formData.description.replace(/\n/g, '<br>')}</p>
                            ${formData.languages ? `<p><strong>Limbi vorbite:</strong> ${formData.languages}</p>` : ''}
                        </section>
                        
                        <section id="servicii">
                            <h2 class="preview-section-title">Servicii oferite</h2>
                            <div class="preview-services">
                                ${formData.services.split('\n').map(service => `
                                    <div class="service-card">
                                        <h3><i class="fas fa-comments" style="color: var(--accent);"></i> ${service.trim()}</h3>
                                        <p>Consiliere și psihoterapeutică individuală pentru problemele specifice aferente.</p>
                                    </div>
                                `).join('')}
                            </div>
                        </section>
                        
                        <section id="abordari">
                            <h2 class="preview-section-title">Abordări terapeutice</h2>
                            <p>${formData.approaches.length > 0 ? 
                                `În practica mea terapeutică utilizez următoarele abordări: ${formData.approaches.join(', ')}.` : 
                                'Abordarea terapeutică este adaptată nevoilor specifice ale fiecărui client.'}
                            </p>
                        </section>
                        
                        <section id="contact">
                            <h2 class="preview-section-title">Programări și contact</h2>
                            <div class="preview-contact">
                                <p>Pentru programări sau informații suplimentare, vă rugăm să mă contactați:</p>
                                <div class="contact-info">
                                    ${formData.contact.split('\n').map(contactLine => `
                                        <div class="contact-item">
                                            <i class="fas fa-envelope" style="color: var(--primary);"></i>
                                            <span>${contactLine.trim()}</span>
                                        </div>
                                    `).join('')}
                                </div>
                                <p style="margin-top: 20px; font-style: italic;">Prima consultație de evaluare durează aproximativ 50 de minute.</p>
                            </div>
                        </section>
                    </div>
                    
                    <div class="preview-footer">
                        <p>© ${new Date().getFullYear()} ${formData.name}. Toate drepturile rezervate.</p>
                        <p>Website generat cu Generator Website Psihoterapeut</p>
                    </div>
                `;
                
                // Show the preview
                previewWebsite.innerHTML = previewHTML;
                previewWebsite.style.display = 'block';
                previewPlaceholder.style.display = 'none';
                
                // Scroll to preview
                previewContainer.scrollTop = 0;
            }
            
            // Get form data
            function getFormData() {
                const approaches = [];
                document.querySelectorAll('input[type="checkbox"]:checked').forEach(checkbox => {
                    approaches.push(checkbox.value);
                });
                
                return {
                    name: document.getElementById('name').value,
                    specialization: document.getElementById('specialization').value,
                    description: document.getElementById('description').value,
                    services: document.getElementById('services').value,
                    contact: document.getElementById('contact').value,
                    languages: document.getElementById('languages').value,
                    photo: document.getElementById('photo').value,
                    approaches: approaches
                };
            }
            
            // Generate the final website file
            function generateWebsiteFile() {
                const formData = getFormData();
                
                // Build the complete HTML for the website
                const websiteHTML = `<!DOCTYPE html>
<html lang="ro">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${formData.name} - Psihoterapeut</title>
    <meta name="description" content="Psihoterapeut specializat în ${formData.specialization}">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <style>
        :root {
            --primary: #4a6fa5;
            --primary-dark: #385d8a;
            --secondary: #e8e9eb;
            --accent: #d4a574;
            --text: #333;
            --light: #f9f9f9;
            --border: #ddd;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f5f7fa;
            color: var(--text);
            line-height: 1.6;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 20px;
        }
        
        header {
            background: linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%);
            color: white;
            padding: 60px 20px;
            text-align: center;
        }
        
        header h1 {
            font-size: 2.5rem;
            margin-bottom: 10px;
        }
        
        header p {
            font-size: 1.3rem;
            opacity: 0.9;
            max-width: 800px;
            margin: 0 auto;
        }
        
        nav {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 20px;
        }
        
        .nav-container {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 30px;
        }
        
        nav a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            font-size: 1.1rem;
            transition: opacity 0.3s;
        }
        
        nav a:hover {
            opacity: 0.8;
        }
        
        section {
            padding: 60px 20px;
        }
        
        .section-title {
            font-size: 2rem;
            color: var(--primary-dark);
            margin-bottom: 30px;
            text-align: center;
            position: relative;
            padding-bottom: 15px;
        }
        
        .section-title:after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background-color: var(--accent);
        }
        
        .about-content {
            display: flex;
            align-items: center;
            gap: 40px;
            flex-wrap: wrap;
        }
        
        .about-text {
            flex: 1;
            min-width: 300px;
        }
        
        .photo-container {
            flex: 0 0 300px;
            text-align: center;
        }
        
        .profile-photo {
            width: 250px;
            height: 250px;
            border-radius: 50%;
            object-fit: cover;
            border: 5px solid var(--secondary);
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .services-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
            gap: 30px;
            margin-top: 40px;
        }
        
        .service-card {
            background-color: white;
            border-radius: 10px;
            padding: 30px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            transition: transform 0.3s;
        }
        
        .service-card:hover {
            transform: translateY(-10px);
        }
        
        .service-card i {
            font-size: 2.5rem;
            color: var(--accent);
            margin-bottom: 20px;
        }
        
        .service-card h3 {
            color: var(--primary-dark);
            margin-bottom: 15px;
        }
        
        .contact-container {
            background-color: white;
            border-radius: 10px;
            padding: 40px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
            max-width: 800px;
            margin: 0 auto;
        }
        
        .contact-info {
            display: flex;
            flex-direction: column;
            gap: 20px;
            margin-top: 30px;
        }
        
        .contact-item {
            display: flex;
            align-items: center;
            gap: 15px;
            font-size: 1.1rem;
        }
        
        .contact-item i {
            color: var(--primary);
            font-size: 1.3rem;
            width: 30px;
        }
        
        .languages {
            margin-top: 20px;
            padding: 15px;
            background-color: var(--light);
            border-radius: 8px;
        }
        
        .approach-list {
            display: flex;
            flex-wrap: wrap;
            gap: 15px;
            justify-content: center;
            margin-top: 30px;
        }
        
        .approach-badge {
            background-color: var(--primary);
            color: white;
            padding: 10px 20px;
            border-radius: 30px;
            font-weight: 600;
        }
        
        footer {
            background-color: var(--secondary);
            color: var(--text);
            text-align: center;
            padding: 30px 20px;
            margin-top: 60px;
        }
        
        @media (max-width: 768px) {
            header h1 {
                font-size: 2rem;
            }
            
            header p {
                font-size: 1.1rem;
            }
            
            .about-content {
                flex-direction: column;
                text-align: center;
            }
            
            .photo-container {
                order: -1;
            }
            
            .profile-photo {
                width: 200px;
                height: 200px;
            }
        }
    </style>
</head>
<body>
    <header>
        <div class="container">
            <h1>${formData.name}</h1>
            <p>${formData.specialization}</p>
        </div>
    </header>
    
    <nav>
        <div class="container nav-container">
            <a href="#despre">Despre mine</a>
            <a href="#servicii">Servicii</a>
            <a href="#abordari">Abordări terapeutice</a>
            <a href="#contact">Contact</a>
        </div>
    </nav>
    
    <main class="container">
        <section id="despre">
            <h2 class="section-title">Despre mine</h2>
            <div class="about-content">
                <div class="about-text">
                    <p>${formData.description.replace(/\n/g, '<br>')}</p>
                    ${formData.languages ? `
                    <div class="languages">
                        <p><strong>Limbi vorbite:</strong> ${formData.languages}</p>
                    </div>
                    ` : ''}
                </div>
                <div class="photo-container">
                    ${formData.photo ? `
                    <img src="${formData.photo}" alt="${formData.name}" class="profile-photo">
                    ` : `
                    <div style="width: 250px; height: 250px; border-radius: 50%; background-color: var(--secondary); display: flex; align-items: center; justify-content: center; margin: 0 auto; border: 5px solid white;">
                        <i class="fas fa-user-md" style="font-size: 5rem; color: var(--primary);"></i>
                    </div>
                    `}
                </div>
            </div>
        </section>
        
        <section id="servicii">
            <h2 class="section-title">Servicii oferite</h2>
            <div class="services-grid">
                ${formData.services.split('\n').map(service => `
                <div class="service-card">
                    <i class="fas fa-comments"></i>
                    <h3>${service.trim()}</h3>
                    <p>Consiliere și psihoterapie individuală adaptată nevoilor specifice. Sesiunile au loc într-un cadru confidențial și non-judgmental.</p>
                </div>
                `).join('')}
            </div>
        </section>
        
        <section id="abordari">
            <h2 class="section-title">Abordări terapeutice</h2>
            <p style="text-align: center; max-width: 800px; margin: 0 auto 30px;">
                ${formData.approaches.length > 0 ? 
                    `În practica mea terapeutică, utilizez o combinație de abordări științifice, adaptate nevoilor individuale ale fiecărui client. Principalele orientări pe care mă bazez sunt:` : 
                    'Abordarea terapeutică este adaptată nevoilor specifice ale fiecărui client, într-un cadru empatic și non-judgmental.'}
            </p>
            ${formData.approaches.length > 0 ? `
            <div class="approach-list">
                ${formData.approaches.map(approach => `
                <div class="approach-badge">${approach}</div>
                `).join('')}
            </div>
            ` : ''}
        </section>
        
        <section id="contact">
            <h2 class="section-title">Contact și programări</h2>
            <div class="contact-container">
                <p style="text-align: center; margin-bottom: 30px;">Pentru programări sau informații suplimentare, vă rugăm să mă contactați prin unul din canalele de mai jos:</p>
                
                <div class="contact-info">
                    ${formData.contact.split('\n').map(contactLine => `
                    <div class="contact-item">
                        <i class="fas fa-envelope"></i>
                        <span>${contactLine.trim()}</span>
                    </div>
                    `).join('')}
                </div>
                
                <p style="margin-top: 30px; padding: 20px; background-color: var(--light); border-radius: 8px; text-align: center;">
                    <strong>Prima consultație de evaluare</strong> durează aproximativ 50 de minute și reprezintă o oportunitate de a ne cunoaște și de a discuta despre preocupările care v-au adus în cabinet.
                </p>
            </div>
        </section>
    </main>
    
    <footer>
        <div class="container">
            <p>© ${new Date().getFullYear()} ${formData.name}. Toate drepturile rezervate.</p>
            <p style="margin-top: 10px; opacity: 0.8;">Psihoterapeut autorizat</p>
        </div>
    </footer>
    
    <script>
        // Smooth scrolling for navigation links
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            });
        });
        
        // Add active class to current section in navigation
        window.addEventListener('scroll', function() {
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('nav a');
            
            let current = '';
            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                if (scrollY >= (sectionTop - 100)) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + current) {
                    link.classList.add('active');
                }
            });
        });
    </script>
</body>
</html>`;
                
                // Create a blob and download link
                const blob = new Blob([websiteHTML], { type: 'text/html' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'index.html';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                // Show success message
                alert('Fișierul index.html a fost generat cu succes! Acum îl poți încărca pe GitHub pentru a publica website-ul.');
            }
            
            // Load sample data for testing
            function loadSampleData() {
                document.getElementById('name').value = 'Dr. Ana Popescu';
                document.getElementById('specialization').value = 'Psihoterapeut cognitiv-comportamental';
                document.getElementById('description').value = 'Sunt psihoterapeut autorizat cu peste 10 ani de experiență în domeniul sănătății mintale. Îmi dedic practica ajutării oamenilor să depășească obstacolele emoționale și să își atingă potențialul maxim. Cred într-o abordare holistică a terapiei, integrativă, adaptată nevoilor unice ale fiecărui client.';
                document.getElementById('services').value = 'Consiliere psihologică individuală\nPsihoterapie pentru anxietate și depresie\nConsiliere pentru relații și familie\nTerapie pentru managementul stresului\nConsiliere pentru dezvoltare personală';
                document.getElementById('contact').value = 'Email: ana.popescu@example.com\nTelefon: +40 721 123 456\nAdresă: Strada Exemplu nr. 10, București';
                document.getElementById('languages').value = 'Română, Engleză, Franceză';
                document.getElementById('photo').value = 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
                
                // Check some checkboxes
                document.getElementById('approach1').checked = true;
                document.getElementById('approach5').checked = true;
            }
        });
