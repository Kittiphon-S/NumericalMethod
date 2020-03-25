import React, { Component } from 'react'
import { Input, Table } from 'antd';
import '../screen.css';
import 'antd/dist/antd.css';
// import { alert, form } from 'reactstrap';
import Plot from 'react-plotly.js';
import math from 'mathjs';
var columns = [
    {
        title: "No.",
        dataIndex: "no",
        key: "no"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    }
];
var x = [], y = [], output = [], tableTag, regressionMatrixX, regressionMatrixY, matrixA, matrixB, answer, fx

class Polynomial extends Component {

    constructor() {
        super();
        tableTag = []
        this.state = {
            nPoints: 6,
            m: 3,
            X: 22,
            showGraph: false,
            showTable: false
        }
        //this.handleChange = this.handleChange.bind(this);


    }
    createTableInput = (n, m) => {
        if (this.state.m > this.state.nPoints) {
            window.alert("Order (m) < nPoints");
        } else {
            x = []
            y = []
            tableTag = []
            for (var i = 1; i <= n; i++) {
                x.push(<Input style={{
                    width: "70%",
                    height: "50%",
                    backgroundColor: "black",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold",
                    justifyContent: "center"
                }}
                    id={"x" + i} key={"x" + i} placeholder={"x" + i} defaultValue={parseInt(i * 5)} />);
                y.push(<Input style={{
                    width: "100%",
                    height: "50%",
                    backgroundColor: "black",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"y" + i} key={"y" + i} placeholder={"y" + i} defaultValue={parseInt(math.random(10))} />);
                tableTag.push({
                    no: i,
                    x: x[i - 1],
                    y: y[i - 1]
                })

            }
            regressionMatrixX = new Array(m + 1)
            regressionMatrixY = new Array(m + 1)
            for (i = 1; i <= m + 1; i++) {
                regressionMatrixX[i] = []
                for (var j = 1; j <= m + 1; j++) {
                    regressionMatrixX[i][j] = []
                }
            }

            this.setState({
                showTable: true
            })
        }
    }
    initialValue = (n, m) => {
        x = new Array(m + 1)
        y = []
        for (var i = 1; i <= n; i++) {
            x[i] = parseFloat(document.getElementById("x" + i).value);

        }
        for (i = 1; i <= n; i++) {
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
    }
    polynomial = (n, m) => {
        var exponent = 1
        //find matrix X
        for (var i = 1; i <= m + 1; i++) {
            for (var j = 1; j <= m + 1; j++) {
                if (i === 1 && j === 1) {
                    regressionMatrixX[i][j] = n
                    continue
                }
                regressionMatrixX[i][j] = this.summation(x, exponent)
                exponent++

            }
            exponent = i
        }
        //find matrix Y
        regressionMatrixY[1] = math.sum(y)
        for (i = 2; i <= m + 1; i++) {
            regressionMatrixY[i] = this.summationOfTwo(x, y, i - 1)
        }
        console.log(regressionMatrixY)
        this.findX(m)

    }
    findX = (m) => {
        output = []
        matrixA = new Array(m + 1)
        matrixB = new Array(m + 1)
        fx = 0
        for (var i = 0; i < m + 1; i++) {
            matrixA[i] = []
            for (var j = 0; j < m + 1; j++) {
                matrixA[i][j] = regressionMatrixX[i + 1][j + 1]
            }
            matrixB[i] = regressionMatrixY[i + 1]
        }
        answer = math.squeeze(math.lusolve(matrixA, matrixB))
        console.log(answer)

        for (i = 0; i <= m; i++) {
            output.push(<h2><p className="text-primary">a<sub>{i}</sub>=&nbsp;&nbsp;{answer[i]}</p></h2>)
            fx += (answer[i] * (math.pow(this.state.X, i)))
        }
        output.push(<h2><p className="text-primary">X = {this.state.X}</p></h2>)
        output.push(<h2><p className="text-primary">F(X) = {fx}</p></h2>)
        this.setState({
            showGraph: true
        })
    }
    summation = (A, exponent) => {
        var sum = 0
        for (var i = 1; i < A.length; i++) {
            sum += Math.pow(A[i], exponent)
        }
        return sum
    }
    summationOfTwo = (x, y, exponent) => {
        var sum = 0
        for (var i = 1; i < y.length; i++) {
            sum += Math.pow(x[i], exponent) * y[i]
        }
        return sum
    }
    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div class="content">
                <div class="container-fluid">

                    <alert color="primary"><h1>Polynomial Regression</h1></alert>

                    <div class="card">
                        <div class="card-body">
                            <form>
                                <div class="form-row" onChange={this.handleChange}>


                                    <div class="form-group col-md-12">
                                        <label for="nPoints"> <p className="text-primary">Number of points (n)</p></label>
                                        <input type="text" class="form-control" name="nPoints" placeholder="6" value={this.state.nPoints} />
                                    </div>
                                    <div class="form-group col-md-12">
                                        <label for="m"><p className="text-primary">Order(m)</p></label>
                                        <input type="text" class="form-control" name="m" placeholder="3" value={this.state.interpolatePoint} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="X"><p className="text-primary">X</p></label>
                                        <input type="text" class="form-control" name="X" placeholder="22" value={this.state.X} />
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success btn-sm btn-block" onClick={
                                () => this.createTableInput(parseInt(this.state.nPoints), parseInt(this.state.m))
                            }>ENTER</button>
                        </div>
                    </div>


                    <br />

                    {this.state.showTable &&
                        <div class="card">
                            <div class="card-body">
                                <h2><p className="text-primary">{parseInt(this.state.m) === 1 ? "Linear" : "Polynomial"} Regression</p></h2>
                                <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", overflowY: "scroll" }}></Table>
                                <div class="card-footer">
                                    <button class="btn btn-success btn-sm btn-block" onClick={() => {
                                        this.initialValue(parseInt(this.state.nPoints), parseInt(this.state.m));
                                        this.polynomial(parseInt(this.state.nPoints), parseInt(this.state.m))
                                    }}>ENTER</button>
                                </div>
                            </div>
                        </div>
                    }


                    <br />

                    {this.state.showGraph &&
                        <div class="card">
                            <div class="card-body">
                                <Plot
                                    data={[

                                        {
                                            x: x,
                                            y: y,
                                            name: "Table",
                                            type: 'scatter',
                                            line: { shape: 'spline' },
                                            marker: { color: 'red' },
                                        },
                                        {
                                            x: [this.state.X],
                                            y: [fx],
                                            name: "Appoximate",
                                            type: 'scatter',
                                            mode: 'markers',
                                            marker: { color: 'orange' },
                                        },
                                    ]}
                                    layout={{ title: 'Polynomial Regression' }}

                                    style={{ width: "100%", float: "left", height: "370px" }}
                                />
                            </div>
                        </div>
                    }

                    <br />

                    {this.state.showGraph &&
                        <div class="card">
                            <div class="card-body">

                                <h2><p className="text-primary" style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p></h2>


                            </div>
                        </div>
                    }

                </div>

            </div>
        );
    }
}
export default Polynomial;