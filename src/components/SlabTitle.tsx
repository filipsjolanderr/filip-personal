import * as stylex from "@stylexjs/stylex";
import { colors, spacing } from "../app/vars.stylex";
import React from "react";
import { prepareWithSegments, layoutWithLines } from "@chenglou/pretext";
import path from "path";

// Support Server-Side Canvas Measurement!
if (typeof globalThis.OffscreenCanvas === "undefined") {
  globalThis.OffscreenCanvas = require("@napi-rs/canvas").Canvas as any;
}

try {
  const { GlobalFonts } = require("@napi-rs/canvas");
  GlobalFonts.registerFromPath(path.join(process.cwd(), "src", "fonts", "Inter.ttf"), "Inter");
  GlobalFonts.registerFromPath(path.join(process.cwd(), "src", "fonts", "LibreBaskerville.ttf"), "Libre Baskerville");
} catch (e) {
  console.warn("Failed to register pretext server fonts:", e);
}

export function Container({
  path,
  children,
  href,
  style,
}: Readonly<{
  path: string;
  children: React.ReactNode;
  href?: string;
  style?: stylex.StyleXStyles;
}>) {
  const safePath = path.split("/").pop();
  const wordCounts: { [key: string]: number } = {};

  const words: string[] = [];

  const childrenWithNames = React.Children.map(children, (child, i) => {
    const isLast = i === React.Children.count(children) - 1;
    if (
      child != null &&
      typeof child === "object" &&
      "props" in child &&
      typeof (child as any).props.children === "string"
    ) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let word = (child as any).props.children;
      const origWord = word;
      if (typeof word !== "string") {
        return child;
      }
      words.push(word);
      word = word.toLocaleLowerCase().replace(/[^a-z0-9\s-_]/g, "");
      const count = wordCounts[word] ?? 0;
      wordCounts[word] = (wordCounts[word] ?? 0) + 1;

      return React.cloneElement(child, {
        key: child.key ?? i,
        // @ts-expect-error: TypeScript does not recognize the xstyle property
        xstyle: styles.viewTransitionName(
          "_" + safePath + "________" + word + (count > 0 ? "___" + count : ""),
        ),
        "aria-hidden": true,
        children: isLast ? origWord : origWord + " ",
      });
    }
    if (
      child != null &&
      typeof child === "object" &&
      "type" in child &&
      child.type === "br"
    ) {
      return <div key={"br-" + i} {...stylex.props(styles.br)} />;
    }
    return child;
  });

  const el = (
    <h1
      {...stylex.props(
        styles.container,
        href != null && styles.containerInLink,
        style,
      )}
      aria-label={words.join(" ")}
    >
      <span aria-hidden={true} style={{ display: "contents" }}>
        {childrenWithNames}
      </span>
    </h1>
  );
  if (href != null) {
    return (
      <a {...stylex.props(styles.link)} href={href}>
        {el}
      </a>
    );
  }
  return el;
}

export function Word({
  children,
  scale,
  italic,
  offset = 0,
  xstyle,
}: Readonly<{
  children: string;
  scale?: number;
  italic?: boolean;
  offset?: number;
  xstyle?: stylex.StyleXStyles;
}>) {
  let measuredScale = 0;

  try {
    const fontStr = italic
      ? "italic lighter 29px 'Libre Baskerville', serif"
      : "800 28px 'Inter', sans-serif";
    
    // Natively mimic CSS uppercase
    const textToMeasure = italic ? children.trim() : children.trim().toUpperCase();
    
    const prepared = prepareWithSegments(textToMeasure, fontStr);
    const { lines } = layoutWithLines(prepared, 99999, 30);
    
    if (lines.length > 0) {
      measuredScale = lines[0].width;
    }
  } catch (e) {
    console.warn("Server-side pretext measurement failed for:", children, e);
    // Fallback if canvas crashes
    measuredScale = children.trim().length * (italic ? 12 : 18);
  }

  const resolvedScale = scale ?? measuredScale;
  
  // A consistent 30/22 height restores perfect organic proportioning without injecting excessive whitespace below normal rows!
  const height = italic ? 30 : 22;
  
  return (
    <span
      {...stylex.props(styles.word(resolvedScale), xstyle)}
      data-italic={italic}
    >
      <span {...stylex.props(styles.wordInnerDiv)}>
        <svg
          {...stylex.props(styles.svg, italic && styles.italicSvg)}
          viewBox={`0 0 ${resolvedScale} ${height}`}
        >
          <text
            {...stylex.props(styles.text, italic && styles.italic)}
            x={resolvedScale / 2}
            y={21}
            textAnchor="middle"
            textLength={resolvedScale}
            lengthAdjust="spacingAndGlyphs"
          >
            {children}
          </text>
        </svg>
      </span>
    </span>
  );
}

const styles = stylex.create({
  link: {
    display: "block",
    marginBottom: spacing.xxxxl,
    marginInline: "auto",
    maxWidth: "54rem",
    outline: "none",
    width: "100%",
  },
  viewTransitionName: (name: string) => ({
    // eslint-disable-next-line @stylexjs/valid-styles
    viewTransitionName: name,
  }),
  container: {
    alignItems: "flex-start",
    columnGap: spacing.xs,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: spacing.xxxxl,
    marginInline: "auto",
    maxWidth: "54rem",
    rowGap: spacing.xxxs,
    width: "100%",
  },
  containerInLink: {
    marginBottom: 0,
  },
  word: (scale: number) => ({
    color: {
      default: colors.fg,
      ":nth-child(3n + 2 of :not([data-italic]))": colors.surface2,
      ":nth-child(3n + 3 of :not([data-italic]))": colors.text,
      ":is([data-italic])": colors.maroon,
      ":nth-child(3n + 2 of [data-italic])": colors.lavender,
      ":nth-child(3n + 3 of [data-italic])": colors.green,
      ":nth-child(3n + 4 of [data-italic])": colors.pink,
    },
    flexBasis: 0,
    flexGrow: scale,
    margin: 0,
    minHeight: 32,
    minWidth: `${scale}px`,
    padding: 0,
    transition: "flex-grow 0.4s ease-out, min-width 0.4s ease-out",
  }),
  wordInnerDiv: {
    alignItems: "flex-start",
    display: "flex",
    height: "100%",
    justifyContent: "center",
    overflow: "visible",
    position: "relative",
  },
  svg: {
    aspectRatio: "inherit",
    overflow: "visible",
    width: "100%",
  },
  italicSvg: {
    // marginInline: -5,
    // marginTop: "-16%",
  },
  text: {
    fill: "currentColor",
    fontFamily: "var(--font-inter)",
    fontSize: 28,
    fontWeight: 800,
    lineHeight: 1,
    textTransform: "uppercase",
  },
  italic: {
    // color: {
    //   default: colors.maroon,
    //   ":nth-child(3n + 1 of [data-italic])": colors.blue,
    //   ":nth-child(3n + 2 of [data-italic])": colors.flamingo,
    //   ":nth-child(3n + 3 of [data-italic])": colors.yellow,
    // },
    color: "currentColor",
    fontFamily: "var(--font-baskerville)",
    letterSpacing: "-0.05em",
    fontSize: 29,
    fontStyle: "italic",
    fontWeight: "lighter",
    textTransform: null,
  },
  br: {
    width: "100%",
    flexShrink: 0,
  },
});
