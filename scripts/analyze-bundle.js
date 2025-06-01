import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function analyzeBundle() {
  const distPath = path.join(process.cwd(), "dist");

  if (!fs.existsSync(distPath)) {
    console.error("❌ Build directory not found. Run `npm run build` first.");
    process.exit(1);
  }

  console.log("🔍 Analyzing bundle...\n");

  const assetsPath = path.join(distPath, "assets");
  if (fs.existsSync(assetsPath)) {
    const files = fs.readdirSync(assetsPath);

    const jsFiles = files.filter((file) => file.endsWith(".js"));
    const cssFiles = files.filter((file) => file.endsWith(".css"));

    console.log("📦 JavaScript Files:");
    jsFiles.forEach((file) => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`  • ${file}: ${sizeKB} KB`);
    });

    console.log("\n🎨 CSS Files:");
    cssFiles.forEach((file) => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      const sizeKB = (stats.size / 1024).toFixed(2);
      console.log(`  • ${file}: ${sizeKB} KB`);
    });

    const totalJSSize = jsFiles.reduce((total, file) => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      return total + stats.size;
    }, 0);

    const totalCSSSize = cssFiles.reduce((total, file) => {
      const filePath = path.join(assetsPath, file);
      const stats = fs.statSync(filePath);
      return total + stats.size;
    }, 0);

    console.log("\n📊 Bundle Summary:");
    console.log(`  Total JS: ${(totalJSSize / 1024).toFixed(2)} KB`);
    console.log(`  Total CSS: ${(totalCSSSize / 1024).toFixed(2)} KB`);
    console.log(
      `  Total: ${((totalJSSize + totalCSSSize) / 1024).toFixed(2)} KB`
    );

    console.log("\n💡 Recommendations:");

    if (totalJSSize > 500 * 1024) {
      console.log("  ⚠️  JavaScript bundle is large (>500KB). Consider:");
      console.log("     - Further code splitting");
      console.log("     - Tree shaking optimization");
      console.log("     - Dynamic imports for heavy libraries");
    }

    if (totalCSSSize > 100 * 1024) {
      console.log("  ⚠️  CSS bundle is large (>100KB). Consider:");
      console.log("     - Purging unused CSS");
      console.log("     - CSS code splitting");
    }

    if (jsFiles.length === 1) {
      console.log(
        "  💭 Consider implementing code splitting to reduce initial bundle size"
      );
    } else {
      console.log("  ✅ Code splitting is implemented");
    }

    const sourceMaps = files.filter((file) => file.endsWith(".map"));
    if (sourceMaps.length > 0) {
      console.log("  ✅ Source maps are generated for debugging");
    }
  }

  const indexPath = path.join(distPath, "index.html");
  if (fs.existsSync(indexPath)) {
    const indexContent = fs.readFileSync(indexPath, "utf8");
    const preloadTags = (indexContent.match(/<link[^>]*rel="preload"/g) || [])
      .length;
    const prefetchTags = (indexContent.match(/<link[^>]*rel="prefetch"/g) || [])
      .length;

    console.log("\n🚀 Resource Hints:");
    console.log(`  Preload tags: ${preloadTags}`);
    console.log(`  Prefetch tags: ${prefetchTags}`);

    if (preloadTags === 0) {
      console.log("  💭 Consider adding preload hints for critical resources");
    }
  }

  console.log("\n🎯 Next Steps:");
  console.log("  1. Run `npm run build:stats` for detailed build information");
  console.log("  2. Use browser dev tools to analyze runtime performance");
  console.log("  3. Consider implementing lazy loading for below-fold content");
  console.log("  4. Monitor Web Vitals in production");
}

try {
  analyzeBundle();
} catch (error) {
  console.error("❌ Error analyzing bundle:", error.message);
  process.exit(1);
}
