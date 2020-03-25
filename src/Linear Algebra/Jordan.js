import React, { Component } from 'react'
import { Input, Table } from 'antd';
import '../screen.css';
import 'antd/dist/antd.css';
import math from 'mathjs';

// import { alert } from 'reactstrap';


var A = [], B = [], matrixA = [], matrixB = [], output = []
class Jordan extends Component {

    constructor() {
        super();
        this.state = {
            n: parseInt(3),
            showMatrix: false,
            showOutput: false
        }
        //this.handleChange = this.handleChange.bind(this);
        //this.jordan = this.jordan.bind(this);

    }

    jordan = (n) => {
        output = []
        this.initMatrix();
        if (A[0][0] === 0) { //pivoting
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        }
        //Forward eliminate
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];

            }
        }
        //Backward Substitution
        for (k = n - 1; k >= 0; k--) {
            for (i = k; i >= 0; i--) {

                if (i === k) {//Identity matrix
                    factor = 1 / A[i][k];

                    for (j = 0; j < n; j++) {
                        A[i][j] = A[i][j] * factor;
                    }
                    B[i] = B[i] * factor;


                }
                else {
                    factor = A[i][k] / A[k][k];
                    for (j = 0; j < n; j++) {
                        A[i][j] = A[i][j] - factor * A[k][j];
                    }
                    B[i] = B[i] - factor * B[k];
                }
            }
        }
        for (i = 0; i < n; i++) {
            output.push(<h2><p className="text-primary">X<sub>{i}</sub>=&nbsp;&nbsp;{B[i]}</p></h2>);
            output.push(<br />)
        }
        this.setState({
            showOutput: true
        });


    }
    createMatrix = (n) => {
        matrixA = []
        matrixB = []
        for (var i = 1; i <= n; i++) {
            for (var j = 1; j <= n; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%",
                    backgroundColor: "#06d9a0",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} defaultValue={parseInt(math.random(10))} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} defaultValue={parseInt(math.random(10))} />)


        }

        this.setState({
            showMatrix: true
        })


    }
    initMatrix = () => {
        A = []
        B = []
        for (var i = 0; i < this.state.n; i++) {
            A[i] = []
            for (var j = 0; j < this.state.n; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div class="content">
                <div class="container-fluid" onChange={this.handleChange}>
                    <alert color="primary"><h1>Gauss Jordan Method</h1></alert>
                    <div class="card">
                        <div class="card-body">
                            <label for="n"><p className="text-primary">input 'n' Create table input</p></label>
                            <input type="text" class="form-control" name="n" placeholder="3" value={this.state.n} />
                        </div>

                        <div class="card-footer">
                            <button class="btn btn-success btn-sm btn-block" onClick={
                                () => this.createMatrix(parseInt(this.state.n))
                            }>ENTER</button>
                        </div>
                    </div>

                    <br />
                    {this.state.showMatrix &&
                        <div class="card">
                            <div class="card-body">
                                <div>
                                    <label for="InputTable"><h2><p className="text-primary">Table Input</p></h2></label>

                                    <div><h4><p className="text-primary">Matrix [A]</p></h4><br />{matrixA}<h4><p className="text-primary">Vector [B]</p><br /></h4>{matrixB}</div>
                                </div>
                            </div>
                            <div class="card-footer">
                                <button class="btn btn-success btn-sm btn-block" onClick={() => this.jordan(this.state.n)}>
                                    ENTER</button>
                            </div>
                        </div>
                    }
                    <br />
                    {this.state.showOutput &&
                        <div class="card">
                            <div class="card-body">
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>

                            </div>
                        </div>
                    }

                </div>
            </div>
        );
    }
}
export default Jordan;



