import formidable from 'formidable';
import fs from 'fs';
import path from 'path';
import FormData from 'form-data';
import axios from 'axios';

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async function handler(req, res) {
    const form = new formidable.IncomingForm();
    form.uploadDir = path.join(process.cwd(), 'uploads');
    form.keepExtensions = true;

    form.parse(req, async (err, fields, files) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }

        try {
            const filePath = files.file[0].filepath;
            const formData = new FormData();
            formData.append('file', fs.createReadStream(filePath));

            await axios.post('api/import', formData, {
                headers: {
                    ...formData.getHeaders(),
                },
            });

            res.json({ message: 'Data Imported Successfully' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });
}
