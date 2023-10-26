import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { router as userRouter } from './src/router/user-router';
import { router as blogRouter } from './src/router/blog-router';

const app = express();
const port = 3000;

app.use(express.json());

app.use(cors({
  origin: '*',
  methods: 'GET, POST, PUT, PATCH, DELETE',
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, x-access-token',
  credentials: true,
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//---------------------------------------
app.use('/user', userRouter);
app.use('/blog', blogRouter);

//---------------------------------------

app.listen(port, () => {
  console.log(`Server running at port :${port}`);
});