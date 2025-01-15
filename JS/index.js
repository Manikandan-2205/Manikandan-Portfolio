$(document).ready(function () {
    const savedTheme = localStorage.getItem("theme") || "light";
    $("body").addClass(savedTheme + "-mode");
    $("#themeSwitch").prop("checked", savedTheme === "dark");

    
    $("#themeSwitch").on("change", function () {
        const isDarkMode = $(this).is(":checked");
        $("body").toggleClass("dark-mode", isDarkMode);
        $("body").toggleClass("light-mode", !isDarkMode);
        localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });
});


$(document).ready(function () {
    const filePath = "Data/about.txt"; // Path to your file

    $.get(filePath, function (data) {
        let htmlContent = `
            <div class="col-12 about-section">
                <h1 class="about-title">About Me</h1>
                <p class="about-description">${data}</p>
            </div>`;

        // Populate the #about div with the content
        $("#about").html(htmlContent);
    }).fail(function () {
        // Handle file load failure
        $("#about").html("<p class='error-message'>Unable to load content. Please check the file path or content format.</p>");
    });
});

$(document).ready(function() {
    const filePath = "Data/Education.csv"; // Path to your file

    fetch(filePath)
        .then(response => response.text())
        .then(data => {
            const rows = data.split('\n').slice(1); // Skip header
            const educationContainer = $('#education');
            const timeline = $('<div class="timeline"></div>');

            rows.forEach((row, index) => {
                console.log(row)
                const columns = row.split(',');
                if (columns.length > 1) {
                    const degree = columns[1].trim();
                    const course = columns[2].trim();
                    const year = columns[3].trim();
                    const location = columns[4].trim();
                    const score = columns[5].trim();
console.log("degree:",degree);
console.log("course:",course);
console.log("year:",year);
console.log("location:",location);
console.log("score:",score);
                    const educationItem = $(`
                        <div class="timeline-item ${index % 2 === 0 ? 'left' : 'right'}">
                            <div class="year">${year}</div>
                            <div class="details">
                                <strong>${degree} (${course})</strong><br>
                                ${location}<br>
                                Score: ${score}
                            </div>
                        </div>
                    `);

                    timeline.append(educationItem);
                }
            });

            educationContainer.append(timeline);

            // Animate items on load
            setTimeout(() => {
                $('.timeline-item').each(function(index) {
                    $(this).delay(index * 200).queue(function(next) {
                        $(this).addClass('visible');
                        next();
                    });
                });
            }, 100);
        })
        .catch(error => console.error('Error fetching the CSV file:', error));

    // Theme toggle functionality
    $('#theme-toggle').click(function() {
        $('body').toggleClass('dark-mode');
        $('body').toggleClass('light-mode');
    });
});
