import React, { Component } from 'react';
import ProductService from '../service/productService';

class signup extends Component {
    constructor(props) {
        super(props)
        // # 1.
        this.state = {
            products: []
        }

    }
    // # 2.
    componentDidMount() {
        ProductService.getProductSignupList().then((res) => {
            this.setState({ products: res.data});
        });
    }

    signup(rtCode, state){
        console.log(state)
        let param = {
            rtCode: rtCode,
            rtState: state
        };

        ProductService.signupProduct(param).then((res) => {
            if(res.data >= 0) {
                let stateV = state==='apply' ? '승인' : '반려';
                alert('성공적으로 '+ stateV +'되었습니다 !');

                return window.location.reload();
            }
        });
    }

    render() {
        return (
            <div className={"manage-product"}>
                <div className={"title-area-h4"}>
                    <h4>물품 신청 관리</h4>
                </div>

                <div className={"table-area"}>
                    <table className={"product-table01"}>
                        <thead>
                        <tr>
                            <td>순번</td>
                            <td>신청코드</td>
                            <td>물품명</td>
                            <td>신청자명</td>
                            <td>신청상태</td>
                            <td>승인/반려</td>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            this.state.products.map(
                                item =>
                                    <tr key = {item.rtCode}>
                                        <td> {item.num} </td>
                                        <td> {item.rtCode} </td>
                                        <td> {item.itemName} </td>
                                        <td> {item.userId} </td>
                                        <td> {
                                            item.state === 'ready' ? '승인대기'
                                                : item.state === 'apply' ? '대여승인' : '대여반려'
                                        } </td>
                                        <td>{
                                            item.state === 'ready' ?
                                                <div className={"button-area button-area-td"}>
                                                    <button type={"button"} className={"btn-save"} onClick={() => this.signup(item.rtCode, 'apply')}>승인</button>
                                                    <button type={"button"} className={"btn-save"} onClick={() => this.signup(item.rtCode, 'cancel')}>반려</button>
                                                </div>
                                                : ''
                                        }</td>
                                    </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default signup