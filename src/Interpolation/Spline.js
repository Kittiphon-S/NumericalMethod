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
var x = [], y = [], tableTag = [], answer

class Spline extends Component {

    constructor() {
        super();
        this.state = {
            nPoints: 6,
            X: 3.2,

            showGraph: false,
            showTable: false
        }
        //this.handleChange = this.handleChange.bind(this);

    }


    createTableInput = (n) => {
        x = []
        y = []
        tableTag = []
        for (var i = 1; i <= n; i++) {
            x.push(<Input style={{
                width: "100%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"x" + i} key={"x" + i} placeholder={"x" + i} defaultValue={parseInt(1 * i)} />);
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
                id={"y" + i} key={"y" + i} placeholder={"y" + i} defaultValue={parseInt(math.random(-10, 10))} />);
            tableTag.push({
                no: i,
                x: x[i - 1],
                y: y[i - 1]
            });
        }


        this.setState({

            showTable: true

        })
    }
    initialValue = (X) => {
        x = []
        y = []
        for (var i = 0; i < this.state.nPoints; i++) {
            x[i] = parseFloat(document.getElementById("x" + (i + 1)).value);
            y[i] = parseFloat(document.getElementById("y" + (i + 1)).value);
        }
        answer = this.spline(X, x, y)
    }
    spline = (x, xs, ys) => {
        var ks = xs.map(function () { return 0 })
        ks = this.getNaturalKs(xs, ys, ks)
        var i = 1;
        while (xs[i] < x) i++;
        var t = (x - xs[i - 1]) / (xs[i] - xs[i - 1]);
        var a = ks[i - 1] * (xs[i] - xs[i - 1]) - (ys[i] - ys[i - 1]);
        var b = -ks[i] * (xs[i] - xs[i - 1]) + (ys[i] - ys[i - 1]);
        var q = (1 - t) * ys[i - 1] + t * ys[i] + t * (1 - t) * (a * (1 - t) + b * t);
        console.log(q)
        this.setState({

            showGraph: true

        })

        return q;
    }

    getNaturalKs = (xs, ys, ks) => {
        var n = xs.length - 1;
        var A = this.zerosMat(n + 1, n + 2);

        for (var i = 1; i < n; i++)  // rows
        {
            A[i][i - 1] = 1 / (xs[i] - xs[i - 1]);
            A[i][i] = 2 * (1 / (xs[i] - xs[i - 1]) + 1 / (xs[i + 1] - xs[i]));
            A[i][i + 1] = 1 / (xs[i + 1] - xs[i]);
            A[i][n + 1] = 3 * ((ys[i] - ys[i - 1]) / ((xs[i] - xs[i - 1]) * (xs[i] - xs[i - 1])) + (ys[i + 1] - ys[i]) / ((xs[i + 1] - xs[i]) * (xs[i + 1] - xs[i])));
        }

        A[0][0] = 2 / (xs[1] - xs[0]);
        A[0][1] = 1 / (xs[1] - xs[0]);
        A[0][n + 1] = 3 * (ys[1] - ys[0]) / ((xs[1] - xs[0]) * (xs[1] - xs[0]));

        A[n][n - 1] = 1 / (xs[n] - xs[n - 1]);
        A[n][n] = 2 / (xs[n] - xs[n - 1]);
        A[n][n + 1] = 3 * (ys[n] - ys[n - 1]) / ((xs[n] - xs[n - 1]) * (xs[n] - xs[n - 1]));

        return this.solve(A, ks);
    }

    solve = (A, ks) => {
        var m = A.length;
        for (var k = 0; k < m; k++)  // column
        {
            // pivot for column
            var i_max = 0; var vali = Number.NEGATIVE_INFINITY;
            for (var i = k; i < m; i++) if (A[i][k] > vali) { i_max = i; vali = A[i][k]; }
            this.swapRows(A, k, i_max);

            // for all rows below pivot
            for (i = k + 1; i < m; i++) {
                for (var j = k + 1; j < m + 1; j++)
                    A[i][j] = A[i][j] - A[k][j] * (A[i][k] / A[k][k]);
                A[i][k] = 0;
            }
        }
        for (i = m - 1; i >= 0; i--) // rows = columns
        {
            var v = A[i][m] / A[i][i];
            ks[i] = v;
            for (j = i - 1; j >= 0; j--) // rows
            {
                A[j][m] -= A[j][i] * v;
                A[j][i] = 0;
            }
        }
        console.log(A)
        return ks;
    }

    zerosMat = (r, c) => {
        var A = [];
        for (var i = 0; i < r; i++) {
            A.push([]);
            for (var j = 0; j < c; j++) A[i].push(0);
        }
        return A;
    }

    swapRows = (m, k, l) => {
        var p = m[k]; m[k] = m[l]; m[l] = p;
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

                    <alert color="primary"><h1>Spline Interpolation</h1></alert>

                    <div class="card">
                        <div class="card-body">
                            <form>
                                <div class="form-row" onChange={this.handleChange}>


                                    <div class="form-group col-md-12">
                                        <label for="nPoints"> <p className="text-primary">Number of points (n)</p></label>
                                        <input type="text" class="form-control" name="nPoints" placeholder="6" value={this.state.nPoints} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <label for="X"><p className="text-primary">X</p></label>
                                        <input type="text" class="form-control" name="X" placeholder="3.2" value={this.state.X} />
                                    </div>


                                </div>
                            </form>
                        </div>
                        <div class="card-footer">
                            <button class="btn btn-success btn-sm btn-block" onClick={
                                () => {
                                    this.createTableInput(parseInt(this.state.nPoints))
                                }
                            }>ENTER</button>
                        </div>
                    </div>


                    <br />

                    {this.state.showTable &&
                        <div class="card">
                            <div class="card-body">

                                <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black", overflowY: "scroll" }}></Table>

                                <div class="card-footer">
                                    <button class="btn btn-success btn-sm btn-block" onClick={
                                        () => this.initialValue(parseFloat(this.state.X))
                                    }>ENTER</button>
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
                                            mode: 'lines',
                                            marker: { color: 'red' },
                                        },
                                        {
                                            x: [this.state.X],
                                            y: [answer],
                                            name: "Appoximate",
                                            type: 'scatter',
                                            mode: 'markers',
                                            marker: { color: 'orange' },
                                        },


                                    ]}
                                    layout={{ title: 'Spline Interpolation' }}

                                    style={{ width: "100%", float: "left", height: "370px" }}
                                />
                            </div>
                        </div>
                    }

                    <br />

                    {this.state.showGraph &&
                        <div class="card">
                            <div class="card-body">

                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>x = {this.state.X}</p>
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>F(x) = {answer}</p>

                            </div>
                        </div>
                    }

                </div>

            </div>
        );
    }
}
export default Spline;



