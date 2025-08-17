 
$(document).ready(function() {
    // GitHub API to fetch repositories
    const username = 'Manikandan-2205'; // Your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;
    
    // Project descriptions (you can customize these based on your repo names)
    const projectDescriptions = {
        'Secure-RESTful-API-Flask-JWT': 'Developed a modular Flask API utilizing Flask-SQLAlchemy for ORM and JWT for secure, role-based authentication.',
        'Retail-Sales-Analysis': 'Conducted data cleaning and transformation on large retail datasets and built predictive models using scikit-learn.',
        'Web-Scraping-Data-Extraction': 'Developed web scraping scripts with BeautifulSoup to extract data from various websites.'
    };
    
    // Project technologies (map to your repos)
    const projectTechnologies = {
        'Secure-RESTful-API-Flask-JWT': ['Flask', 'JWT', 'SQLAlchemy'],
        'Retail-Sales-Analysis': ['Pandas', 'NumPy', 'scikit-learn'],
        'Web-Scraping-Data-Extraction': ['BeautifulSoup', 'SQLite', 'Automation']
    };
    
    $.get(apiUrl, function(repos) {
        const projectsContainer = $('#projects-container');
        projectsContainer.empty();
        
        // Filter and display only relevant repositories
        const relevantRepos = repos.filter(repo => 
            Object.keys(projectDescriptions).some(key => repo.name.includes(key))
        );
        
        if (relevantRepos.length === 0) {
            projectsContainer.html(`
                <div class="col-span-3 text-center py-8">
                    <p class="text-gray-600">No projects found on GitHub. Check back later!</p>
                </div>
            `);
            return;
        }
        
        relevantRepos.slice(0, 6).forEach(repo => {
            // Find matching project description and technologies
            const projectKey = Object.keys(projectDescriptions).find(key => repo.name.includes(key));
            const description = projectDescriptions[projectKey] || repo.description || 'A personal project showcasing my skills.';
            const technologies = projectTechnologies[projectKey] || [];
            
            const projectCard = `
                <div class="project-card bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <div class="h-48 bg-gray-200 flex items-center justify-center">
                        <i class="fas fa-code text-4xl text-gray-400"></i>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-semibold text-gray-800 mb-2">${repo.name.replace(/-/g, ' ')}</h3>
                        <p class="text-gray-600 mb-4">${description}</p>
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')}
                        </div>
                        <div class="flex space-x-3">
                            <a href="${repo.html_url}" target="_blank" class="btn-primary flex-1 text-center">
                                <i class="fab fa-github mr-2"></i> Code
                            </a>
                            ${repo.homepage ? `
                                <a href="${repo.homepage}" target="_blank" class="btn-secondary flex-1 text-center">
                                    <i class="fas fa-external-link-alt mr-2"></i> Demo
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
            
            projectsContainer.append(projectCard);
        });
    }).fail(function() {
        $('#projects-container').html(`
            <div class="col-span-3 text-center py-8">
                <p class="text-gray-600">Failed to load projects from GitHub. Please check my <a href="https://github.com/${username}" target="_blank" class="text-indigo-600 hover:underline">GitHub profile</a> directly.</p>
            </div>
        `);
    });
});