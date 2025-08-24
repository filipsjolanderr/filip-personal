<?php

namespace Database\Seeders;

use App\Models\BlogPost;
use Illuminate\Database\Seeder;

class BlogPostSeeder extends Seeder
{
    public function run(): void
    {
        BlogPost::create([
            'title' => 'Getting Started with Laravel and Inertia.js',
            'slug' => 'getting-started-with-laravel-and-inertia-js',
            'content' => '<p>This is a sample blog post about Laravel and Inertia.js integration.</p>',
            'markdown_content' => "# Getting Started with Laravel and Inertia.js\n\nLaravel and Inertia.js make a powerful combination for building modern web applications. In this post, I'll walk you through setting up a new project and getting started with these technologies.\n\n## What is Inertia.js?\n\nInertia.js is a library that allows you to build single-page applications using classic server-side routing and controllers. It bridges the gap between traditional server-rendered applications and modern SPAs.\n\n## Key Benefits\n\n- **Server-side routing** - Use Laravel's powerful routing system\n- **No API needed** - Build your app without creating a separate API\n- **Full-stack development** - Work in one codebase\n- **SEO friendly** - Better search engine optimization\n\n## Getting Started\n\n1. Create a new Laravel project\n2. Install Inertia.js\n3. Set up your first page\n4. Add more components\n\n```php\ncomposer require inertiajs/inertia-laravel\n```\n\nThis approach gives you the best of both worlds - modern frontend development with solid backend architecture.",
            'excerpt' => 'Learn how to integrate Laravel with Inertia.js to build modern, full-stack web applications.',
            'is_published' => true,
            'published_at' => now(),
        ]);

        BlogPost::create([
            'title' => 'Building Responsive UIs with Tailwind CSS',
            'slug' => 'building-responsive-uis-with-tailwind-css',
            'content' => '<p>This is a sample blog post about Tailwind CSS.</p>',
            'markdown_content' => "# Building Responsive UIs with Tailwind CSS\n\nTailwind CSS has revolutionized how I approach frontend development. In this comprehensive guide, I'll share my experience and best practices for building responsive user interfaces.\n\n## Why Tailwind CSS?\n\nTailwind CSS is a utility-first CSS framework that provides low-level utility classes to build custom designs without leaving your HTML.\n\n### Advantages\n\n- **Rapid development** - Build interfaces quickly\n- **Consistent spacing** - Predefined scale system\n- **Responsive by default** - Mobile-first approach\n- **Customizable** - Easy to extend and modify\n\n## Responsive Design Patterns\n\n```css\n/* Example responsive classes */\n.container {\n  @apply px-4 md:px-6 lg:px-8;\n}\n```\n\n## Best Practices\n\n1. **Mobile-first approach** - Start with mobile and scale up\n2. **Component consistency** - Use consistent spacing and sizing\n3. **Performance optimization** - Purge unused CSS in production\n4. **Accessibility** - Ensure proper contrast and focus states\n\n## Conclusion\n\nTailwind CSS has become an essential tool in my development workflow, enabling me to build beautiful, responsive interfaces faster than ever before.",
            'excerpt' => 'Master responsive design with Tailwind CSS and learn best practices for building modern user interfaces.',
            'is_published' => true,
            'published_at' => now()->subDays(2),
        ]);

        BlogPost::create([
            'title' => 'TypeScript Best Practices for React Development',
            'slug' => 'typescript-best-practices-for-react-development',
            'content' => '<p>This is a sample blog post about TypeScript and React.</p>',
            'markdown_content' => "# TypeScript Best Practices for React Development\n\nTypeScript has transformed how I write React applications. In this post, I'll share the best practices I've learned over years of development.\n\n## Why TypeScript?\n\nTypeScript adds static typing to JavaScript, providing better tooling, error catching, and code documentation.\n\n## Interface Design\n\n```typescript\ninterface User {\n  id: number;\n  name: string;\n  email: string;\n  avatar?: string;\n}\n\ninterface UserCardProps {\n  user: User;\n  onEdit?: (user: User) => void;\n  onDelete?: (id: number) => void;\n}\n```\n\n## Component Patterns\n\n### Generic Components\n\n```typescript\ninterface ListProps<T> {\n  items: T[];\n  renderItem: (item: T) => React.ReactNode;\n  keyExtractor: (item: T) => string | number;\n}\n\nfunction List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {\n  return (\n    <ul>\n      {items.map(item => (\n        <li key={keyExtractor(item)}>{renderItem(item)}</li>\n      ))}\n    </ul>\n  );\n}\n```\n\n## Error Handling\n\nAlways handle potential errors and edge cases:\n\n```typescript\nfunction UserProfile({ userId }: { userId: string }) {\n  const [user, setUser] = useState<User | null>(null);\n  const [error, setError] = useState<string | null>(null);\n  \n  // ... rest of component\n}\n```\n\n## Conclusion\n\nTypeScript makes React development more robust and maintainable. Start with strict mode enabled and gradually improve your type definitions.",
            'excerpt' => 'Learn essential TypeScript patterns and best practices for building robust React applications.',
            'is_published' => true,
            'published_at' => now()->subDays(5),
        ]);

        BlogPost::create([
            'title' => 'Database Design Principles for Web Applications',
            'slug' => 'database-design-principles-for-web-applications',
            'content' => '<p>This is a sample blog post about database design.</p>',
            'markdown_content' => "# Database Design Principles for Web Applications\n\nGood database design is the foundation of any successful web application. In this post, I'll share the key principles I follow when designing database schemas.\n\n## Normalization\n\nDatabase normalization is crucial for data integrity and performance:\n\n### First Normal Form (1NF)\n- Each column contains atomic values\n- No repeating groups\n- Primary key identified\n\n### Second Normal Form (2NF)\n- 1NF + no partial dependencies\n- All non-key attributes depend on the full primary key\n\n### Third Normal Form (3NF)\n- 2NF + no transitive dependencies\n- Eliminate redundant data\n\n## Indexing Strategies\n\n```sql\n-- Example indexes for common queries\nCREATE INDEX idx_users_email ON users(email);\nCREATE INDEX idx_posts_published_at ON posts(published_at);\nCREATE INDEX idx_comments_post_id ON comments(post_id);\n```\n\n## Relationship Design\n\n### One-to-Many\n```sql\n-- Users can have many posts\nCREATE TABLE users (\n  id BIGINT PRIMARY KEY,\n  name VARCHAR(255)\n);\n\nCREATE TABLE posts (\n  id BIGINT PRIMARY KEY,\n  user_id BIGINT REFERENCES users(id),\n  title VARCHAR(255)\n);\n```\n\n### Many-to-Many\n```sql\n-- Posts can have many tags, tags can have many posts\nCREATE TABLE posts (\n  id BIGINT PRIMARY KEY,\n  title VARCHAR(255)\n);\n\nCREATE TABLE tags (\n  id BIGINT PRIMARY KEY,\n  name VARCHAR(100)\n);\n\nCREATE TABLE post_tags (\n  post_id BIGINT REFERENCES posts(id),\n  tag_id BIGINT REFERENCES tags(id),\n  PRIMARY KEY (post_id, tag_id)\n);\n```\n\n## Performance Considerations\n\n- **Query optimization** - Use EXPLAIN to analyze queries\n- **Connection pooling** - Manage database connections efficiently\n- **Caching strategies** - Implement appropriate caching layers\n- **Monitoring** - Track query performance and bottlenecks\n\n## Conclusion\n\nGood database design requires careful planning and consideration of both current needs and future scalability. Start with proper normalization and optimize based on actual usage patterns.",
            'excerpt' => 'Master the fundamentals of database design for scalable and maintainable web applications.',
            'is_published' => true,
            'published_at' => now()->subDays(8),
        ]);
    }
}
