<?php

namespace Database\Seeders;

use App\Models\Project;
use Illuminate\Database\Seeder;

class ProjectSeeder extends Seeder
{
    public function run(): void
    {
        Project::create([
            'title' => 'Personal Portfolio Website',
            'description' => 'A modern, responsive portfolio website built with Laravel, Inertia.js, and React.',
            'markdown_content' => "# Personal Portfolio Website\n\nA modern, responsive portfolio website showcasing my skills and projects. Built with cutting-edge technologies for optimal performance and user experience.\n\n## Features\n\n- **Responsive Design** - Works perfectly on all devices\n- **Dark/Light Mode** - Automatic theme switching\n- **Blog System** - Markdown support for content creation\n- **Project Showcase** - Detailed project presentations\n- **Search Functionality** - Global search across all content\n- **Admin Panel** - Easy content management\n\n## Technology Stack\n\n- **Backend**: Laravel 11 with PHP 8.2+\n- **Frontend**: React 18 with TypeScript\n- **Styling**: Tailwind CSS with custom design system\n- **Database**: MySQL with optimized queries\n- **Deployment**: Docker with automated CI/CD\n\n## Key Achievements\n\n- **Performance**: 95+ Lighthouse score\n- **Accessibility**: WCAG 2.1 AA compliant\n- **SEO**: Optimized for search engines\n- **Security**: OWASP security best practices\n\n## Development Process\n\nThis project was developed using modern development practices:\n\n1. **Planning** - Detailed requirements and wireframes\n2. **Design** - Custom design system with Tailwind CSS\n3. **Development** - Agile methodology with regular iterations\n4. **Testing** - Comprehensive testing suite\n5. **Deployment** - Automated deployment pipeline",
            'technologies' => ['Laravel', 'React', 'TypeScript', 'Tailwind CSS', 'MySQL', 'Docker'],
            'image' => null,
            'live_url' => 'https://example.com',
            'github_url' => 'https://github.com/example/portfolio',
            'is_featured' => true,
            'sort_order' => 1,
        ]);

        Project::create([
            'title' => 'E-commerce Platform',
            'description' => 'A full-featured e-commerce solution with payment processing and inventory management.',
            'markdown_content' => "# E-commerce Platform\n\nA comprehensive e-commerce solution designed for scalability and performance. Features advanced inventory management, payment processing, and customer analytics.\n\n## Core Features\n\n- **Product Management** - Advanced catalog with variants\n- **Order Processing** - Complete order lifecycle management\n- **Payment Integration** - Multiple payment gateways\n- **Inventory Control** - Real-time stock management\n- **Customer Management** - User accounts and preferences\n- **Analytics Dashboard** - Sales and performance metrics\n\n## Technical Architecture\n\n### Backend Services\n- **API Gateway** - Centralized request handling\n- **Product Service** - Catalog and inventory management\n- **Order Service** - Order processing and fulfillment\n- **Payment Service** - Secure payment processing\n- **Notification Service** - Email and SMS notifications\n\n### Database Design\n```sql\n-- Optimized schema for high performance\nCREATE TABLE products (\n  id BIGINT PRIMARY KEY,\n  name VARCHAR(255),\n  sku VARCHAR(100) UNIQUE,\n  price DECIMAL(10,2),\n  stock_quantity INT\n);\n```\n\n## Performance Optimizations\n\n- **Caching Strategy** - Redis for session and product data\n- **Database Optimization** - Proper indexing and query optimization\n- **CDN Integration** - Global content delivery\n- **Image Optimization** - Automatic compression and resizing\n\n## Security Features\n\n- **PCI Compliance** - Secure payment processing\n- **Data Encryption** - End-to-end data protection\n- **Rate Limiting** - Protection against abuse\n- **Audit Logging** - Complete activity tracking",
            'technologies' => ['Laravel', 'Vue.js', 'PostgreSQL', 'Redis', 'Stripe', 'AWS'],
            'image' => null,
            'live_url' => 'https://shop.example.com',
            'github_url' => 'https://github.com/example/ecommerce',
            'is_featured' => true,
            'sort_order' => 2,
        ]);

        Project::create([
            'title' => 'Task Management System',
            'description' => 'A collaborative task management application with real-time updates and team collaboration features.',
            'markdown_content' => "# Task Management System\n\nA collaborative task management application designed for teams to organize, track, and complete projects efficiently. Features real-time updates and advanced collaboration tools.\n\n## Key Features\n\n- **Task Organization** - Hierarchical task structure\n- **Team Collaboration** - Real-time updates and notifications\n- **Progress Tracking** - Visual progress indicators\n- **File Management** - Document sharing and version control\n- **Time Tracking** - Built-in time logging\n- **Reporting** - Comprehensive project analytics\n\n## User Experience\n\n### Dashboard\n- **Overview** - Project status at a glance\n- **My Tasks** - Personalized task list\n- **Team Activity** - Recent team updates\n- **Quick Actions** - Fast task creation and updates\n\n### Task Management\n- **Kanban Board** - Visual task organization\n- **List View** - Detailed task information\n- **Calendar View** - Timeline-based planning\n- **Gantt Charts** - Project timeline visualization\n\n## Technical Implementation\n\n### Real-time Features\n```javascript\n// WebSocket integration for live updates\nconst socket = new WebSocket('ws://app.example.com');\nsocket.onmessage = (event) => {\n  const update = JSON.parse(event.data);\n  updateTaskInRealTime(update);\n};\n```\n\n### Database Schema\n- **Optimized queries** for large datasets\n- **Efficient indexing** for fast searches\n- **Data partitioning** for scalability\n\n## Integration Capabilities\n\n- **API Access** - RESTful API for third-party integration\n- **Webhook Support** - Real-time notifications\n- **Import/Export** - Data portability\n- **Mobile Apps** - Native iOS and Android applications",
            'technologies' => ['Node.js', 'React', 'Socket.io', 'MongoDB', 'Redis', 'Docker'],
            'image' => null,
            'live_url' => 'https://tasks.example.com',
            'github_url' => 'https://github.com/example/taskmanager',
            'is_featured' => false,
            'sort_order' => 3,
        ]);

        Project::create([
            'title' => 'API Gateway Service',
            'description' => 'A microservices API gateway with authentication, rate limiting, and request routing.',
            'markdown_content' => "# API Gateway Service\n\nA high-performance API gateway designed for microservices architecture. Provides centralized authentication, rate limiting, request routing, and monitoring capabilities.\n\n## Architecture Overview\n\n### Core Components\n- **Authentication Service** - JWT token validation\n- **Rate Limiter** - Configurable rate limiting per endpoint\n- **Load Balancer** - Intelligent request distribution\n- **Circuit Breaker** - Fault tolerance and resilience\n- **Monitoring** - Real-time metrics and logging\n\n## Key Features\n\n### Security\n- **JWT Authentication** - Secure token-based auth\n- **API Key Management** - Developer access control\n- **Request Validation** - Input sanitization and validation\n- **CORS Management** - Cross-origin request handling\n\n### Performance\n- **Caching Layer** - Redis-based response caching\n- **Connection Pooling** - Efficient resource management\n- **Compression** - Gzip response compression\n- **Load Balancing** - Round-robin and weighted distribution\n\n## Configuration\n\n```yaml\n# Example configuration\nservices:\n  auth:\n    url: http://auth-service:3001\n    timeout: 5000\n  \n  users:\n    url: http://user-service:3002\n    timeout: 3000\n    rate_limit: 1000\n\nrate_limiting:\n  default: 1000\n  burst: 2000\n  window: 3600\n```\n\n## Monitoring & Analytics\n\n- **Request Metrics** - Response times and throughput\n- **Error Tracking** - Detailed error logging\n- **Performance Alerts** - Automated monitoring\n- **Usage Analytics** - API consumption patterns\n\n## Deployment\n\n- **Docker Containers** - Easy deployment and scaling\n- **Kubernetes** - Orchestration and management\n- **Health Checks** - Automated health monitoring\n- **Auto-scaling** - Dynamic resource allocation",
            'technologies' => ['Node.js', 'Express', 'Redis', 'Docker', 'Kubernetes', 'Prometheus'],
            'image' => null,
            'live_url' => 'https://api.example.com',
            'github_url' => 'https://github.com/example/api-gateway',
            'is_featured' => false,
            'sort_order' => 4,
        ]);
    }
}
