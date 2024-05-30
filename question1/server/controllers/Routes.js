import express from 'express';
import axios from 'axios';

const router = express.Router();

const authenticate = async () => {
    try {
        const authResponse = await axios.post('http://20.244.56.144/test/auth', {
            companyName: 'affordmed',
            clientID: '432067d4-3ad7-4e3a-a16c-bd6148b31519',
            clientSecret: 'VbVYENSiFtRRXDOi',
            ownerName: 'A Sai Bharath',
            ownerEmail: 'asb.bharath601@gmail.com',
            rollNo: '245521733130',
        }, {
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const { access_token } = authResponse.data;
        if (!access_token) {
            throw new Error('Authentication failed, no token received');
        }
        return access_token;
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        throw new Error('Authentication failed');
    }
};

const calculateAsciiSum = (str) => {
    return str.split('').reduce((sum, char) => sum + char.charCodeAt(0), 0);
};

const encodeProductId = (product) => {
    const { productName, price, rating, discount } = product;
    const asciiSum = calculateAsciiSum(productName);
    const id = ((price * 100 + rating * 10 + discount) + asciiSum).toFixed(0);
    return id;
};

const decodeProductId = (id, productName) => {
    const asciiSum = calculateAsciiSum(productName);
    const combinedValue = parseInt(id, 10) - asciiSum;
    const discount = combinedValue % 10;
    const rating = Math.floor((combinedValue % 100) / 10);
    const price = Math.floor(combinedValue / 100);
    return { price, rating, discount };
};

router.get('/companies/:companyname/categories/:categoryname/products', async (req, res) => {
    try {
        const access_token = await authenticate();

        const { companyname, categoryname } = req.params;
        const { top, minPrice, maxPrice } = req.query;

        const productsResponse = await axios.get(`http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
            params: {
                top,
                minPrice,
                maxPrice,
            },
        });

        const productsWithId = productsResponse.data.map(product => ({
            ...product,
            id: encodeProductId(product),
        }));

        return res.json(productsWithId);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


router.get('/companies/:companyname/categories/:categoryname/products/:productid', async (req, res) => {
    try {
        const access_token = await authenticate();

        const { companyname, categoryname, productid } = req.params;

        const productResponse = await axios.get(`http://20.244.56.144/test/companies/${companyname}/categories/${categoryname}/products/${productid}`, {
            headers: {
                Authorization: `Bearer ${access_token}`,
            },
        });

        const product = productResponse.data;

        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Encode the product ID
        product.id = encodeProductId(product);

        return res.json(product);
    } catch (error) {
        console.error('Error:', error.response ? error.response.data : error.message);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});


export default router;
