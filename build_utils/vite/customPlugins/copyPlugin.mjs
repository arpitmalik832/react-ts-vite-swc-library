/* eslint-disable no-console */
import chalk from 'chalk';
import fs from 'fs';
import path from 'path';

function ensureDirectoryExistence(filePath) {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
  return true;
}

function copyFileOrDirectory(src, dest) {
  const srcPath = path.resolve(process.cwd(), src);
  const destPath = path.resolve(process.cwd(), dest);

  // Check if source exists
  if (!fs.existsSync(srcPath)) {
    console.warn(`Warning: Source path does not exist: ${srcPath}`);
    return;
  }

  // Get source file/directory stats
  const stats = fs.statSync(srcPath);

  if (stats.isDirectory()) {
    // If it's a directory, create it and copy contents
    if (!fs.existsSync(destPath)) {
      fs.mkdirSync(destPath, { recursive: true });
    }

    const files = fs.readdirSync(srcPath);
    files.forEach(file => {
      const srcFile = path.join(srcPath, file);
      const destFile = path.join(destPath, file);
      copyFileOrDirectory(srcFile, destFile);
    });
  } else {
    // If it's a file, copy it
    ensureDirectoryExistence(destPath);
    fs.copyFileSync(srcPath, destPath);
    console.log(chalk.green(`Copied: ${src} -> ${dest}`));
  }
}

const copyPlugin = () => ({
  name: 'copy-files-plugin',
  closeBundle() {
    const filesToCopy = [
      {
        src: 'static/styles',
        dest: 'dist/styles',
      },
      {
        src: 'src/styles/mixins',
        dest: 'dist/styles/mixins',
      },
      {
        src: 'static/enums/icons_list.mjs',
        dest: 'dist/icons_list.mjs',
      },
      {
        src: 'static/enums/icons_list.ts',
        dest: 'dist/icons_list.ts',
      },
      // Add any other files/directories you need to copy
    ];

    console.log(chalk.green('\nStarting file copy process...'));

    try {
      filesToCopy.forEach(({ src, dest }) => {
        console.log(chalk.blue(`\nCopying ${src} to ${dest}...`));
        copyFileOrDirectory(src, dest);
      });
      console.log(chalk.green('\nFile copy process completed successfully!\n'));
    } catch (error) {
      console.error('\nError during file copy:', error);
      throw error;
    }
  },
});

export default copyPlugin;
