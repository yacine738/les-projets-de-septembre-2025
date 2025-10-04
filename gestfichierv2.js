const fs = require('fs');
const path = require('path');
const readline = require('readline');
const zlib = require('zlib');
const { pipeline } = require('stream');
const { promisify } = require('util');
const pipelineAsync = promisify(pipeline);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let currentDir = process.cwd();
let mode = 'sy';

function updatePrompt() {
  rl.setPrompt(`${currentDir} [mode:${mode}] > `);
  rl.prompt();
}

function cd(newDir) {
  let targetPath = path.resolve(currentDir, newDir);
  try {
    if (fs.existsSync(targetPath) && fs.statSync(targetPath).isDirectory()) {
      currentDir = targetPath;
    } else {
      console.log('Répertoire invalide.');
    }
  } catch (err) {
    console.log('Erreur cd:', err.message);
  }
  updatePrompt();
}

// Compression synchrone
function compressGzipSync(inputFile) {
  const inputPath = path.join(currentDir, inputFile);
  const outputPath = inputPath + '.gz';
  const inputData = fs.readFileSync(inputPath);
  const compressed = zlib.gzipSync(inputData);
  fs.writeFileSync(outputPath, compressed);
  console.log(`Fichier compressé en gzip : ${inputFile}.gz`);
}

// Compression callback
function compressGzipCallback(inputFile, cb) {
  const inputPath = path.join(currentDir, inputFile);
  const outputPath = inputPath + '.gz';
  fs.readFile(inputPath, (err, data) => {
    if (err) return cb(err);
    zlib.gzip(data, (err, compressed) => {
      if (err) return cb(err);
      fs.writeFile(outputPath, compressed, cb);
    });
  });
}

