const readline = require('node:readline');
const fs= require('fs');
const zlib= require('zlib');
const rl= readline.createInterface({
    input: process.stdin,
    output: process.stdout
});
//create function
//callBack
function createCallBack(fileName, content)
{
    fs.writeFile(fileName, content, (err)=>{
        if(err)
        {
            console.error(err.message);
        }
        else
        {
            console.log(`le fichier ${fileName} a été créé`);
            rl.prompt();
        };
    });
}
//promise
function createPromise(fileName, content)
{
    fs.promises.writeFile(fileName, content)
    .then(()=>{
        console.log(`le fichier ${fileName} a été créé`);
        rl.prompt();
    })
    .catch((err)=>{
        console.error(err.message);
    });
}
//sync
function createSync(fileName, content)
{
    fs.writeFileSync(fileName, content);
    console.log(`le fichier ${fileName} a été créé`);
    rl.prompt();

}
//readfile function
//readfile 
function readFileCB(fileName){
    fs.readFile(fileName, 'utf-8', (err, data)=>{
        if(err)
        {
            console.error(err.message);
        }
        else
        {
            console.log(data);
            rl.prompt();
        }
    });
}
//promise
function readFilePromise(fileName){
    fs.promises.readFile(fileName, 'utf-8')
    .then((data)=>{
        console.log(data);
        rl.prompt();
    })
    .catch((err)=>{
        console.error(err.message);
    });
}
//sync
function readFileSync(fileName){
    const data = fs.readFileSync(fileName, 'utf-8');
    console.log(data);
    rl.prompt();
}
//createFolder function
//callback
function createFolderCB(folderName){
    fs.mkdir(folderName, (err)=>{
        if(err)
        {
            console.error(err.message);
        }
        else
        {
            console.log(`le dossier ${folderName} a été créé`);
            rl.prompt();
        }

    });
}

//promise
function createFolderPromise(folderName){
    fs.promises.mkdir(folderName)
    .then(()=>{
        console.log(`le dossier ${folderName} a été créé`);
        rl.prompt();
    })
    .catch((err)=>{
        console.error(err.message);
    });
}
//sync
function createFolderSync(folderName){
    fs.mkdirSync(folderName);
    console.log(`le dossier ${folderName} a été créé`);
    rl.prompt();
}
//copie functions
//callback
function copyFileCB(source, destination){
    fs.copyFile(source, destination, (err)=>{
        if(err)
        {
            console.error(err.message);
        }
        else
        {
            console.log(`le fichier ${source} a été copié dans ${destination}`);
            rl.prompt();
        }
    });
}
//promise
function copyFilePromise(source, destination){
    fs.promises.copyFile(source, destination)
    .then(()=>{
        console.log(`le fichier ${source} a été copié dans ${destination}`);
        rl.prompt();
    })
    .catch((err)=>{
        console.error(err.message);
    });
}
//sync
function copyFileSync(source, destination){
    fs.copyFileSync(source, destination);
    console.log(`le fichier ${source} a été copié dans ${destination}`);
    rl.prompt();
}
//rename and move functions
//callback
function renameFileCB(source, destination){
    fs.rename(source, destination, (err)=>{
        if(err)
        {
            console.error(err.message);
        }
        else
        {
            console.log(`le fichier ${source} a été renommé dans ${destination}`);
            rl.prompt();
        }
    });
}
//promise
function renameFilePromise(source, destination){
    fs.promises.rename(source, destination)
    .then(()=>{
        console.log(`le fichier ${source} a été renommé dans ${destination}`);
        rl.prompt();
    })
    .catch((err)=>{
        console.error(err.message);
    });
}
//sync
function renameFileSync(source, destination){
    fs.renameSync(source, destination);
    console.log(`le fichier ${source} a été renommé dans ${destination}`);
    rl.prompt();
}
//delete functions
//callback
function deleteFileCB(fileName){
    fs.unlink(fileName, (err)=>{
        if(err)
        {
            console.error(err.message);
        }
        else
        {
            console.log(`le fichier ${fileName} a été supprimé`);
            rl.prompt();
        }
    });
}

function deleteFilePromise(fileName){
    fs.promises.unlink(fileName)
    .then(()=>{
        console.log(`le fichier ${fileName} a été supprimé`);
        rl.prompt();
    })
    .catch((err)=>{
        console.error(err.message);
    });
}

//sync
function deleteFileSync(fileName){
    fs.unlinkSync(fileName);
    console.log(`le fichier ${fileName} a été supprimé`);
    rl.prompt();
}

// zip (compression) functions 

// Callback
function zipFileCB(source, destination) {
    if (!destination) {
        destination = source + ".zip";
    }

    fs.readFile(source, (err, data) => {
        if (err) return console.error(err.message);

        zlib.gzip(data, (err, compressed) => {
            if (err) return console.error(err.message);

            fs.writeFile(destination, compressed, (err) => {
                if (err) return console.error(err.message);

                console.log(`Le fichier ${source} a été compressé en ${destination}`);
                rl.prompt();
            });
        });
    });
}

// Promise
function zipFilePromise(source, destination) {
    if (!destination) {
        destination = source + ".zip";
    }

    fs.promises.readFile(source)
    .then(data => zlib.gzipSync(data))
    .then(compressed => fs.promises.writeFile(destination, compressed))
    .then(() => {
        console.log(`Le fichier ${source} a été compressé en ${destination}`);
        rl.prompt();
    })
    .catch(err => console.error(err.message));
}



