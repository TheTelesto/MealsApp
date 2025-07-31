// Meal Planner Application
class MealPlanner {
    constructor() {
        this.meals = this.loadMeals();
        this.currentWeekPlan = {};
        this.dinnerOptions = {}; // Store multiple options per day
        this.selectedMeals = {}; // Store user's selected meals
        this.daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        this.init();
    }

    init() {
        this.renderMealGrid();
        this.renderMealsList();
        this.attachEventListeners();
        
        // Load any existing week plan
        const savedPlan = localStorage.getItem('weekPlan');
        const savedOptions = localStorage.getItem('dinnerOptions');
        const savedSelected = localStorage.getItem('selectedMeals');
        
        if (savedPlan) {
            this.currentWeekPlan = JSON.parse(savedPlan);
        }
        if (savedOptions) {
            this.dinnerOptions = JSON.parse(savedOptions);
        }
        if (savedSelected) {
            this.selectedMeals = JSON.parse(savedSelected);
        }
        
        this.renderMealGrid();
    }

    loadMeals() {
        const savedMeals = localStorage.getItem('meals');
        if (savedMeals) {
            return JSON.parse(savedMeals);
        }
        
        // Default meals to get started
        return [
            {
                id: 1,
                name: "Grilled Chicken with Rice",
                ingredients: ["Chicken breast", "Jasmine rice", "Broccoli", "Olive oil", "Garlic", "Salt", "Black pepper"]
            },
            {
                id: 2,
                name: "Spaghetti Bolognese",
                ingredients: ["Ground beef", "Spaghetti pasta", "Tomato sauce", "Onion", "Garlic", "Carrots", "Celery", "Red wine", "Parmesan cheese"]
            },
            {
                id: 3,
                name: "Salmon with Quinoa",
                ingredients: ["Salmon fillet", "Quinoa", "Asparagus", "Lemon", "Olive oil", "Dill", "Salt", "Black pepper"]
            },
            {
                id: 4,
                name: "Vegetarian Stir Fry",
                ingredients: ["Bell peppers", "Broccoli", "Carrots", "Snow peas", "Tofu", "Soy sauce", "Ginger", "Garlic", "Sesame oil", "Brown rice"]
            },
            {
                id: 5,
                name: "Beef Tacos",
                ingredients: ["Ground beef", "Taco shells", "Lettuce", "Tomatoes", "Cheese", "Sour cream", "Onion", "Avocado", "Lime", "Cumin", "Chili powder"]
            },
            {
                id: 6,
                name: "Chicken Caesar Salad",
                ingredients: ["Chicken breast", "Romaine lettuce", "Parmesan cheese", "Croutons", "Caesar dressing", "Lemon", "Black pepper"]
            },
            {
                id: 7,
                name: "Mushroom Risotto",
                ingredients: ["Arborio rice", "Mixed mushrooms", "Vegetable broth", "White wine", "Onion", "Garlic", "Parmesan cheese", "Butter", "Olive oil"]
            },
            {
                id: 8,
                name: "Fish and Chips",
                ingredients: ["White fish fillets", "Potatoes", "Flour", "Beer", "Vegetable oil", "Peas", "Tartar sauce", "Lemon"]
            }
        ];
    }

    saveMeals() {
        localStorage.setItem('meals', JSON.stringify(this.meals));
    }

    saveWeekPlan() {
        localStorage.setItem('weekPlan', JSON.stringify(this.currentWeekPlan));
        localStorage.setItem('dinnerOptions', JSON.stringify(this.dinnerOptions));
        localStorage.setItem('selectedMeals', JSON.stringify(this.selectedMeals));
    }

