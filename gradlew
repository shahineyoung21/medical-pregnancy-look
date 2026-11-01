#!/bin/sh
set -e
APP_HOME="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
if [ -z "$GRADLE_USER_HOME" ]; then GRADLE_USER_HOME="$HOME/.gradle"; fi
DIST_DIR="$GRADLE_USER_HOME/wrapper/dists/gradle-8.10.2-bin"
DIST="$DIST_DIR/gradle-8.10.2"
if [ ! -x "$DIST/bin/gradle" ]; then
  mkdir -p "$DIST_DIR"
  TMP="$DIST_DIR/gradle.zip"
  if command -v curl >/dev/null 2>&1; then curl -fsSL -o "$TMP" "https://services.gradle.org/distributions/gradle-8.10.2-bin.zip"; else wget -q -O "$TMP" "https://services.gradle.org/distributions/gradle-8.10.2-bin.zip"; fi
  unzip -q -o "$TMP" -d "$DIST_DIR"
fi
exec "$DIST/bin/gradle" "$@"
