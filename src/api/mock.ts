import AxiosMockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new AxiosMockAdapter(axios);

export default mock;
