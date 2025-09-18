// Elite Muscle Gain Program - JavaScript Functions

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the application
    initializeApp();
});

function initializeApp() {
    // Add smooth scrolling to all internal links
    addSmoothScrolling();
    
    // Add click tracking for video links
    trackVideoClicks();
    
    // Add workout completion tracking
    addWorkoutTracking();
    
    // Add print functionality
    addPrintFunctionality();
    
    // Add progress tracking
    initializeProgressTracking();
    
    console.log('Elite Muscle Gain Program initialized successfully!');
}

// Smooth scrolling for internal links
function addSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Track video link clicks for analytics
function trackVideoClicks() {
    const videoLinks = document.querySelectorAll('.video-link');
    
    videoLinks.forEach(link => {
        link.addEventListener('click', function() {
            const exerciseName = this.closest('.exercise').querySelector('.exercise-name').textContent.trim();
            console.log(`Video clicked for: ${exerciseName}`);
            
            // You can add analytics tracking here
            // Example: gtag('event', 'video_click', { exercise_name: exerciseName });
        });
    });
}

// Workout completion tracking
function addWorkoutTracking() {
    // Add checkboxes to exercises for tracking completion
    const exercises = document.querySelectorAll('.exercise');
    
    exercises.forEach((exercise, index) => {
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.id = `exercise-${index}`;
        checkbox.className = 'exercise-checkbox';
        checkbox.style.marginRight = '10px';
        
        const label = document.createElement('label');
        label.htmlFor = `exercise-${index}`;
        label.textContent = 'Completed';
        label.style.fontSize = '0.8rem';
        label.style.color = '#6b7280';
        label.style.cursor = 'pointer';
        
        const completionDiv = document.createElement('div');
        completionDiv.className = 'exercise-completion';
        completionDiv.style.marginTop = '8px';
        completionDiv.appendChild(checkbox);
        completionDiv.appendChild(label);
        
        exercise.appendChild(completionDiv);
        
        // Add change event listener
        checkbox.addEventListener('change', function() {
            if (this.checked) {
                exercise.style.backgroundColor = '#f0fdf4';
                exercise.style.borderColor = '#22c55e';
                label.style.color = '#16a34a';
                label.textContent = '✓ Completed';
            } else {
                exercise.style.backgroundColor = '';
                exercise.style.borderColor = '';
                label.style.color = '#6b7280';
                label.textContent = 'Completed';
            }
            
            // Save to localStorage
            saveWorkoutProgress();
        });
    });
    
    // Load saved progress
    loadWorkoutProgress();
}

// Save workout progress to localStorage
function saveWorkoutProgress() {
    const checkboxes = document.querySelectorAll('.exercise-checkbox');
    const progress = {};
    
    checkboxes.forEach((checkbox, index) => {
        progress[`exercise-${index}`] = checkbox.checked;
    });
    
    localStorage.setItem('workoutProgress', JSON.stringify(progress));
    
    // Update completion percentage
    updateCompletionStats();
}

// Load workout progress from localStorage
function loadWorkoutProgress() {
    const savedProgress = localStorage.getItem('workoutProgress');
    
    if (savedProgress) {
        const progress = JSON.parse(savedProgress);
        
        Object.keys(progress).forEach(exerciseId => {
            const checkbox = document.getElementById(exerciseId);
            if (checkbox) {
                checkbox.checked = progress[exerciseId];
                checkbox.dispatchEvent(new Event('change'));
            }
        });
    }
}

// Update completion statistics
function updateCompletionStats() {
    const checkboxes = document.querySelectorAll('.exercise-checkbox');
    const completed = document.querySelectorAll('.exercise-checkbox:checked').length;
    const total = checkboxes.length;
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    // Create or update stats display
    let statsDiv = document.querySelector('.completion-stats');
    if (!statsDiv) {
        statsDiv = document.createElement('div');
        statsDiv.className = 'completion-stats';
        statsDiv.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #4f46e5;
            color: white;
            padding: 10px 15px;
            border-radius: 8px;
            font-size: 0.9rem;
            font-weight: 600;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            z-index: 1000;
        `;
        document.body.appendChild(statsDiv);
    }
    
    statsDiv.textContent = `Progress: ${completed}/${total} (${percentage}%)`;
    
    if (percentage === 100) {
        statsDiv.style.background = '#22c55e';
        statsDiv.textContent = '🎉 Workout Complete!';
    }
}

// Add print functionality
function addPrintFunctionality() {
    // Create print button
    const printButton = document.createElement('button');
    printButton.textContent = '🖨️ Print Workout';
    printButton.className = 'print-button';
    printButton.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: #4f46e5;
        color: white;
        border: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-size: 0.9rem;
        font-weight: 600;
        cursor: pointer;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        transition: all 0.2s ease;
    `;
    
    printButton.addEventListener('click', function() {
        window.print();
    });
    
    printButton.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
    });
    
    printButton.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    });
    
    document.body.appendChild(printButton);
}

