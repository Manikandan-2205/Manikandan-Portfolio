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
    const filePath = "Data/about.txt"; 

    $.get(filePath, function (data) {
        const rows = data.split("\n"); 
        let htmlContent = "";

        rows.forEach((row, index) => {
            
            if (index === 0) return;

            const columns = row.split(","); 
            if (columns.length > 1) {
                htmlContent += `
                        <div class="about-row">
                            <p><strong>${columns[0]}</strong>: ${columns[1]}, ${columns[2]}</p>
                        </div>`;
            }
        });

        $("#about").html(htmlContent);
    }).fail(function () {
        $("#about").html("<p class='error-message'>Error loading data. Please try again.</p>");
    });
});
