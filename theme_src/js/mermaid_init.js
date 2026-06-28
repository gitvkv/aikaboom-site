document.addEventListener("DOMContentLoaded", function () {
    // Initialize Mermaid.js configuration
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'base',
            themeVariables: {
                fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
                fontSize: '14px',
                lineColor: '#64748b',
                arrowheadColor: '#64748b'
            }
        });
        console.log("Mermaid initialized successfully with custom visual theme.");
    }
});
