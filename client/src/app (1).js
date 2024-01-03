const express = require("express");
const fs = require('fs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.get("/getqsms", (req, res) => {
    const folderPath = './qcms';
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).send('Error reading folder');
        }
        const jsonData = [];

        files.forEach(file => {  // Change 'jsonFiles' to 'files'
            const filePath = `${folderPath}/${file}`;
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            try {
                const parsedData = JSON.parse(fileContent);
                jsonData.push(parsedData);
            } catch (error) {
                console.error(`Error parsing JSON file ${file}: ${error.message}`);
            }
        });

        res.json(jsonData);
    });
});
app.post("/addqcm", (req, res) => {
    const qcm = req.body

    const fileName = `./qcms/${qcm.title}.json`;
    fs.writeFile(fileName, JSON.stringify(qcm), (err) => {
        if (err) throw err;
        console.log('QCM data saved to', fileName);
    });
    res.send({ message: true })
})
app.delete("/deleteqcm", (req, res) => {
    const qcmName = req.body.qcmName
    const fileName = `./qcms/${qcmName}.json`;
    fs.unlink(fileName, (err) => {
        console.log('File deleted:', fileName);
        res.status(200).json({ message: 'File deleted successfully' });
    })
})




const port = 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