// Sync
function zipFileSync(source, destination) {
    if (!destination) {
        destination = source + ".zip";
    }
    const data = fs.readFileSync(source);
    const compressed = zlib.gzipSync(data);
    fs.writeFileSync(destination, compressed);
    console.log(`Le fichier ${source} a été compressé en ${destination}`);
    rl.prompt();
}



rl.setPrompt(process.cwd() + '> ');
rl.prompt();
rl.on('line', (input)=>{
    switch(input.split(' ')[0]){
        case 'mode':
            if(input.split(' ')[1] && ['ca', 'pr', 'sy'].includes(input.split(' ')[1])){
                mode = input.split(' ')[1];
                console.log(`Mode changé en ${mode}`);
            }else{
                console.log('Usage: mode [ca|pr|sy]');
            }
            break;
        case 'new':
            if(input.split(' ').length >= 3){
                let fileName = input.split(' ')[1];
                let content = input.split(' ').slice(2).join(' ');
                if(mode == 'ca') createCallBack(fileName, content);
                else if(mode == 'pr') createPromise(fileName, content);
                else if(mode == 'sy') createSync(fileName, content);
            }else{
                console.log('Usage: createFile <fileName> <content>');
            }
            rl.prompt();
            break;
            case 'write':
            if(input.split(' ').length >= 3){
                let fileName = input.split(' ')[1];
                let content = input.split(' ').slice(2).join(' ');
                if(mode == 'ca') createCallBack(fileName, content);
                else if(mode == 'pr') createPromise(fileName, content);
                else if(mode == 'sy') createSync(fileName, content);
            }else{
                console.log('Usage: createFile <fileName> <content>');
            }
            rl.prompt();
            break;
        case 'read':
            if(input.split(' ').length == 2){
                let fileName = input.split(' ')[1];
                if(mode == 'ca') readFileCB(fileName);
                else if(mode == 'pr') readFilePromise(fileName);
                else if(mode == 'sy') readFileSync(fileName);
            }else{
                console.log('Usage: readFile <fileName>');
            }
            break;
        case 'nf':
            if(input.split(' ').length == 2){
                let folderName = input.split(' ')[1];
                if(mode == 'ca') createFolderCB(folderName);
                else if(mode == 'pr') createFolderPromise(folderName);
                else if(mode == 'sy') createFolderSync(folderName);
            }else{
                console.log('Usage: createFolder <folderName>');
            }
            break;
        case 'cp':
            if(input.split(' ').length == 3){
                let source = input.split(' ')[1];
                let destination = input.split(' ')[2];
                if(mode == 'ca') copyFileCB(source, destination);
                else if(mode == 'pr') copyFilePromise(source, destination);
                else if(mode == 'sy') copyFileSync(source, destination);
            }else{
                console.log('Usage: copyFile <source> <destination>');
            }
            break;
        case 'rename':
            if(input.split(' ').length == 3){
                let source = input.split(' ')[1];
                let destination = input.split(' ')[2];
                if(mode == 'ca') renameFileCB(source, destination);
                else if(mode == 'pr') renameFilePromise(source, destination);
                else if(mode == 'sy') renameFileSync(source, destination);
            }else{
                console.log('Usage: renameFile <source> <destination>');
            }
            break;
        case 'del':
            if(input.split(' ').length == 2){
                let fileName = input.split(' ')[1];
                if(mode == 'ca') deleteFileCB(fileName);
                else if(mode == 'pr') deleteFilePromise(fileName);
                else if(mode == 'sy') deleteFileSync(fileName);
            }else{
                console.log('Usage: deleteFile <fileName>');
            }
            break;
        case 'mv':
            if(input.split(' ').length == 3){
                let source = input.split(' ')[1];
                let destination = input.split(' ')[2];
                if(mode == 'ca') renameFileCB(source, destination);
                else if(mode == 'pr') renameFilePromise(source, destination);
                else if(mode == 'sy') renameFileSync(source, destination);
            }else{
                console.log('Usage: moveFile <source> <destination>');
            }
            break;
        case 'ls':
            fs.readdirSync(process.cwd()).forEach(file => {
                const stat = fs.statSync(file);
                dir = stat.isDirectory() ? '/' : '';
                console.log(file + dir);
            });
            break;
        case 'cd':
            if(input.split(' ').length == 2){
                let dir = input.split(' ')[1];
                try{
                    process.chdir(dir);
                    console.log('Directory changed to', process.cwd());
                }
                catch(err){
                    console.error('chdir error:', err.message);
                }
            }else{
                console.log('Usage: cd <directory>');
            }
            break;
        case 'zip':
            if(input.split(' ').length >= 2){
                let source = input.split(' ')[1];
                let destination = input.split(' ')[2];
                if(mode == 'ca') zipFileCB(source, destination);
                else if(mode == 'pr') zipFilePromise(source, destination);
                else if(mode == 'sy') zipFileSync(source, destination);
            }else{
                console.log('Usage: zipFile <source> [destination]');
            }
            break;
        default:
            console.log('Command not found');
            break;
        
    }
    rl.setPrompt(process.cwd() + '> ');
    rl.prompt();
})
let mode = 'sy';