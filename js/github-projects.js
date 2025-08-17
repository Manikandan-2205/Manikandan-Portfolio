
$(document).ready(function() {
    // GitHub API to fetch repositories
    const username = 'Manikandan-2205'; // Your GitHub username
    const apiUrl = `https://api.github.com/users/${username}/repos?sort=updated&direction=desc`;
    
    // Fetch GitHub repositories
    $.get(apiUrl, function(repos) {
        const projectsContainer = $('#projects-container');
        
        if (repos.length === 0) {
            projectsContainer.append(`
                <div class="col-span-3 text-center py-8">
                    <p class="text-gray-600">No projects found on GitHub. Check back later!</p>
                </div>
            `);
            return;
        }
        
        repos.slice(0, 6).forEach(repo => {
            const description = repo.description || 'No description available.';
            const projectCard = `
                <div class="project-card">
                    <div class="project-content">
                        <h3 class="project-title">${repo.name.replace(/_/g, ' ')}</h3>
                        <p class="project-description">${description}</p>
                        <div class="project-links">
                            <a href="${repo.html_url}" target="_blank">
                                <i class="fab fa-github"></i> Code
                            </a>
                            ${repo.homepage ? `
                                <a href="${repo.homepage}" target="_blank">
                                    <i class="fas fa-external-link-alt"></i> Demo
                                </a>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
            
            projectsContainer.append(projectCard);
        });
    }).fail(function() {
        $('#projects-container').append(`
            <div class="col-span-3 text-center py-8">
                <p class="text-gray-600">Failed to load projects from GitHub. Please check my <a href="https://github.com/${username}" target="_blank" class="text-primary-color hover:underline">GitHub profile</a> directly.</p>
            </div>
        `);
    });
});
