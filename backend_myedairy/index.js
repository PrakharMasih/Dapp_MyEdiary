require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors')

app.use(cors())
app.use(express.json());
const ethers = require('ethers');

const { API_URL, PRIVATE_KEY, CONTRACT_ADDRESS } = process.env;
const { abi } = require('./artifacts/contracts/MyEDiary.sol/MyeDiary.json');

// console.log('ABI', abi)

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const contractInstance = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
// console.log(contractInstance);

console.log(API_URL)
var port = 8000;

app.get('/', async (req, res) => {                   //OK
    async function fetchAllData () {
        const data = await contractInstance.getAllEntry();

        if(data.length <= 0){
            return res.json("No data present");
        }

        const newData = data.map((curr, i) => {
            const timeInSeconds = new Date(parseInt(`${curr[0]._hex}`, 16) * 1000).toLocaleDateString('en-GB', { timeZone: 'UTC' });
            // console.log(timeInSeconds)
            return [
                timeInSeconds , 
                curr[1]
            ]
        })
        return res.json(newData);
    }
    try{
        fetchAllData();
    }
    catch(error){
        console.error(error);
    }
});

app.post('/', async (req, res) => {                  //OK
    const { content } = req.body;
    console.log(req.body)
    if(content.length < 0){
        return res.json("Content should not be empty");
    }
    async function createApi() {
        const tx = await contractInstance.createEntry(content);
        await tx.wait();
        return res.json('Success');
    }
    try{
        createApi();
    }
    catch(error){
        console.error(error);
    }
});

app.get('/:id', async (req, res) => {                //Ok
    const {id} = req.params;
    // console.log(id);
    async function call() {
        const tx = await contractInstance.readEntry(id);
        const timeInSeconds = new Date(parseInt(`${tx[0]._hex}`, 16) * 1000).toLocaleString();
        return res.json([timeInSeconds, tx[1]]);
    }
    try {
        call()
    } catch (error) {
        console.error(error)
    }
});

app.put('/', async (req, res) => {
    const { index, content } = req.body;
    async function updateApi() {
        const update = await contractInstance.updateEntry(index, content);
        return res.json("Sucessfully updated");
    }
    try{
        updateApi();
    }
    catch(e){
        console.error(e);
    }
});

app.delete('/', async (req, res) => {
    const {id} = req.body;
    async function delteApi() {
        await contractInstance.deleteEntry(id);
        return res.json("Deleted");
    }
    try{
        delteApi();
    }
    catch(e){
        console.error(e);
    }
})

app.listen(port, () => console.log(`server live in ${port}`));