// Compression promesse async
async function compressGzipPromise(inputFile) {
  const inputPath = path.join(currentDir, inputFile);
  const outputPath = inputPath + '.gz';
  const data = await fs.promises.readFile(inputPath);
  const compressed = await new Promise((resolve, reject) => {
    zlib.gzip(data, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
  await fs.promises.writeFile(outputPath, compressed);
  console.log(`Fichier compressé en gzip : ${inputFile}.gz`);
}

// Compression stream avec pipeline
async function compressGzipStream(inputFile) {
  const inputPath = path.join(currentDir, inputFile);
  const outputPath = inputPath + '.gz';
  const input = fs.createReadStream(inputPath);
  const output = fs.createWriteStream(outputPath);
  const gzip = zlib.createGzip();
  try {
    await pipelineAsync(input, gzip, output);
    console.log(`Fichier compressé en gzip (stream) : ${inputFile}.gz`);
  } catch (err) {
    console.log('Erreur compression stream:', err.message);
  }
  updatePrompt();
}

// Commandes synchrones
const syncCommands = {
  new: (filename) => {
    const filePath = path.join(currentDir, filename);
    fs.writeFileSync(filePath, '');
    console.log(`Fichier créé : ${filename}`);
  },
  write: (filename, content) => {
    const filePath = path.join(currentDir, filename);
    fs.writeFileSync(filePath, content);
    console.log(`Ecrit dans ${filename}`);
  },
  read: (filename) => {
    const filePath = path.join(currentDir, filename);
    const data = fs.readFileSync(filePath, 'utf8');
    console.log(data);
  },
  cp: (src, dest) => {
    const srcPath = path.join(currentDir, src);
    const destPath = path.join(currentDir, dest);
    fs.copyFileSync(srcPath, destPath);
    console.log(`Copié ${src} vers ${dest}`);
  },
  mv: (src, dest) => {
    const srcPath = path.join(currentDir, src);
    const destPath = path.join(currentDir, dest);
    fs.renameSync(srcPath, destPath);
    console.log(`Déplacé ${src} vers ${dest}`);
  },
  rename: (oldName, newName) => {
    const oldPath = path.join(currentDir, oldName);
    const newPath = path.join(currentDir, newName);
    fs.renameSync(oldPath, newPath);
    console.log(`Renommé ${oldName} en ${newName}`);
  },
  del: (filename) => {
    const filePath = path.join(currentDir, filename);
    fs.unlinkSync(filePath);
    console.log(`Supprimé ${filename}`);
  },
  zip: (filename) => {
    try {
      compressGzipSync(filename);
    } catch (e) {
      console.log('Erreur compression:', e.message);
    }
  },
  ls: () => {
    try {
      const files = fs.readdirSync(currentDir);
      files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        const isDir = fs.statSync(fullPath).isDirectory();
        console.log(isDir ? `[DIR] ${file}` : file);
      });
    } catch (err) {
      console.log('Erreur ls:', err.message);
    }
  }
};

// Commandes callback
function callbackCommands(command, args) {
  const filePath = (name) => path.join(currentDir, name);

  if (command === 'zip') {
    if (!args[0]) {
      console.log('Usage: zip <fichier>');
      updatePrompt();
      return;
    }
    compressGzipCallback(args[0], (err) => {
      if (err) console.log('Erreur compression:', err.message);
      else console.log(`Fichier compressé en gzip : ${args[0]}.gz`);
      updatePrompt();
    });
    return;
  }
  if (command === 'ls') {
    fs.readdir(currentDir, (err, files) => {
      if (err) console.log('Erreur ls:', err.message);
      else {
        let pending = files.length;
        if (pending === 0) {
          updatePrompt();
          return;
        }
        files.forEach(file => {
          const fullPath = path.join(currentDir, file);
          fs.stat(fullPath, (err, stats) => {
            if (!err) {
              console.log(stats.isDirectory() ? `[DIR] ${file}` : file);
            } else {
              console.log(file);
            }
            if (--pending === 0) updatePrompt();
          });
        });
      }
    });
    return;
  }
  if (command === 'new') {
    fs.writeFile(filePath(args[0]), '', (err) => {
      if (err) console.log(err);
      else console.log(`Fichier créé : ${args[0]}`);
      updatePrompt();
    });
  } else if (command === 'write') {
    fs.writeFile(filePath(args[0]), args.slice(1).join(' '), (err) => {
      if (err) console.log(err);
      else console.log(`Ecrit dans ${args[0]}`);
      updatePrompt();
    });
  } else if (command === 'read') {
    fs.readFile(filePath(args[0]), 'utf8', (err, data) => {
      if (err) console.log(err);
      else console.log(data);
      updatePrompt();
    });
  } else if (command === 'cp') {
    fs.copyFile(filePath(args[0]), filePath(args[1]), (err) => {
      if (err) console.log(err);
      else console.log(`Copié ${args[0]} vers ${args[1]}`);
      updatePrompt();
    });
  } else if (command === 'mv' || command === 'rename') {
    fs.rename(filePath(args[0]), filePath(args[1]), (err) => {
      if (err) console.log(err);
      else console.log(command === 'mv' ? `Déplacé ${args[0]} vers ${args[1]}` : `Renommé ${args[0]} en ${args[1]}`);
      updatePrompt();
    });
  } else if (command === 'del') {
    fs.unlink(filePath(args[0]), (err) => {
      if (err) console.log(err);
      else console.log(`Supprimé ${args[0]}`);
      updatePrompt();
    });
  } else {
    console.log('Commande inconnue');
    updatePrompt();
  }
}

// Commandes promesse async
async function promiseCommands(command, args) {
  const filePath = (name) => path.join(currentDir, name);
  try {
    if (command === 'zip') {
      if (!args[0]) {
        console.log('Usage: zip <fichier>');
      } else {
        await compressGzipPromise(args[0]);
      }
    } else if (command === 'ls') {
      const files = await fs.promises.readdir(currentDir);
      for (const file of files) {
        const fullPath = path.join(currentDir, file);
        const stats = await fs.promises.stat(fullPath);
        console.log(stats.isDirectory() ? `[DIR] ${file}` : file);
      }
      updatePrompt();
      return;
    } else if (command === 'new') {
      await fs.promises.writeFile(filePath(args[0]), '');
      console.log(`Fichier créé : ${args[0]}`);
    } else if (command === 'write') {
      await fs.promises.writeFile(filePath(args[0]), args.slice(1).join(' '));
      console.log(`Ecrit dans ${args[0]}`);
    } else if (command === 'read') {
      const data = await fs.promises.readFile(filePath(args[0]), 'utf8');
      console.log(data);
    } else if (command === 'cp') {
      await fs.promises.copyFile(filePath(args[0]), filePath(args[1]));
      console.log(`Copié ${args[0]} vers ${args[1]}`);
    } else if (command === 'mv' || command === 'rename') {
      await fs.promises.rename(filePath(args[0]), filePath(args[1]));
      console.log(command === 'mv' ? `Déplacé ${args[0]} vers ${args[1]}` : `Renommé ${args[0]} en ${args[1]}`);
    } else if (command === 'del') {
      await fs.promises.unlink(filePath(args[0]));
      console.log(`Supprimé ${args[0]}`);
    } else {
      console.log('Commande inconnue');
    }
  } catch (err) {
    console.log('Erreur:', err.message);
  }
  updatePrompt();
}

// Commandes stream
const streamCommands = {
  read: (filename) => {
    const filePath = path.join(currentDir, filename);
    const rlFile = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });
    rlFile.on('line', (line) => {
      console.log(line);
    });
    rlFile.on('close', () => {
      updatePrompt();
    });
    rlFile.on('error', (err) => {
      console.log('Erreur lecture stream:', err.message);
      updatePrompt();
    });
  },

  cp: async (src, dest) => {
    const srcPath = path.join(currentDir, src);
    const destPath = path.join(currentDir, dest);
    const readable = fs.createReadStream(srcPath);
    const writable = fs.createWriteStream(destPath);
    try {
      await pipelineAsync(readable, writable);
      console.log(`Copié ${src} vers ${dest} (stream)`);
    } catch (err) {
      console.log('Erreur copie stream:', err.message);
    }
    updatePrompt();
  },

  zip: async (filename) => {
    const inputPath = path.join(currentDir, filename);
    const outputPath = inputPath + '.gz';
    const input = fs.createReadStream(inputPath);
    const output = fs.createWriteStream(outputPath);
    const gzip = zlib.createGzip();

    try {
      await pipelineAsync(input, gzip, output);
      console.log(`Fichier compressé en gzip (stream) : ${filename}.gz`);
    } catch (err) {
      console.log('Erreur compression stream:', err.message);
    }
    updatePrompt();
  },

  new: (filename) => {
    const filePath = path.join(currentDir, filename);
    const writable = fs.createWriteStream(filePath);
    writable.end('');
    writable.on('finish', () => {
      console.log(`Fichier créé : ${filename} (stream)`);
      updatePrompt();
    });
    writable.on('error', (err) => {
      console.log('Erreur création stream:', err.message);
      updatePrompt();
    });
  },

  write: (filename, content) => {
    const filePath = path.join(currentDir, filename);
    const writable = fs.createWriteStream(filePath);
    writable.write(content);
    writable.end();
    writable.on('finish', () => {
      console.log(`Ecrit dans ${filename} (stream)`);
      updatePrompt();
    });
    writable.on('error', (err) => {
      console.log('Erreur écriture stream:', err.message);
      updatePrompt();
    });
  },

  del: (filename) => {
    const filePath = path.join(currentDir, filename);
    fs.unlink(filePath, (err) => {
      if (err) {
        console.log('Erreur suppression stream:', err.message);
      } else {
        console.log(`Supprimé ${filename}`);
      }
      updatePrompt();
    });
  },

  mv: (src, dest) => {
    const srcPath = path.join(currentDir, src);
    const destPath = path.join(currentDir, dest);
    fs.rename(srcPath, destPath, (err) => {
      if (err) {
        console.log('Erreur déplacement stream:', err.message);
      } else {
        console.log(`Déplacé ${src} vers ${dest} (stream)`);
      }
      updatePrompt();
    });
  },

  rename: (oldName, newName) => {
    const oldPath = path.join(currentDir, oldName);
    const newPath = path.join(currentDir, newName);
    fs.rename(oldPath, newPath, (err) => {
      if (err) {
        console.log('Erreur renommage stream:', err.message);
      } else {
        console.log(`Renommé ${oldName} en ${newName} (stream)`);
      }
      updatePrompt();
    });
  },

  ls: () => {
    fs.readdir(currentDir, (err, files) => {
      if (err) {
        console.log('Erreur ls:', err.message);
        updatePrompt();
        return;
      }
      let pending = files.length;
      if (pending === 0) {
        updatePrompt();
        return;
      }
      files.forEach(file => {
        const fullPath = path.join(currentDir, file);
        fs.stat(fullPath, (err, stats) => {
          if (!err) {
            console.log(stats.isDirectory() ? `[DIR] ${file}` : file);
          } else {
            console.log(file);
          }
          if (--pending === 0) updatePrompt();
        });
      });
    });
  }
};

function changeMode(newMode) {
  if (['sy', 'ca', 'pr', 'st'].includes(newMode)) {
    mode = newMode;
    console.log(`Mode changé en ${mode}`);
  } else {
    console.log('Mode invalide. Utiliser sy, ca, pr ou st');
  }
  updatePrompt();
}

console.log('Gestionnaire de fichiers (mode sy par défaut)');
updatePrompt();

rl.on('line', async (input) => {
  const [command, ...args] = input.trim().split(' ');
  if (command === 'cd') {
    cd(args[0]);
  } else if (command === 'mode') {
    changeMode(args[0]);
  } else {
    if (mode === 'sy') {
      if (syncCommands[command]) {
        syncCommands[command](...args);
      } else {
        console.log('Commande inconnue');
      }
      updatePrompt();
    } else if (mode === 'ca') {
      callbackCommands(command, args);
    } else if (mode === 'pr') {
      await promiseCommands(command, args);
    } else if (mode === 'st') {
      if (streamCommands[command]) {
        streamCommands[command](...args);
      } else {
        console.log('Commande inconnue');
        updatePrompt();
      }
    } else {
      console.log('Mode inconnu.');
      updatePrompt();
    }
  }
});
