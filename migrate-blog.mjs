import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const languages = ['en', 'fr'];

function extractMetadata(content, filename) {
  const lines = content.split('\n');

  // Extract title (first line, remove # )
  let title = '';
  let image = '';
  let date = '';
  let contentStart = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    if (line.startsWith('# ') && !title) {
      title = line.replace('# ', '').trim();
      contentStart = i + 1;
    } else if (line.startsWith('![') && !image) {
      const match = line.match(/!\[.*?\]\((.*?)\)/);
      if (match) {
        image = match[1];
      }
    } else if (line.startsWith('>') && !date) {
      // Date in format > DD/MM/YYYY
      const dateStr = line.replace('>', '').trim();
      const [day, month, year] = dateStr.split('/');
      if (day && month && year) {
        date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T00:00:00Z`;
      }
    }

    // Skip empty lines and metadata at the beginning
    if (title && (line.startsWith('![') || line.startsWith('>') || line === '')) {
      contentStart = i + 1;
    } else if (title && line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('>')) {
      break;
    }
  }

  // Extract description (first paragraph after metadata)
  let description = '';
  for (let i = contentStart; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && !line.startsWith('![') && !line.startsWith('>')) {
      description = line.substring(0, 200);
      break;
    }
  }

  // Get content after metadata
  const contentLines = lines.slice(contentStart).filter((line, index) => {
    // Remove the image and date lines from content
    const trimmed = line.trim();
    return !(trimmed.startsWith('![') || trimmed.startsWith('>'));
  });

  const mainContent = contentLines.join('\n').trim();

  return {
    title,
    image,
    date,
    description,
    content: mainContent,
  };
}

function createMDXContent(metadata) {
  const frontmatter = `---
title: ${metadata.title}
description: ${metadata.description}
date: ${metadata.date}
author: simon-boisset
${metadata.image ? `image: ${metadata.image}` : ''}
---

`;

  return frontmatter + metadata.content;
}

// Migrate articles
for (const lang of languages) {
  const sourceDir = path.join(__dirname, 'app', 'contents', 'blog', lang);
  const targetDir = path.join(__dirname, 'content', 'blog', lang);

  // Read all .md files
  const files = fs.readdirSync(sourceDir).filter(f => f.endsWith('.md'));

  for (const file of files) {
    const sourcePath = path.join(sourceDir, file);
    const content = fs.readFileSync(sourcePath, 'utf-8');

    // Extract metadata
    const metadata = extractMetadata(content, file);

    // Create new MDX content
    const mdxContent = createMDXContent(metadata);

    // Extract slug from filename (remove date prefix)
    const slug = file.replace(/^\d{8}-/, '').replace('.md', '');

    // Write to new location as .mdx
    const targetPath = path.join(targetDir, `${slug}.mdx`);
    fs.writeFileSync(targetPath, mdxContent, 'utf-8');

    console.log(`Migrated: ${lang}/${file} -> ${slug}.mdx`);
  }
}

console.log('\nMigration completed!');