// Initialize progress tracking
function initializeProgressTracking() {
    // Add weight tracking inputs to exercises
    const exercises = document.querySelectorAll('.exercise');
    
    exercises.forEach((exercise, index) => {
        const exerciseName = exercise.querySelector('.exercise-name').textContent.trim();
        
        // Skip abs exercises and cardio
        if (exerciseName.toLowerCase().includes('abs') || 
            exerciseName.toLowerCase().includes('cardio') ||
            exerciseName.toLowerCase().includes('mountain climbers') ||
            exerciseName.toLowerCase().includes('russian twists') ||
            exerciseName.toLowerCase().includes('dead bug') ||
            exerciseName.toLowerCase().includes('plank')) {
            return;
        }
        
        const trackingDiv = document.createElement('div');
        trackingDiv.className = 'weight-tracking';
        trackingDiv.style.cssText = `
            margin-top: 10px;
            padding: 8px;
            background: #f8fafc;
            border-radius: 4px;
            font-size: 0.8rem;
        `;
        
        const weightInput = document.createElement('input');
        weightInput.type = 'number';
        weightInput.placeholder = 'Weight (kg)';
        weightInput.style.cssText = `
            width: 80px;
            padding: 4px;
            margin-right: 10px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
        `;
        
        const repsInput = document.createElement('input');
        repsInput.type = 'number';
        repsInput.placeholder = 'Reps';
        repsInput.style.cssText = `
            width: 60px;
            padding: 4px;
            margin-right: 10px;
            border: 1px solid #d1d5db;
            border-radius: 4px;
        `;
        
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';
        saveButton.style.cssText = `
            padding: 4px 8px;
            background: #4f46e5;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.8rem;
        `;
        
        trackingDiv.appendChild(weightInput);
        trackingDiv.appendChild(repsInput);
        trackingDiv.appendChild(saveButton);
        
        exercise.appendChild(trackingDiv);
        
        // Load saved data
        const savedData = localStorage.getItem(`exercise-data-${index}`);
        if (savedData) {
            const data = JSON.parse(savedData);
            weightInput.value = data.weight || '';
            repsInput.value = data.reps || '';
        }
        
        // Save data on button click
        saveButton.addEventListener('click', function() {
            const data = {
                weight: weightInput.value,
                reps: repsInput.value,
                date: new Date().toISOString().split('T')[0]
            };
            
            localStorage.setItem(`exercise-data-${index}`, JSON.stringify(data));
            
            // Visual feedback
            saveButton.textContent = '✓ Saved';
            saveButton.style.background = '#22c55e';
            
            setTimeout(() => {
                saveButton.textContent = 'Save';
                saveButton.style.background = '#4f46e5';
            }, 1000);
        });
    });
}

// Utility function to clear all progress
function clearAllProgress() {
    if (confirm('Are you sure you want to clear all workout progress?')) {
        localStorage.clear();
        location.reload();
    }
}

// Add clear progress button (for development/testing)
function addClearProgressButton() {
    const clearButton = document.createElement('button');
    clearButton.textContent = '🗑️ Clear Progress';
    clearButton.style.cssText = `
        position: fixed;
        bottom: 80px;
        right: 20px;
        background: #ef4444;
        color: white;
        border: none;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 0.8rem;
        cursor: pointer;
        z-index: 1000;
    `;
    
    clearButton.addEventListener('click', clearAllProgress);
    document.body.appendChild(clearButton);
}

// Export functions for external use
window.EliteMuscleGain = {
    clearAllProgress,
    saveWorkoutProgress,
    loadWorkoutProgress,
    updateCompletionStats
};

// Add development tools in development mode
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    addClearProgressButton();
}

