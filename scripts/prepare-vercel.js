import { cp, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";

async function main() {
  const distDir = "dist";
  const outputDir = ".vercel/output";

  if (!existsSync(distDir)) {
    console.error("❌ dist/ not found. Run 'bun run build' first.");
    process.exit(1);
  }

  // Ensure output directories exist
  await mkdir(`${outputDir}/functions/__server.func`, { recursive: true });
  await mkdir(`${outputDir}/static`, { recursive: true });

  // Copy server entry
  await cp(`${distDir}/server/index.mjs`, `${outputDir}/functions/__server.func/index.mjs`);

  // Copy static assets
  await cp(`${distDir}/client`, `${outputDir}/static`, { recursive: true });

  // Copy config
  await cp(`${distDir}/nitro.json`, `${outputDir}/nitro.json`);

  console.log("✅ Vercel output prepared successfully!");
  console.log("   Run: npx vercel deploy --prebuilt");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
