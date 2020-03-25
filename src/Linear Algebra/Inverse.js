import React, { Component } from 'react'
import { Input, Table } from 'antd';
import '../screen.css';
import 'antd/dist/antd.css';
import math from 'mathjs';

// import { alert } from 'reactstrap';

var A = [], B = [], matrixA = [], matrixB = [], output = [], answer

class Inverse extends Component {

    constructor() {
        super();
        this.state = {
            n: parseInt(3),
            showMatrix: false,
            showOutput: false
        }
        //this.handleChange = this.handleChange.bind(this);
        //this.inverse = this.inverse.bind(this);

    }

    inverse = (n) => {
        output = []
        this.initMatrix();
        try {
            A = math.inv(A);
            answer = math.multiply(A, B)
            for (var i = 0; i < n; i++) {
                for (var j = 0; j < n; j++) {
                    if (!Number.isInteger(A[i][j])) {
                        A[i][j] = this.printFraction(math.fraction(A[i][j]));
                    }

                }
            }
            var X = JSON.parse(JSON.stringify(answer));
            for (i = 0; i < n; i++) {
                for (j = 0; j < n; j++) {
                    output.push(A[i][j]);
                    output.push("     ");
                }
                output.push(<br />)
            }
            for (i = 0; i < n; i++) {
                output.push(<h2><p className="text-primary">X<sub>{i}</sub>=&nbsp;&nbsp;{X[i]}</p></h2>)
            }
        } catch (error) {
            output.push("Matrix doesn't exist, Determinant is zero")
        }
        this.setState({
            showOutput: true
        });
    }

    printFraction = (value) => {
        return math.format(value, { fraction: 'ratio' })
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
                    <alert color="primary"><h1>Matrix Inversion</h1></alert>
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
                                <button class="btn btn-success btn-sm btn-block" onClick={() => this.inverse(this.state.n)}>
                                    ENTER</button>
                            </div>
                        </div>
                    }
                    <br />
                    {this.state.showOutput &&
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
export default Inverse;



