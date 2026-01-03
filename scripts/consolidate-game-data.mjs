#!/usr/bin/env node
/**
 * Consolidate scattered JSON game data files into single importable files.
 *
 * This script reads individual monster/trap JSON files from the source directory
 * and creates consolidated JSON files that can be imported by the app.
 *
 * Run: node scripts/consolidate-game-data.mjs
 *
 * Output:
 * - src/data/generated/monsters.json
 * - src/data/generated/traps.json
 */

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');

// Source paths (relative to project root)
const MONSTERS_SOURCE = join(ROOT, 'src/data/source/game-json/Monsters/Monsters');
const TRAPS_SOURCE = join(ROOT, 'src/data/source/game-json/Monsters/Dynamic Terrain');

// Output paths
const OUTPUT_DIR = join(ROOT, 'src/data/generated');
const MONSTERS_OUTPUT = join(OUTPUT_DIR, 'monsters.json');
const TRAPS_OUTPUT = join(OUTPUT_DIR, 'traps.json');

/**
 * Recursively find all JSON files in a directory.
 */
function findJsonFiles(dir, files = []) {
  try {
    const entries = readdirSync(dir);
    for (const entry of entries) {
      // Skip hidden files and directories
      if (entry.startsWith('.')) continue;

      const fullPath = join(dir, entry);
      const stat = statSync(fullPath);

      if (stat.isDirectory()) {
        findJsonFiles(fullPath, files);
      } else if (entry.endsWith('.json')) {
        files.push(fullPath);
      }
    }
  } catch (err) {
    console.warn(`Warning: Could not read directory ${dir}:`, err.message);
  }
  return files;
}

/**
 * Load and parse a JSON file.
 */
function loadJson(filePath) {
  try {
    const content = readFileSync(filePath, 'utf-8');
    return JSON.parse(content);
  } catch (err) {
    console.error(`Error loading ${filePath}:`, err.message);
    return null;
  }
}

/**
 * Consolidate monster statblocks from scattered JSON files.
 */
function consolidateMonsters() {
  console.log('Consolidating monster statblocks...');

  const statblocks = [];
  const features = [];
  const jsonFiles = findJsonFiles(MONSTERS_SOURCE);

  for (const file of jsonFiles) {
    const data = loadJson(file);
    if (!data) continue;

    // Check if this is a statblock or a feature
    if (data.type === 'statblock') {
      statblocks.push(data);
    } else if (data.type === 'feature' || data.type === 'featureblock') {
      features.push(data);
    }
  }

  console.log(`  Found ${statblocks.length} monster statblocks`);
  console.log(`  Found ${features.length} monster features/malice`);

  return { statblocks, features };
}

/**
 * Consolidate traps and dynamic terrain from scattered JSON files.
 */
function consolidateTraps() {
  console.log('Consolidating traps and dynamic terrain...');

  const traps = [];
  const jsonFiles = findJsonFiles(TRAPS_SOURCE);

  for (const file of jsonFiles) {
    const data = loadJson(file);
    if (!data) continue;

    // Add source path for debugging
    traps.push(data);
  }

  console.log(`  Found ${traps.length} traps/terrain features`);

  return { traps };
}

/**
 * Main entry point.
 */
function main() {
  console.log('='.repeat(50));
  console.log('Consolidating Draw Steel game data...');
  console.log('='.repeat(50));

  // Ensure output directory exists
  try {
    mkdirSync(OUTPUT_DIR, { recursive: true });
  } catch (err) {
    // Directory might already exist
  }

  // Consolidate monsters
  const monstersData = consolidateMonsters();
  writeFileSync(
    MONSTERS_OUTPUT,
    JSON.stringify(monstersData, null, 2),
    'utf-8'
  );
  console.log(`  Wrote: ${MONSTERS_OUTPUT}`);

  // Consolidate traps
  const trapsData = consolidateTraps();
  writeFileSync(
    TRAPS_OUTPUT,
    JSON.stringify(trapsData, null, 2),
    'utf-8'
  );
  console.log(`  Wrote: ${TRAPS_OUTPUT}`);

  console.log('='.repeat(50));
  console.log('Done!');
  console.log('='.repeat(50));

  // Summary
  console.log('\nSummary:');
  console.log(`  Monster statblocks: ${monstersData.statblocks.length}`);
  console.log(`  Monster features: ${monstersData.features.length}`);
  console.log(`  Traps/terrain: ${trapsData.traps.length}`);
}

main();
