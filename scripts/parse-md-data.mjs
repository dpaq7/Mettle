#!/usr/bin/env node
/**
 * Parse Draw Steel markdown files and generate JSON data.
 *
 * This script reads the rules-md source files and extracts structured data.
 *
 * Run: node scripts/parse-md-data.mjs
 *
 * Output:
 * - src/data/generated/skills.json
 * - src/data/generated/conditions.json
 * - src/data/generated/ancestries.json (future)
 * - src/data/generated/careers.json (future)
 * - src/data/generated/kits.json (future)
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Source paths
const RULES_MD_ROOT = join(ROOT, 'src/data/source/rules-md');
const OUTPUT_DIR = join(ROOT, 'src/data/generated');

// ============================================
// YAML Frontmatter Parser
// ============================================

/**
 * Simple YAML frontmatter parser.
 * Handles basic key: value and key: [array] formats.
 */
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return { frontmatter: {}, body: content };

  const yamlText = match[1];
  const body = content.slice(match[0].length).trim();

  const frontmatter = {};
  let currentKey = null;
  let inArray = false;
  let arrayItems = [];

  for (const line of yamlText.split('\n')) {
    // Array item
    if (line.trim().startsWith('- ') && currentKey && inArray) {
      arrayItems.push(line.trim().slice(2));
      continue;
    }

    // Close array if we hit a new key
    if (inArray && currentKey && line.match(/^\w/)) {
      frontmatter[currentKey] = arrayItems;
      inArray = false;
      arrayItems = [];
    }

    // Key: value pair
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      const [, key, value] = kvMatch;
      if (value.trim() === '') {
        // Start of array
        currentKey = key;
        inArray = true;
        arrayItems = [];
      } else {
        // Simple value (strip quotes)
        frontmatter[key] = value.replace(/^['"]|['"]$/g, '');
      }
    }
  }

  // Close final array
  if (inArray && currentKey) {
    frontmatter[currentKey] = arrayItems;
  }

  return { frontmatter, body };
}

// ============================================
// Markdown Table Parser
// ============================================

/**
 * Parse a markdown table into array of objects.
 */
function parseMarkdownTable(body, headerRow = 0) {
  const lines = body.split('\n').filter((l) => l.trim().startsWith('|'));
  if (lines.length < 2) return [];

  // Parse header
  const headers = lines[headerRow]
    .split('|')
    .map((h) => h.trim())
    .filter((h) => h && !h.match(/^-+$/));

  // Parse rows (skip header and separator)
  const rows = [];
  for (let i = headerRow + 2; i < lines.length; i++) {
    const cells = lines[i]
      .split('|')
      .map((c) => c.trim())
      .filter((c) => c);

    if (cells.length === headers.length) {
      const row = {};
      headers.forEach((h, idx) => {
        row[h.toLowerCase().replace(/\s+/g, '_')] = cells[idx];
      });
      rows.push(row);
    }
  }

  return rows;
}

// ============================================
// Skills Parser
// ============================================

