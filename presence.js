const fs = require('fs')
var cp = require("child_process")
var rpc = require("discord-rpc")
const client = new rpc.Client({ transport: 'ipc' })


function richPresence() {
    try {
        client_id = "976487926047326238"
        client.on('ready', () => {
            client.request('SET_ACTIVITY', {
                pid: process.pid,
                activity: {
                    "details": "Programmes sportifs gratuits",
                    // emoji : {
                    // 		"id": "901498744976056381",
                    // 		"name": "LogoEDT",
                    // 		"animated": false
                    // 	  },
                    "assets": {
                        "large_image": "icon",
                        "large_text": "Ecole du Tigre"
                    },
                    "buttons": [{ "label": "Rejoindre le serveur", "url": "https://discord.gg/ecoledutigre" },

                    { "label": "Linktr.ee", "url": "https://linktr.ee/ecoledutigre" }]
                }
            })
            // fs.appendFileSync('./log.txt', (Date() + ' Sucess\n'))
            return "Done"
        })
        client.login({ clientId: client_id }).catch(console.error);
    }
    catch(err)
    {
        // fs.appendFileSync('./log.txt', (Date() + ' Echec richePresence'+ err +'\n'))
    }
}


module.exports = {
    main: function() {
        if (process.platform == "darwin") {
                setInterval(function () {
                    cp.exec(`pgrep Discord`, (err, stdout, stderr) => {
                        if (stdout) { richPresence();
                        // fs.appendFileSync('./log.txt', (Date() + ' Lancement richePresence\n'))
                    }
                    });
                }, 10000)
        }
        
        if (process.platform == "win32") {
            setInterval(function () {
            cp.exec(`tasklist /FI "ImageName eq Discord.exe"`, (err, stdout, stderr) => {
                if (stdout[0] != "I") { richPresence() 
                    // fs.appendFileSync('./log.txt', (Date.now() + 'Lancement richePresence'))
                }
            });
            }, 10000)
        }
        
        if (process.platform == "linux") {
            setInterval(function () {
                cp.exec(`pgrep Discord`, (err, stdout, stderr) => {
                    if (stdout) { richPresence();
                    // fs.appendFileSync('./log.txt', (Date() + ' Lancement richePresence\n'))
                }
                });
            }, 10000)
        }
    }
}