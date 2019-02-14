#!/usr/bin/env node

/**
 * @overview
 * This script is a node script wrapper to build the icon svg htmlm files
 */

// -------------------------------------
// Requirements
// -------------------------------------
const createSvgHtml = require('./create-svg');

// -------------------------------------
// Main
// -------------------------------------
createSvgHtml(true);
