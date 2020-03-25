import React, { Component } from 'react'
import { Input, Table } from 'antd';
import '../screen.css';
import 'antd/dist/antd.css';
import math from 'mathjs';

// import { alert } from 'reactstrap';
var columns = [
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

var A = [], B = [], answer = [], matrixA = [], matrixB = []
class Cramer extends Component {

    constructor() {
        super();
        this.state = {
            n: parseInt(3),
            showMatrix: false,
            showOutput: false
        }
        //this.handleChange = this.handleChange.bind(this);
        //this.cramer = this.cramer.bind(this);

    }

    cramer = () => {
        answer = []
        this.initMatrix();
        var counter = 0;
        // eslint-disable-next-line eqeqeq
        while (counter != this.state.n) {
            var transformMatrix = JSON.parse(JSON.stringify(A));//Deep copy
            for (var i = 0; i < this.state.n; i++) {
                for (var j = 0; j < this.state.n; j++) {
                    if (j === counter) {
                        transformMatrix[i][j] = B[i]
                        break;
                    }

                }

            }
            answer.push(<h2><p className="text-primary">X<sub>{counter}</sub>=&nbsp;&nbsp;{Math.round(math.det(transformMatrix)) / Math.round(math.det(A))}</p></h2>)
            answer.push(<br />)
            counter++;


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
            matrixB.push(<br />)
        }



        this.setState({

            showMatrix: true,

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
                    <alert color="primary"><h1>Cramer's Rule</h1></alert>
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
                                <button class="btn btn-success btn-sm btn-block" onClick={() => this.cramer()}>
                                    ENTER</button>
                            </div>
                        </div>
                    }
                    <br />
                    {this.state.showOutput &&
                        <div class="card">
                            <div class="card-body">
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{answer}</p>
                            </div>
                        </div>
                    }

                </div>
            </div>
        );
    }
}
export default Cramer;