function parseSkills() {
  console.log('Parsing skills...');
  const skillsDir = join(RULES_MD_ROOT, 'Skills');
  const outputFile = join(OUTPUT_DIR, 'skills.json');

  if (!existsSync(skillsDir)) {
    console.log('  Skills directory not found, skipping');
    // Preserve existing data if available
    if (existsSync(outputFile)) {
      try {
        const existing = JSON.parse(readFileSync(outputFile, 'utf-8'));
        if (existing.skills && existing.skills.length > 0) {
          console.log(`  Preserving existing data (${existing.skills.length} skills)`);
          return existing;
        }
      } catch { /* ignore parse errors */ }
    }
    return { skillGroups: [], skills: [] };
  }

  const skillGroups = [];
  const allSkills = [];

  const files = readdirSync(skillsDir).filter(
    (f) => f.endsWith('.md') && !f.startsWith('_')
  );

  for (const file of files) {
    const content = readFileSync(join(skillsDir, file), 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    // Extract group name from filename (e.g., "Crafting Skills.md" -> "crafting")
    const groupName = file.replace(' Skills.md', '').toLowerCase();

    // Parse the skills table
    const tableRows = parseMarkdownTable(body);

    const skills = tableRows.map((row) => ({
      name: row.skill,
      use: row.use,
      group: groupName,
    }));

    skillGroups.push({
      id: frontmatter.item_id || groupName + '-skills',
      name: frontmatter.item_name || file.replace('.md', ''),
      group: groupName,
      scc: frontmatter.scc || [],
      skillCount: skills.length,
    });

    allSkills.push(...skills);
  }

  console.log(`  Found ${skillGroups.length} skill groups, ${allSkills.length} skills`);

  return { skillGroups, skills: allSkills };
}

// ============================================
// Conditions Parser
// ============================================

function parseConditions() {
  console.log('Parsing conditions...');
  const conditionsDir = join(RULES_MD_ROOT, 'Conditions');
  const outputFile = join(OUTPUT_DIR, 'conditions-md.json');

  if (!existsSync(conditionsDir)) {
    console.log('  Conditions directory not found, skipping');
    // Preserve existing data if available
    if (existsSync(outputFile)) {
      try {
        const existing = JSON.parse(readFileSync(outputFile, 'utf-8'));
        if (existing.conditions && existing.conditions.length > 0) {
          console.log(`  Preserving existing data (${existing.conditions.length} conditions)`);
          return existing;
        }
      } catch { /* ignore parse errors */ }
    }
    return { conditions: [] };
  }

  const conditions = [];
  const files = readdirSync(conditionsDir).filter(
    (f) => f.endsWith('.md') && !f.startsWith('_')
  );

  for (const file of files) {
    const content = readFileSync(join(conditionsDir, file), 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    // Extract description (remove the header line)
    const descLines = body.split('\n').filter((l) => !l.startsWith('#'));
    const description = descLines.join('\n').trim();

    conditions.push({
      id: frontmatter.item_id || file.replace('.md', '').toLowerCase(),
      name: frontmatter.item_name || file.replace('.md', ''),
      description,
      scc: frontmatter.scc || [],
      // Note: saveEnds, actionTriggers etc. need manual curation
      // as they're not explicit in the MD
    });
  }

  console.log(`  Found ${conditions.length} conditions`);

  return { conditions };
}

// ============================================
// Ancestries Parser (Basic)
// ============================================

function parseAncestries() {
  console.log('Parsing ancestries...');
  const ancestriesDir = join(RULES_MD_ROOT, 'Ancestries');
  const outputFile = join(OUTPUT_DIR, 'ancestries-raw.json');

  if (!existsSync(ancestriesDir)) {
    console.log('  Ancestries directory not found, skipping');
    // Preserve existing data if available
    if (existsSync(outputFile)) {
      try {
        const existing = JSON.parse(readFileSync(outputFile, 'utf-8'));
        if (existing.ancestries && existing.ancestries.length > 0) {
          console.log(`  Preserving existing data (${existing.ancestries.length} ancestries)`);
          return existing;
        }
      } catch { /* ignore parse errors */ }
    }
    return { ancestries: [] };
  }

  const ancestries = [];
  const files = readdirSync(ancestriesDir).filter(
    (f) => f.endsWith('.md') && !f.startsWith('_')
  );

  for (const file of files) {
    const content = readFileSync(join(ancestriesDir, file), 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);

    // Basic extraction - full parsing requires more complex logic
    ancestries.push({
      id: frontmatter.item_id || file.replace('.md', '').toLowerCase().replace(/\s+/g, '-'),
      name: frontmatter.item_name || file.replace('.md', ''),
      scc: frontmatter.scc || [],
      rawContent: body, // Store raw content for manual curation
    });
  }

  console.log(`  Found ${ancestries.length} ancestries (raw)`);

  return { ancestries };
}

// ============================================
// Main Entry Point
// ============================================

function main() {
  console.log('='.repeat(50));
  console.log('Parsing Draw Steel markdown data...');
  console.log('='.repeat(50));

  // Ensure output directory exists
  mkdirSync(OUTPUT_DIR, { recursive: true });

  // Parse skills
  const skillsData = parseSkills();
  writeFileSync(
    join(OUTPUT_DIR, 'skills.json'),
    JSON.stringify(skillsData, null, 2),
    'utf-8'
  );
  console.log(`  Wrote: skills.json`);

  // Parse conditions
  const conditionsData = parseConditions();
  writeFileSync(
    join(OUTPUT_DIR, 'conditions-md.json'),
    JSON.stringify(conditionsData, null, 2),
    'utf-8'
  );
  console.log(`  Wrote: conditions-md.json`);

  // Parse ancestries (basic)
  const ancestriesData = parseAncestries();
  writeFileSync(
    join(OUTPUT_DIR, 'ancestries-raw.json'),
    JSON.stringify(ancestriesData, null, 2),
    'utf-8'
  );
  console.log(`  Wrote: ancestries-raw.json`);

  console.log('='.repeat(50));
  console.log('Done!');
  console.log('='.repeat(50));

  // Summary
  console.log('\nSummary:');
  console.log(`  Skills: ${skillsData.skills.length}`);
  console.log(`  Conditions: ${conditionsData.conditions.length}`);
  console.log(`  Ancestries (raw): ${ancestriesData.ancestries.length}`);
  console.log('\nNote: Ancestries need further parsing for structured data');
}

main();
