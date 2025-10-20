// API Base URL
const API_BASE_URL = 'http://localhost:5000/api';

// Auth functions
class Auth {
    static async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: 'Network error occurred' };
        }
    }

    static async register(userData) {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (data.success) {
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', JSON.stringify(data.user));
                return { success: true, user: data.user };
            } else {
                return { success: false, message: data.message };
            }
        } catch (error) {
            return { success: false, message: 'Network error occurred' };
        }
    }

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = 'index.html';
    }

    static getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    }

    static isAuthenticated() {
        return localStorage.getItem('token') !== null;
    }

    static getToken() {
        return localStorage.getItem('token');
    }
}

// Course functions
class CourseAPI {
    static async getAllCourses() {
        try {
            const response = await fetch(`${API_BASE_URL}/courses`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching courses:', error);
            return { success: false, message: 'Failed to fetch courses' };
        }
    }

    static async getCourse(id) {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${id}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching course:', error);
            return { success: false, message: 'Failed to fetch course' };
        }
    }

    static async createCourse(courseData) {
        try {
            const token = Auth.getToken();
            const formData = new FormData();
            
            // Append all course data to formData
            Object.keys(courseData).forEach(key => {
                if (key === 'thumbnail' && courseData[key] instanceof File) {
                    formData.append('thumbnail', courseData[key]);
                } else {
                    formData.append(key, courseData[key]);
                }
            });

            const response = await fetch(`${API_BASE_URL}/courses`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error creating course:', error);
            return { success: false, message: 'Failed to create course' };
        }
    }

    static async enrollCourse(courseId) {
        try {
            const token = Auth.getToken();
            const response = await fetch(`${API_BASE_URL}/courses/${courseId}/enroll`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error enrolling in course:', error);
            return { success: false, message: 'Failed to enroll in course' };
        }
    }
}

// Video functions
class VideoAPI {
    static async getVideos(courseId) {
        try {
            const response = await fetch(`${API_BASE_URL}/courses/${courseId}/videos`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching videos:', error);
            return { success: false, message: 'Failed to fetch videos' };
        }
    }

    static async uploadVideo(courseId, videoData) {
        try {
            const token = Auth.getToken();
            const formData = new FormData();
            formData.append('video', videoData.videoFile);
            formData.append('title', videoData.title);
            formData.append('description', videoData.description);
            formData.append('order', videoData.order);

            const response = await fetch(`${API_BASE_URL}/courses/${courseId}/videos`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
                body: formData,
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error uploading video:', error);
            return { success: false, message: 'Failed to upload video' };
        }
    }
}

// User functions
class UserAPI {
    static async getProfile() {
        try {
            const token = Auth.getToken();
            const response = await fetch(`${API_BASE_URL}/users/profile`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching profile:', error);
            return { success: false, message: 'Failed to fetch profile' };
        }
    }

    static async getEnrolledCourses() {
        try {
            const token = Auth.getToken();
            const response = await fetch(`${API_BASE_URL}/users/enrolled-courses`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
            return { success: false, message: 'Failed to fetch enrolled courses' };
        }
    }

    static async getMyCourses() {
        try {
            const token = Auth.getToken();
            const response = await fetch(`${API_BASE_URL}/users/my-courses`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching my courses:', error);
            return { success: false, message: 'Failed to fetch my courses' };
        }
    }
}

// UI Functions
class UI {
    static showAlert(message, type = 'success') {
        const alertDiv = document.createElement('div');
        alertDiv.className = `alert alert-${type}`;
        alertDiv.textContent = message;
        alertDiv.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 2rem;
            border-radius: 8px;
            color: white;
            font-weight: 600;
            z-index: 10000;
            background: ${type === 'success' ? '#10b981' : '#ef4444'};
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        `;

        document.body.appendChild(alertDiv);

        setTimeout(() => {
            alertDiv.remove();
        }, 3000);
    }

    static updateAuthButtons() {
        const authButtons = document.querySelector('.auth-buttons');
        if (!authButtons) return;

        if (Auth.isAuthenticated()) {
            const user = Auth.getCurrentUser();
            authButtons.innerHTML = `
                <span style="color: #64748b; margin-right: 1rem;">
                    <i class="fas fa-user"></i> ${user.name}
                </span>
                <a href="#" class="btn btn-outline" id="logoutBtn">
                    <i class="fas fa-sign-out-alt"></i> Logout
                </a>
            `;

            document.getElementById('logoutBtn').addEventListener('click', (e) => {
                e.preventDefault();
                Auth.logout();
            });
        }
    }

    static loadCourses() {
        const coursesGrid = document.getElementById('coursesGrid');
        if (!coursesGrid) return;

        CourseAPI.getAllCourses().then(data => {
            if (data.success) {
                this.renderCourses(data.data, coursesGrid);
            } else {
                coursesGrid.innerHTML = '<p>Error loading courses</p>';
            }
        });
    }

    static renderCourses(courses, container) {
        container.innerHTML = courses.map(course => `
            <div class="course-card fade-in">
                <div class="course-badge">${course.studentsEnrolled > 1000 ? 'Bestseller' : 'New'}</div>
                <img src="/uploads/thumbnails/${course.thumbnail}" alt="${course.title}" class="course-img" onerror="this.src='https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'">
                <div class="course-content">
                    <h3>${course.title}</h3>
                    <p>${course.description}</p>
                    <div class="course-meta">
                        <span><i class="fas fa-star"></i> ${course.rating.toFixed(1)} (${Math.floor(course.studentsEnrolled * 0.8)})</span>
                        <span><i class="fas fa-clock"></i> ${course.duration} hours</span>
                    </div>
                    <div class="course-price">$${course.price}</div>
                    <div class="course-actions">
                        <button class="btn btn-primary enroll-btn" data-course-id="${course._id}">
                            <i class="fas fa-shopping-cart"></i> Enroll
                        </button>
                        <button class="btn btn-outline preview-btn" data-course-id="${course._id}">
                            <i class="fas fa-play-circle"></i> Preview
                        </button>
                    </div>
                </div>
            </div>
        `).join('');

        // Add event listeners
        container.querySelectorAll('.enroll-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const courseId = e.target.dataset.courseId;
                this.handleEnroll(courseId);
            });
        });
    }

    static async handleEnroll(courseId) {
        if (!Auth.isAuthenticated()) {
            window.location.href = 'pages/login.html';
            return;
        }

        const result = await CourseAPI.enrollCourse(courseId);
        if (result.success) {
            this.showAlert('Successfully enrolled in course!');
        } else {
            this.showAlert(result.message, 'error');
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Update auth buttons
    UI.updateAuthButtons();

    // Load courses if on courses page
    if (window.location.pathname.includes('courses.html')) {
        UI.loadCourses();
    }

    // Video upload form handling
    const videoUploadForm = document.getElementById('videoUploadForm');
    if (videoUploadForm) {
        videoUploadForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            if (!Auth.isAuthenticated()) {
                UI.showAlert('Please login to upload courses', 'error');
                return;
            }

            const courseData = {
                title: document.getElementById('courseTitle').value,
                description: document.getElementById('courseDescription').value,
                category: document.getElementById('courseCategory').value,
                price: parseFloat(document.getElementById('coursePrice').value),
                duration: 10, // Default duration
                level: 'beginner'
            };

            const thumbnailFile = document.getElementById('courseThumbnail').files[0];
            if (thumbnailFile) {
                courseData.thumbnail = thumbnailFile;
            }

            const result = await CourseAPI.createCourse(courseData);
            if (result.success) {
                UI.showAlert('Course created successfully!');
                videoUploadForm.reset();
                document.getElementById('videoPreview').style.display = 'none';
            } else {
                UI.showAlert(result.message, 'error');
            }
        });
    }

    // Video preview functionality
    const courseVideosInput = document.getElementById('courseVideos');
    if (courseVideosInput) {
        courseVideosInput.addEventListener('change', function(e) {
            const file = this.files[0];
            if (file) {
                const videoPreview = document.getElementById('videoPreview');
                const videoElement = videoPreview.querySelector('video');
                const videoURL = URL.createObjectURL(file);
                videoElement.src = videoURL;
                videoPreview.style.display = 'block';
            }
        });
    }

    // Play button functionality
    const playButton = document.querySelector('.play-button');
    if (playButton) {
        playButton.addEventListener('click', function() {
            UI.showAlert('Video playback would start here');
        });
    }

    // Scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });

    // Course cards hover effects
    document.querySelectorAll('.course-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Login form handling
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            const result = await Auth.login(email, password);
            if (result.success) {
                UI.showAlert('Login successful!');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);
            } else {
                UI.showAlert(result.message, 'error');
            }
        });
    }

    // Registration form handling
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            const userData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                password: document.getElementById('password').value,
                role: document.getElementById('role').value
            };

            const result = await Auth.register(userData);
            if (result.success) {
                UI.showAlert('Registration successful!');
                setTimeout(() => {
                    window.location.href = '../index.html';
                }, 1000);
            } else {
                UI.showAlert(result.message, 'error');
            }
        });
    }
});