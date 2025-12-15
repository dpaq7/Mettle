# Mettle

**Mettle** is a character manager for the Draw Steel TTRPG by MCDM. Manage heroes across all 10 classes with class-specific themes, mechanics tracking, and comprehensive character sheets.

## Features

- **All 10 Hero Classes**: Censor, Conduit, Elementalist, Fury, Null, Shadow, Summoner, Tactician, Talent, Troubadour
- **Class Themes**: Unique color palettes auto-applied per class
- **Heroic Resource Tracking**: Class-specific resource mechanics
- **Full Character Creation**: Ancestry, Culture, Career, Class, and more
- **Summoner Minion Management**: Complete portfolio and squad tracking
- **Magic Items & Projects**: Track equipment and downtime activities
- **Power Rolls**: 2d10 power roll system with edge/bane support

## Installation

### Pre-built App (macOS)

Download the latest `.dmg` from the Releases page. Works on both Intel and Apple Silicon Macs.

### Development

Requires Node.js and Rust toolchain.

```bash
# Install dependencies
npm install

# Run in development
npm run tauri:dev

# Build for production
npm run tauri build -- --target universal-apple-darwin
```

## Version History

- **v0.3.0** - Mettle: Full Draw Steel support for all 10 classes
- **v0.2.x** - Forge Steel Summoner: Summoner-focused character manager
- **v0.1.x** - Initial development

## Attribution

**Mettle** is a fork of [Forge Steel](https://github.com/andyaiken/forgesteel), originally created by [Andy Aiken](https://github.com/andyaiken). We gratefully acknowledge Andy's foundational work that made this project possible.

## Legal

**Mettle** is an independent product published under the [DRAW STEEL Creator License](https://www.mcdmproductions.com/draw-steel-creator-license) and is not affiliated with MCDM Productions, LLC.

**DRAW STEEL** © 2024 MCDM Productions, LLC.

For more information about Draw Steel, visit [MCDM Productions](https://www.mcdmproductions.com).

## License

This project is licensed under the **GNU General Public License v3.0** - see the [LICENSE](LICENSE) file for details.

This is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

### Third-Party Acknowledgments

- **Forge Steel** by Andy Aiken - Original codebase ([GPL v3 License](https://github.com/andyaiken/forgesteel/blob/main/LICENSE))
- **Draw Steel** by MCDM Productions - Game content ([Creator License](https://www.mcdmproductions.com/draw-steel-creator-license))
