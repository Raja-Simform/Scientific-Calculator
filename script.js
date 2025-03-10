
const trigButton = document.querySelector('.trignometry');
trigButton.addEventListener('click', function() {
    if (!document.querySelector('.trig-dropdown')) {
        const dropdown = document.createElement('div');
        dropdown.className = 'trig-dropdown';
        dropdown.style.position = 'absolute';
        dropdown.style.backgroundColor = '#f5f5f5';
        dropdown.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
        dropdown.style.zIndex = '1';
        dropdown.style.width = '150px';
        const trigFunctions = ['sin', 'cos', 'tan'];
        trigFunctions.forEach(func => {
            const option = document.createElement('div');
            option.textContent = func;
            option.style.padding = '12px 16px';
            option.style.cursor = 'pointer';
            option.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#e7e7e7';
            });
            option.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#f5f5f5';
            });
            dropdown.appendChild(option);
        });
        const rect = trigButton.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.left = `${rect.left}px`;
        
        document.body.appendChild(dropdown);
    } else {
        document.querySelector('.trig-dropdown').remove();
    }
});
const funcButton = document.querySelector('.functions');
funcButton.addEventListener('click', function() {
    if (!document.querySelector('.func-dropdown')) {
        const dropdown = document.createElement('div');
        dropdown.className = 'func-dropdown';
        dropdown.style.position = 'absolute';
        dropdown.style.backgroundColor = '#f5f5f5';
        dropdown.style.boxShadow = '0px 8px 16px 0px rgba(0,0,0,0.2)';
        dropdown.style.zIndex = '1';
        dropdown.style.width = '150px';
        const functions = ['abs', 'floor', 'ceil', 'rand'];
        functions.forEach(func => {
            const option = document.createElement('div');
            option.textContent = func;
            option.style.padding = '12px 16px';
            option.style.cursor = 'pointer';
            option.addEventListener('mouseenter', function() {
                this.style.backgroundColor = '#e7e7e7';
            });
            option.addEventListener('mouseleave', function() {
                this.style.backgroundColor = '#f5f5f5';
            });
            dropdown.appendChild(option);
        });
        const rect = funcButton.getBoundingClientRect();
        dropdown.style.top = `${rect.bottom}px`;
        dropdown.style.left = `${rect.left}px`;
        document.body.appendChild(dropdown);
    } else {
        document.querySelector('.func-dropdown').remove();
    }
});
document.addEventListener('click', function(event) {
    const trigDropdown = document.querySelector('.trig-dropdown');
    const funcDropdown = document.querySelector('.func-dropdown');
    const trigButton = document.querySelector('.trignometry');
    const funcButton = document.querySelector('.functions');
    if (trigDropdown && event.target !== trigButton && !trigButton.contains(event.target) && !trigDropdown.contains(event.target)) {
        trigDropdown.remove();
    }
    if (funcDropdown && event.target !== funcButton && !funcButton.contains(event.target) && !funcDropdown.contains(event.target)) {
        funcDropdown.remove();
    }
});