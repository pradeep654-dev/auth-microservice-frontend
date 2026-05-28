require ("dotenv").config();
const express = require ('express');
const cors =require ('cors');
const morgan = require('morgan');
const conectDB = require('./config/db')
const router = require ('./userRoutes')
const authRouter = require ('./authRoutes')


const app = express();


//Middlewar
app.use(express.json());
// app.use(cors());

app.use(cors({
   origin: 'https://aetherauth.netlify.app', // ✅ NO trailing slash
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(morgan('dev'));

app.use('/api',router)
app.use('/api/auth',authRouter)
app.get('/health', (req, res) => {
  res.status(200).send('Healthy');
});
conectDB()
const PORT = process.env.PORT || 8000;
app.listen(PORT, '0.0.0.0', () => console.log(`server start on ${PORT}`));
