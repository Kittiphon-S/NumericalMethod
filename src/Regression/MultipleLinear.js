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
var x = [], y = [], xi = [], tempTag = [], output = [], tableTag, fx, regressionMatrixX, regressionMatrixY, matrixA, matrixB, answer

class MultipleLinear extends Component {

    constructor() {
        super();


        tableTag = []
        this.state = {
            nPoints: 6,
            X: 3,
            showGraph: false,
            showTable: false
        }
        //this.handleChange = this.handleChange.bind(this);


    }
    createTableInput = (n, X) => {
        if (this.state.X > this.state.nPoints) {
            window.alert("nX < nPoints");
        } else {
            x = []
            y = []
            tableTag = []
            tempTag = []
            for (var i = 1; i <= n; i++) {
                x[i] = []
                for (var j = 1; j <= X; j++) {
                    x[i].push(<Input style={{
                        width: "70%",
                        height: "50%",
                        backgroundColor: "black",
                        marginInlineEnd: "5%",
                        marginBlockEnd: "5%",
                        color: "white",
                        fontSize: "18px",
                        fontWeight: "bold",
                        justifyContent: "center",
                    }}
                        id={"x" + i + "" + j} key={"x" + i + "" + j} placeholder={"x" + i + "" + j} defaultValue={parseInt(math.random(10))} />);
                }
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
                    x: x[i],
                    y: y[i - 1]
                })

            }
            for (var i = 1; i <= X; i++) {
                tempTag.push(<Input style={{
                    width: "14%",
                    height: "50%",
                    backgroundColor: "black",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"xi" + i} key={"xi" + i} placeholder={"X" + i} defaultValue={parseInt(math.random(10))} />)
            }

            regressionMatrixX = new Array(X + 1)
            regressionMatrixY = new Array(X + 1)
            for (i = 1; i <= X + 1; i++) {
                regressionMatrixX[i] = []
                for (j = 1; j <= X + 1; j++) {
                    regressionMatrixX[i][j] = []
                }
            }

            this.setState({
                showTable: true
            })
        }
    }
    initialValue = (n, X) => {
        x = new Array(X + 1)
        y = []
        for (var i = 1; i <= X; i++) {
            x[i] = []
            for (var j = 1; j <= n; j++) {
                x[i][j] = parseInt(document.getElementById("x" + j + "" + i).value);
            }
        }
        for (i = 1; i <= n; i++) {
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
        xi[0] = 1
        for (i = 1; i <= X; i++) {
            xi[i] = parseInt(document.getElementById("xi" + i).value);
        }
    }
    multipleLinear = (n, X) => {
        for (var i = 1; i <= X + 1; i++) {
            for (var j = i; j <= X + 1; j++) {
                if (i === 1) {
                    if (j === 1) {
                        regressionMatrixX[i][j] = n
                        regressionMatrixY[j] = this.summation(y)
                    }
                    else {
                        regressionMatrixX[i][j] = regressionMatrixX[j][i] = this.summation(x[j - 1])
                        regressionMatrixY[j] = this.summationOfTwo(x[j - 1], y)
                    }


                }
                else {
                    regressionMatrixX[i][j] = regressionMatrixX[j][i] = this.summationOfTwo(x[i - 1], x[j - 1])
                }
            }
        }
        this.findX(X)
    }
    findX = (X) => {
        output = []
        fx = 0
        matrixA = new Array(X + 1)
        matrixB = new Array(X + 1)
        for (var i = 0; i < X + 1; i++) {
            matrixA[i] = []
            for (var j = 0; j < X + 1; j++) {
                matrixA[i][j] = regressionMatrixX[i + 1][j + 1]
            }
            matrixB[i] = regressionMatrixY[i + 1]
        }
        answer = math.squeeze(math.lusolve(matrixA, matrixB))
        console.log(answer)
        for (i = 0; i <= X; i++) {
            output.push(<h2><p className="text-primary">a<sub>{i}</sub>=&nbsp;&nbsp;{answer[i]}</p></h2>)
            fx += (answer[i] * xi[i])
        }
        for (i = 1; i <= X; i++) {
            output.push(<h2><p className="text-primary">X<sub>{i}</sub>={xi[i]}</p></h2>)
        }
        output.push(<h2><p className="text-primary">F(X) = {fx}</p></h2>)

        this.setState({
            showGraph: true
        })
    }
    summation = (A) => {
        var sum = 0
        for (var i = 1; i < A.length; i++) {
            sum += A[i]
        }
        return sum
    }
    summationOfTwo = (A, B) => {
        var sum = 0
        for (var i = 1; i < A.length; i++) {
            sum += A[i] * B[i]
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

                    <alert color="primary"><h1>Multiple Linear Regression</h1></alert>

                    <div class="card">
                        <div class="card-body">
                            <form>
                                <div class="form-row" onChange={this.handleChange}>


                                    <div class="form-group col-md-12">
                                        <label for="nPoints"> <p className="text-primary">Number of points (n)</p></label>
                                        <input type="text" class="form-control" name="nPoints" placeholder="6" value={this.state.nPoints} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="X"><p className="text-primary">Number of X</p></label>
                                        <input type="text" class="form-control" name="X" placeholder="3" value={this.state.X} />
                                    </div>

                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success btn-sm btn-block" onClick={
                                () => this.createTableInput(parseInt(this.state.nPoints), parseInt(this.state.X))
                            }>ENTER</button>
                        </div>
                    </div>


                    <br />

                    {this.state.showTable &&
                        <div class="card">
                            <div class="card-body">
                                <h2><p className="text-primary">Multiple Regression</p></h2>
                                <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", overflowY: "scroll" }}></Table>

                                <h2><p className="text-primary">X<sub>i</sub></p></h2>
                                <h2>{tempTag}</h2>

                                <div class="card-footer">
                                    <button class="btn btn-success btn-sm btn-block" onClick={() => {
                                        this.initialValue(parseInt(this.state.nPoints), parseInt(this.state.X));
                                        this.multipleLinear(parseInt(this.state.nPoints), parseInt(this.state.X))
                                    }}
                                    >ENTER</button>
                                </div>
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
export default MultipleLinear;