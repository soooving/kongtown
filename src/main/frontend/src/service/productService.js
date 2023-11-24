import axios from 'axios';

class productService {
    /* list */
    getProduct() {
        return axios.get('/api/manage/product/list');
    }
    /* select one */
    getProductOne(param) {
        return axios.post('/api/manage/product/select', param);
    }
    /* save */
    saveProduct(param) {
        return axios.post('/api/manage/product/save', param);
    }
    /* rental list */
    getProductRentalList() {
        return axios.post('/api/product/rental/list');
    }
    /* rental save */
    rentalProduct(param) {
        return axios.post('/api/product/rental', param);
    }
}

export default new productService();