    attachEventListeners() {
        // Generate meal plan button
        document.getElementById('generatePlan').addEventListener('click', () => {
            this.generateRandomMealPlan();
        });

        // Generate shopping list button
        document.getElementById('generateShoppingList').addEventListener('click', () => {
            this.generateShoppingList();
        });

        // Print shopping list button
        document.getElementById('printShoppingList').addEventListener('click', () => {
            window.print();
        });

        // Add meal button and modal
        document.getElementById('addMealBtn').addEventListener('click', () => {
            this.showAddMealModal();
        });

        // Modal close buttons
        document.querySelector('.close').addEventListener('click', () => {
            this.hideAddMealModal();
        });

        document.getElementById('cancelAdd').addEventListener('click', () => {
            this.hideAddMealModal();
        });

        // Add meal form submission
        document.getElementById('addMealForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.addNewMeal();
        });

        // Close modal when clicking outside
        window.addEventListener('click', (e) => {
            const modal = document.getElementById('addMealModal');
            if (e.target === modal) {
                this.hideAddMealModal();
            }
        });
    }

    renderMealGrid() {
        const mealGrid = document.getElementById('mealGrid');
        mealGrid.innerHTML = '';

        this.daysOfWeek.forEach(day => {
            const dayCard = document.createElement('div');
            dayCard.className = 'day-card';
            
            if (day === 'Wednesday') {
                dayCard.innerHTML = `
                    <h3>${day}</h3>
                    <div class="no-meal">No dinner planned</div>
                `;
            } else {
                const dayOptions = this.dinnerOptions[day] || [];
                const selectedMeal = this.selectedMeals[day];
                
                let content = `<h3>${day}</h3>`;
                
                if (dayOptions.length > 0) {
                    content += '<div class="meal-options">';
                    dayOptions.forEach((meal, index) => {
                        const isSelected = selectedMeal && selectedMeal.id === meal.id;
                        content += `
                            <div class="meal-option ${isSelected ? 'selected' : ''}" data-day="${day}" data-meal-id="${meal.id}">
                                <div class="meal-option-header">
                                    <div class="meal-name">${meal.name}</div>
                                    <button class="select-btn ${isSelected ? 'selected' : ''}" onclick="mealPlanner.selectMeal('${day}', ${meal.id})">
                                        ${isSelected ? '✓ Selected' : 'Select'}
                                    </button>
                                </div>
                                <div class="meal-ingredients">${meal.ingredients.join(', ')}</div>
                            </div>
                        `;
                    });
                    content += '</div>';
                } else {
                    content += '<div class="no-meal">No dinner options generated</div>';
                }
                
                dayCard.innerHTML = content;
            }
            
            mealGrid.appendChild(dayCard);
        });
    }

    generateRandomMealPlan() {
        if (this.meals.length === 0) {
            alert('Please add some meals first!');
            return;
        }

        this.dinnerOptions = {};
        this.selectedMeals = {};
        this.currentWeekPlan = {};
        
        this.daysOfWeek.forEach(day => {
            // Skip Wednesday - no dinner planned
            if (day === 'Wednesday') {
                this.dinnerOptions[day] = [];
                return;
            }
            
            // Generate 2 different dinner options per day
            const dayOptions = [];
            const availableMeals = [...this.meals]; // Create a copy
            
            for (let i = 0; i < 2 && availableMeals.length > 0; i++) {
                const randomIndex = Math.floor(Math.random() * availableMeals.length);
                const selectedMeal = availableMeals.splice(randomIndex, 1)[0]; // Remove to avoid duplicates
                dayOptions.push(selectedMeal);
            }
            
            this.dinnerOptions[day] = dayOptions;
        });

        this.saveWeekPlan();
        this.renderMealGrid();
        
        // Show success message
        this.showNotification('Dinner options generated! Select your preferred meals.', 'success');
    }

    selectMeal(day, mealId) {
        // Find the meal from the options
        const dayOptions = this.dinnerOptions[day] || [];
        const selectedMeal = dayOptions.find(meal => meal.id === mealId);
        
        if (selectedMeal) {
            this.selectedMeals[day] = selectedMeal;
            this.currentWeekPlan[day] = [selectedMeal]; // Update current week plan
            this.saveWeekPlan();
            this.renderMealGrid();
            
            this.showNotification(`${selectedMeal.name} selected for ${day}!`, 'success');
        }
    }

    generateShoppingList() {
        // Check if user has selected meals
        const selectedMealsList = Object.values(this.selectedMeals).filter(meal => meal !== null && meal !== undefined);
        if (selectedMealsList.length === 0) {
            alert('Please select your preferred dinner options first!');
            return;
        }

        // Collect ingredients from selected meals only
        const allIngredients = [];
        Object.entries(this.selectedMeals).forEach(([day, meal]) => {
            if (day !== 'Wednesday' && meal && meal.ingredients) {
                allIngredients.push(...meal.ingredients);
            }
        });

        if (allIngredients.length === 0) {
            alert('No meals selected to generate shopping list!');
            return;
        }

        // Create a Set to eliminate duplicates, then convert back to array
        const uniqueIngredients = [...new Set(allIngredients.map(ingredient => ingredient.toLowerCase().trim()))];

        // Count how many times each ingredient appears (for display purposes)
        const ingredientCounts = {};
        allIngredients.forEach(ingredient => {
            const normalizedIngredient = ingredient.toLowerCase().trim();
            ingredientCounts[normalizedIngredient] = (ingredientCounts[normalizedIngredient] || 0) + 1;
        });

        // Categorize ingredients
        const categories = this.categorizeIngredients(ingredientCounts);
        
        this.renderShoppingList(categories);
        
        // Show print button
        document.getElementById('printShoppingList').style.display = 'block';
        
        this.showNotification('Shopping list generated!', 'success');
    }

    categorizeIngredients(ingredientCounts) {
        const categories = {
            'Proteins': [],
            'Vegetables': [],
            'Pantry & Staples': [],
            'Dairy': [],
            'Other': []
        };

        const categoryKeywords = {
            'Proteins': ['chicken', 'beef', 'fish', 'salmon', 'tofu', 'turkey', 'pork', 'eggs', 'beans', 'ground'],
            'Vegetables': ['broccoli', 'carrots', 'lettuce', 'tomatoes', 'onion', 'garlic', 'peppers', 'asparagus', 'mushrooms', 'celery', 'peas', 'avocado', 'bell'],
            'Dairy': ['cheese', 'milk', 'butter', 'cream', 'yogurt', 'sour cream', 'parmesan'],
            'Pantry & Staples': ['rice', 'pasta', 'flour', 'oil', 'salt', 'pepper', 'sauce', 'wine', 'vinegar', 'spices', 'quinoa', 'bread', 'shells', 'soy sauce', 'sesame', 'cumin', 'chili', 'dressing', 'broth']
        };

        // Create a set to track already processed ingredients to avoid duplicates
        const processedIngredients = new Set();

        Object.entries(ingredientCounts).forEach(([ingredient, count]) => {
            // Skip if already processed (shouldn't happen with our new logic, but extra safety)
            if (processedIngredients.has(ingredient)) {
                return;
            }
            processedIngredients.add(ingredient);
            
            let categorized = false;
            
            for (const [category, keywords] of Object.entries(categoryKeywords)) {
                if (keywords.some(keyword => ingredient.includes(keyword))) {
                    // Only show count if greater than 1, and format nicely
                    const displayText = count > 1 
                        ? `${this.capitalizeFirst(ingredient)} (${count} needed)` 
                        : this.capitalizeFirst(ingredient);
                    categories[category].push(displayText);
                    categorized = true;
                    break;
                }
            }
            
            if (!categorized) {
                const displayText = count > 1 
                    ? `${this.capitalizeFirst(ingredient)} (${count} needed)` 
                    : this.capitalizeFirst(ingredient);
                categories['Other'].push(displayText);
            }
        });

        // Remove empty categories and sort items within each category
        Object.keys(categories).forEach(category => {
            if (categories[category].length === 0) {
                delete categories[category];
            } else {
                // Sort alphabetically within each category
                categories[category].sort();
            }
        });

        return categories;
    }

    renderShoppingList(categories) {
        const shoppingList = document.getElementById('shoppingList');
        
        if (Object.keys(categories).length === 0) {
            shoppingList.innerHTML = '<p class="empty-state">No ingredients found</p>';
            return;
        }

        let html = '';
        Object.entries(categories).forEach(([category, items]) => {
            html += `
                <div class="shopping-category">
                    <h4>${category}</h4>
                    <div class="ingredient-list">
                        ${items.map(item => `<div class="ingredient-item">${item}</div>`).join('')}
                    </div>
                </div>
            `;
        });

        shoppingList.innerHTML = html;
    }

    renderMealsList() {
        const mealsList = document.getElementById('mealsList');
        
        if (this.meals.length === 0) {
            mealsList.innerHTML = '<p class="empty-state">No meals added yet. Add your first meal to get started!</p>';
            return;
        }

        mealsList.innerHTML = this.meals.map(meal => `
            <div class="meal-card">
                <div class="meal-card-header">
                    <h4>${meal.name}</h4>
                    <button class="btn btn-danger" onclick="mealPlanner.deleteMeal(${meal.id})">Delete</button>
                </div>
                <div class="meal-card-ingredients">
                    <ul>
                        ${meal.ingredients.map(ingredient => `<li>${ingredient}</li>`).join('')}
                    </ul>
                </div>
            </div>
        `).join('');
    }

    showAddMealModal() {
        document.getElementById('addMealModal').style.display = 'block';
        document.getElementById('mealName').focus();
    }

    hideAddMealModal() {
        document.getElementById('addMealModal').style.display = 'none';
        document.getElementById('addMealForm').reset();
    }

    addNewMeal() {
        const name = document.getElementById('mealName').value.trim();
        const ingredientsText = document.getElementById('mealIngredients').value.trim();
        
        if (!name || !ingredientsText) {
            alert('Please fill in all fields');
            return;
        }

        const ingredients = ingredientsText.split('\n')
            .map(ingredient => ingredient.trim())
            .filter(ingredient => ingredient.length > 0);

        if (ingredients.length === 0) {
            alert('Please add at least one ingredient');
            return;
        }

        const newMeal = {
            id: Date.now(), // Simple ID generation
            name: name,
            ingredients: ingredients
        };

        this.meals.push(newMeal);
        this.saveMeals();
        this.renderMealsList();
        this.hideAddMealModal();
        
        this.showNotification(`"${name}" added successfully!`, 'success');
    }

    deleteMeal(mealId) {
        if (confirm('Are you sure you want to delete this meal?')) {
            this.meals = this.meals.filter(meal => meal.id !== mealId);
            this.saveMeals();
            this.renderMealsList();
            
            // Remove from current week plan if it exists
            Object.keys(this.currentWeekPlan).forEach(day => {
                this.currentWeekPlan[day] = this.currentWeekPlan[day].filter(meal => meal.id !== mealId);
            });
            this.saveWeekPlan();
            this.renderMealGrid();
            
            this.showNotification('Meal deleted successfully!', 'success');
        }
    }

    capitalizeFirst(str) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : '#667eea'};
            color: white;
            padding: 15px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 1001;
            font-weight: 500;
            max-width: 300px;
            animation: slideInRight 0.3s ease;
        `;
        notification.textContent = message;

        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
        `;
        document.head.appendChild(style);

        document.body.appendChild(notification);

        // Remove notification after 3 seconds
        setTimeout(() => {
            notification.style.animation = 'slideInRight 0.3s ease reverse';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }
}

// Initialize the application when the page loads
let mealPlanner;
document.addEventListener('DOMContentLoaded', () => {
    mealPlanner = new MealPlanner();
});
