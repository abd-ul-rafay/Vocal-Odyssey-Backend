# Vocal Odyssey Backend  
Using Node JS (Express) and MVC Architecture

## API Endpoints  

### Auth Routes  
**POST** `/api/v1/auth/login` - User login  

**POST** `/api/v1/auth/signup` - User registration  

**POST** `/api/v1/auth/google-signin` - Google authentication  

**POST** `/api/v1/auth/recover-password` - Password recovery  

### Supervisor Routes  
**GET** `/api/v1/supervisors/:id` - Get supervisor details  

**PUT** `/api/v1/supervisors/:id` - Update supervisor  

**DELETE** `/api/v1/supervisors/:id` - Delete supervisor  

### Children Routes  
**GET** `/api/v1/children?supervisorId=:id` - Get all children   

**GET** `/api/v1/children/:id` - Get child details  

**POST** `/api/v1/children` - Create a child  

**PUT** `/api/v1/children/:id` - Update child  

**DELETE** `/api/v1/children/:id` - Delete child  

### Levels Routes  
**GET** `/api/v1/levels` - Get all levels  

**GET** `/api/v1/levels/:id` - Get level details  

**POST** `/api/v1/levels` - Create a new level  

**PUT** `/api/v1/levels/:id` - Update level  

**DELETE** `/api/v1/levels/:id` - Delete level  

### Progress Routes  
**GET** `/api/v1/progress?childId=:id` - Get child’s progress  

**GET** `/api/v1/progress/:id` - Get specific progress  

**POST** `/api/v1/progress` - Create a progress entry  

**PUT** `/api/v1/progress/:id` - Update progress  

### Attempt Routes  
**GET** `/api/v1/attempts?progressId=:id` - Get attempts for progress  

**GET** `/api/v1/attempts/:id` - Get attempt details  

**POST** `/api/v1/attempts?progressId=:id` - Record a new attempt  

### Admin Routes  
**GET** `/api/v1/admin/users` - Get all users  

**PUT** `/api/v1/admin/users/:id` - Update user  

**DELETE** `/api/v1/admin/users/:id` - Delete user  
