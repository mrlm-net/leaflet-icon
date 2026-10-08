# mrlm-net/leaflet-icon

Simple Leaflet.js icon extension to handle multiple additional features like rotation and other useful stuff.

| Package | `mrlm-net/leaflet-icon` |
| :-- | :-- |
| NPM name | `@mrlm/leaflet-icon` |
| NPM version | ![NPM Version](https://img.shields.io/npm/v/@mrlm/leaflet-icon) |
| Latest version | ![GitHub Release](https://img.shields.io/github/v/release/mrlm-net/leaflet-icon) |
| License | [![License: Apache 2.0](https://img.shields.io/badge/license-Apache%202.0-6c7480)](LICENSE) |

## Table of contents

- [Installation](#installation)
- [Usage](#usage)
- [Advanced Usage](#advanced-usage)
- [Interfaces](#interfaces)
- [Exports](#export-paths)
- [Example](#example)

## Installation

> I'm using `YARN` so examples will be using it, you can install this package via any Node Package Manager.

```shell
$ yarn add @mrlm/leaflet-icon
```

## Usage

Import the extension in your project after importing Leaflet. The extension automatically extends `L.Marker` with rotation capabilities.

```typescript
import 'leaflet';
import '@mrlm/leaflet-icon';
```

Create a marker with rotation options:

```typescript
const marker = L.marker([51.5, -0.09], {
    rotationAngle: 45,        // Rotation angle in degrees
    rotationOrigin: 'center'  // CSS transform origin
}).addTo(map);
```

## Advanced Usage

### Dynamic Rotation Updates

You can update the rotation angle and origin dynamically after the marker has been created:

```typescript
// Create a marker
const marker = L.marker([51.5, -0.09]).addTo(map);

// Update rotation angle (in degrees)
marker.setRotationAngle(90);

// Update rotation origin (CSS transform-origin value)
marker.setRotationOrigin('center center');
```

### Rotation During Drag

The extension automatically maintains the rotation angle while dragging the marker. No additional configuration is required.

### Rotation Origin

The `rotationOrigin` option accepts any valid CSS `transform-origin` value:

| Value | Description |
| :-- | :-- |
| `'center'` | Rotates around the center of the icon |
| `'center bottom'` | Rotates around the bottom center (default if icon anchor is not set) |
| `'top left'` | Rotates around the top-left corner |
| `'50% 50%'` | Same as center, using percentages |
| `'10px 20px'` | Specific pixel offset from top-left |

If no `rotationOrigin` is specified, it defaults to the icon's anchor point or `'center bottom'` if no anchor is defined.

## Interfaces

The extension adds the following options to `L.MarkerOptions`:

```typescript
interface MarkerOptions {
    rotationAngle?: number;   // Rotation angle in degrees (default: 0)
    rotationOrigin?: string;  // CSS transform-origin value (default: icon anchor or 'center bottom')
}
```

The extension adds the following methods to `L.Marker`:

```typescript
interface Marker {
    setRotationAngle(angle: number): this;    // Set rotation angle and update marker
    setRotationOrigin(origin: string): this;  // Set rotation origin and update marker
}
```

## Export Paths

The package provides the following export:

| Path | Description |
| :-- | :-- |
| `@mrlm/leaflet-icon` | Main entry point, extends L.Marker with rotation support |

```typescript
// ES Module import
import '@mrlm/leaflet-icon';
```

## Example

A working example is included in the `example/` directory. To run it locally:

```shell
# Clone the repository
$ git clone https://github.com/mrlm-net/leaflet-icon.git
$ cd leaflet-icon

# Install dependencies
$ yarn install

# Start development/example server
$ yarn serve
```

Then open `http://localhost:5173/example/` in your browser to see the rotated marker in action.

The example demonstrates:
- Creating a map with OpenStreetMap tiles
- Adding a marker with `rotationAngle: 180` (upside-down marker)
- Setting custom `rotationOrigin: 'center'`
- Interactive popup on the rotated marker

## Contributing

_Contributions are welcomed and must follow [Code of Conduct](https://github.com/mrlm-net/cfg?tab=coc-ov-file) and common [Contributions guidelines](https://github.com/mrlm-net/.github/blob/main/docs/CONTRIBUTING.md)._

> If you'd like to report security issue please follow [security guidelines](https://github.com/mrlm-net/cfg?tab=security-ov-file).

---
<sup><sub>_All rights reserved &copy; Martin Hrášek [<@mrlm-xyz>](https://github.com/mrlm-xyz) and WANTED.solutions s.r.o. [<@wanted-solutions>](https://github.com/wanted-solutions)_</sub></sup>