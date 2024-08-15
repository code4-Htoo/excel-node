const express = require('express');
const multer = require('multer');
const { Sequelize, DataTypes, Op } = require('sequelize');
const XLSX = require('xlsx');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(express.json());

const sequelize = new Sequelize('postgres://postgres:password@localhost:5432/db_excel_node');

const Data = sequelize.define('Data', {
    FirstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    LastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Gender: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Country:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Age:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    Date:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Id:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'data'
});

sequelize.sync();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null,file.originalname)
  }
})

const upload = multer({ storage: storage });

app.use(cors({
    origin: 'http://localhost:3000',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
}));

// Set allowed HTTP methods for a specific route
app.options('/api/data', cors({
    methods: ['GET', 'POST', 'PUT']
}));

app.post('/api/import', upload.single('file'), async (req, res) => {
    try {
        const filePath = path.join(__dirname, 'uploads/'+req.file.filename);
        const workbook = XLSX.readFile(filePath);
        const sheetName = workbook.SheetNames[0];
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
        for (const item of data) {
            try {
                const existingItem = await Data.findOne({ where: { Id: item.Id } });
                if (!existingItem) {
                    await Data.create(item);
                } else {
                    console.log(`Duplicate Id found: ${item.Id}, skipping item.`);
                }
            } catch (innerError) {
                console.error(`Error processing item with Id: ${item.Id}`, innerError);
            }
        }
        res.status(200).send('File uploaded and processed successfully');
    } catch (error) {
        res.status(500).json({ error: error.message});
    }
});

app.get('/api/list', async (req, res) => {
    try {
        const data = await Data.findAll();
        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// app.get('/api/data', async (req, res) => {
//     try {
//         const { search } = req.query;
//         const whereClause = search ? {
//             [Op.or]: [
//                 { FirstName: { [Op.iLike]: `%${search}%` } },
//                 // { idNumber: { [Op.iLike]: `%${search}%` } }
//             ]
//         } : {};

//         const data = await Data.findAll({
//             where: whereClause,
//             order: [['FirstName', 'ASC']]
//         });

//         res.json(data);
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

// Start server
app.listen(8000, () => {
    console.log('Server is running on port 8000');
});